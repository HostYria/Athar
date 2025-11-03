
import { db } from "./db";
import { users, passwordResetRequests, type InsertUser, type User, type PasswordResetRequest, type InsertPasswordResetRequest } from "@shared/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";

export const storage = {
  // User methods
  async createUser(userData: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [user] = await db.insert(users).values({
      ...userData,
      password: hashedPassword,
    }).returning();
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
};
