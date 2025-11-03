import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPasswordResetRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(userData);

      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({ message: "Username/Email and password are required" });
      }

      const user = await storage.getUserByUsernameOrEmail(identifier);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await storage.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Password reset request
  app.post("/api/auth/request-password-reset", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a random 6-digit code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store the reset request (in a real app, this would be in the database)
      // For now, we'll just log it - admin would manually send this
      console.log(`Password reset requested for ${email}. Reset code: ${resetCode}`);

      // In a real application, you would:
      // 1. Store the reset code in the database with an expiration time
      // 2. Create an admin notification/request
      // 3. Admin would manually send the email with the code

      res.json({
        message: "Password reset request submitted successfully",
        // Don't send the code to the client - admin will send it via email
      });
    } catch (error) {
      console.error("Password reset request error:", error);
      res.status(500).json({ message: "Failed to process password reset request" });
    }
  });

  // Get all password reset requests (for admin panel)
  app.get("/api/admin/password-reset-requests", async (req, res) => {
    try {
      const requests = await storage.getAllPasswordResetRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Wallet endpoints
  app.post("/api/wallet/send", async (req, res) => {
    try {
      const { userId, recipientAddress, amount, currency } = req.body;

      if (!userId || !recipientAddress || !amount || !currency) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const amountNum = parseFloat(amount);
      if (amountNum <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
      }

      const sender = await storage.getUserById(userId);
      if (!sender) {
        return res.status(404).json({ message: "Sender not found" });
      }

      const recipient = await storage.getUserByWalletAddress(recipientAddress);
      if (!recipient) {
        return res.status(404).json({ message: "Recipient address not found" });
      }

      const fee = amountNum * 0.0005; // 0.05%
      const total = amountNum + fee;

      // Check balance
      const senderBalance = parseFloat(sender.usdBalance || "0");
      if (total > senderBalance) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Update balances
      await storage.updateUserBalance(userId, {
        usdBalance: (senderBalance - total).toFixed(2)
      });

      const recipientBalance = parseFloat(recipient.usdBalance || "0");
      await storage.updateUserBalance(recipient.id, {
        usdBalance: (recipientBalance + amountNum).toFixed(2)
      });

      // Create notifications
      await storage.createNotification({
        userId: sender.id,
        type: "wallet",
        title: "تم الإرسال بنجاح",
        description: `تم إرسال ${amountNum.toFixed(2)} ${currency} إلى ${recipientAddress}`,
      });

      await storage.createNotification({
        userId: recipient.id,
        type: "wallet",
        title: "تم استلام تحويل",
        description: `تم استلام ${amountNum.toFixed(2)} ${currency} من ${sender.walletAddress}`,
      });

      res.json({
        message: "Transaction successful",
        senderBalance: (senderBalance - total).toFixed(2),
      });
    } catch (error) {
      console.error("Send transaction error:", error);
      res.status(500).json({ message: "Transaction failed" });
    }
  });

  app.post("/api/wallet/trade-athr", async (req, res) => {
    try {
      const { userId, action, amount, currency } = req.body;

      if (!userId || !action || !amount || !currency) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const amountNum = parseFloat(amount);
      if (amountNum <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
      }

      const user = await storage.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const rates: Record<string, number> = { USD: 0.001, SYP: 11 };
      const rate = rates[currency];

      if (action === "buy") {
        const total = amountNum * rate;
        const balance = parseFloat(currency === "USD" ? user.usdBalance || "0" : user.sypBalance || "0");

        if (total > balance) {
          return res.status(400).json({ message: "Insufficient balance" });
        }

        const athrBalance = parseFloat(user.athrBalance || "0");
        
        const updates: any = { athrBalance: (athrBalance + amountNum).toFixed(2) };
        if (currency === "USD") {
          updates.usdBalance = (balance - total).toFixed(2);
        } else {
          updates.sypBalance = (balance - total).toFixed(2);
        }

        await storage.updateUserBalance(userId, updates);

        await storage.createNotification({
          userId: user.id,
          type: "wallet",
          title: "تم شراء ATHR",
          description: `تم شراء ${amountNum.toFixed(2)} ATHR مقابل ${total.toFixed(2)} ${currency}`,
        });

        res.json({ message: "Purchase successful", balances: updates });
      } else {
        const athrBalance = parseFloat(user.athrBalance || "0");
        if (amountNum > athrBalance) {
          return res.status(400).json({ message: "Insufficient ATHR balance" });
        }

        const totalBeforeFee = amountNum * rate;
        const fee = totalBeforeFee * 0.0005;
        const netAmount = totalBeforeFee - fee;

        const balance = parseFloat(currency === "USD" ? user.usdBalance || "0" : user.sypBalance || "0");
        
        const updates: any = { athrBalance: (athrBalance - amountNum).toFixed(2) };
        if (currency === "USD") {
          updates.usdBalance = (balance + netAmount).toFixed(2);
        } else {
          updates.sypBalance = (balance + netAmount).toFixed(2);
        }

        await storage.updateUserBalance(userId, updates);

        await storage.createNotification({
          userId: user.id,
          type: "wallet",
          title: "تم بيع ATHR",
          description: `تم بيع ${amountNum.toFixed(2)} ATHR مقابل ${netAmount.toFixed(2)} ${currency}`,
        });

        res.json({ message: "Sale successful", balances: updates });
      }
    } catch (error) {
      console.error("ATHR trade error:", error);
      res.status(500).json({ message: "Trade failed" });
    }
  });

  // Notification endpoints
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications/:id/read", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markNotificationAsRead(id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.post("/api/notifications/:userId/read-all", async (req, res) => {
    try {
      const { userId } = req.params;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}