import { db } from "./db";
import { users, passwordResetRequests, type InsertUser, type User, type PasswordResetRequest, type InsertPasswordResetRequest, notifications } from "@shared/schema";
import { eq, or, desc } from "drizzle-orm";
import bcrypt from "bcrypt";

export const storage = {
  // User methods
  generateWalletAddress(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let address = '';
    for (let i = 0; i < 25; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  },

  async createUser(userData: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const walletAddress = this.generateWalletAddress();
    const { password, ...userDataWithoutPassword } = userData;
    const [user] = await db
      .insert(users)
      .values({
        ...userDataWithoutPassword,
        password: hashedPassword,
        walletAddress,
        usdBalance: "1000.00",
        sypBalance: "5500000.00",
        athrBalance: "15250.00"
      })
      .returning();
    return user;
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },

  async getUserByUsernameOrEmail(identifier: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(
      or(eq(users.username, identifier), eq(users.email, identifier))
    );
    return user;
  },

  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  },

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  // Password reset methods
  async createPasswordResetRequest(data: InsertPasswordResetRequest): Promise<PasswordResetRequest> {
    const [request] = await db.insert(passwordResetRequests).values(data).returning();
    return request;
  },

  async getPasswordResetRequestByCode(code: string): Promise<PasswordResetRequest | undefined> {
    const [request] = await db.select().from(passwordResetRequests).where(eq(passwordResetRequests.code, code));
    return request;
  },

  async getAllPasswordResetRequests(): Promise<PasswordResetRequest[]> {
    return db.select().from(passwordResetRequests);
  },

  async updatePasswordResetStatus(id: string, status: string): Promise<void> {
    await db.update(passwordResetRequests).set({ status }).where(eq(passwordResetRequests.id, id));
  },

  // Notification methods
  async createNotification(notificationData: typeof notifications.$inferInsert) {
    const [notification] = await db
      .insert(notifications)
      .values(notificationData)
      .returning();
    return notification;
  },

  async getUserNotifications(userId: string) {
    return db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  },

  async markNotificationAsRead(notificationId: string) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, notificationId));
  },

  async markAllNotificationsAsRead(userId: string) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId));
  },

  async getUserByWalletAddress(walletAddress: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.walletAddress, walletAddress));
    return user;
  },

  async updateUserBalance(userId: string, balances: {
    usdBalance?: string;
    sypBalance?: string;
    athrBalance?: string;
  }) {
    const [user] = await db
      .update(users)
      .set(balances)
      .where(eq(users.id, userId))
      .returning();
    return user;
  }
};