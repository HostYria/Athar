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
      res.status(500).json({ message: "Server error" });
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
      res.status(500).json({ message: "Server error" });
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
      const { currency, amount, recipient } = req.body;

      if (!currency || !amount || !recipient) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
      }

      // In a real app, you would:
      // 1. Verify user authentication
      // 2. Check user's balance
      // 3. Validate recipient address
      // 4. Create transaction record
      // 5. Update balances

      console.log(`Transaction: Send ${amount} ${currency} to ${recipient}`);

      res.json({
        message: "Transaction successful",
        transaction: {
          currency,
          amount,
          recipient,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Send transaction error:", error);
      res.status(500).json({ message: "Transaction failed" });
    }
  });

  app.post("/api/wallet/trade-ath", async (req, res) => {
    try {
      const { action, amount } = req.body;

      if (!action || !amount) {
        return res.status(400).json({ message: "Action and amount are required" });
      }

      if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
      }

      const athRate = 0.001;
      const usdAmount = amount * athRate;

      // In a real app, you would:
      // 1. Verify user authentication
      // 2. Check balances (USD for buy, ATH for sell)
      // 3. Execute the trade
      // 4. Update user balances
      // 5. Create transaction record

      console.log(`ATH Trade: ${action} ${amount} ATH (${usdAmount} USD)`);

      res.json({
        message: "Trade successful",
        trade: {
          action,
          athAmount: amount,
          usdAmount,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("ATH trade error:", error);
      res.status(500).json({ message: "Trade failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}