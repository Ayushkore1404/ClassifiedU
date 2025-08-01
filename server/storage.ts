import { type User, type InsertUser, type Listing, type InsertListing, type RoommateProfile, type InsertRoommateProfile, type Message, type InsertMessage, users, listings, roommateProfiles, messages } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, or } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Listing methods
  getAllListings(): Promise<Listing[]>;
  getListing(id: string): Promise<Listing | undefined>;
  getListingsByUser(userId: string): Promise<Listing[]>;
  getListingsByCategory(category: string): Promise<Listing[]>;
  getListingsByUniversity(university: string): Promise<Listing[]>;
  createListing(listing: InsertListing & { userId: string }): Promise<Listing>;
  updateListing(id: string, updates: Partial<Listing>): Promise<Listing | undefined>;
  deleteListing(id: string): Promise<boolean>;

  // Roommate methods
  getAllRoommateProfiles(): Promise<RoommateProfile[]>;
  getRoommateProfile(id: string): Promise<RoommateProfile | undefined>;
  getRoommateProfileByUser(userId: string): Promise<RoommateProfile | undefined>;
  createRoommateProfile(profile: InsertRoommateProfile & { userId: string }): Promise<RoommateProfile>;
  updateRoommateProfile(id: string, updates: Partial<RoommateProfile>): Promise<RoommateProfile | undefined>;
  deleteRoommateProfile(id: string): Promise<boolean>;

  // Message methods
  getMessages(userId: string): Promise<Message[]>;
  getConversation(userId1: string, userId2: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageRead(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private listings: Map<string, Listing>;
  private roommateProfiles: Map<string, RoommateProfile>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.listings = new Map();
    this.roommateProfiles = new Map();
    this.messages = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      major: insertUser.major || null,
      year: insertUser.year || null,
      bio: insertUser.bio || null,
      avatar: insertUser.avatar || null,
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Listing methods
  async getAllListings(): Promise<Listing[]> {
    return Array.from(this.listings.values()).filter(listing => listing.isActive);
  }

  async getListing(id: string): Promise<Listing | undefined> {
    return this.listings.get(id);
  }

  async getListingsByUser(userId: string): Promise<Listing[]> {
    return Array.from(this.listings.values()).filter(listing => listing.userId === userId);
  }

  async getListingsByCategory(category: string): Promise<Listing[]> {
    return Array.from(this.listings.values()).filter(listing => 
      listing.category === category && listing.isActive
    );
  }

  async getListingsByUniversity(university: string): Promise<Listing[]> {
    return Array.from(this.listings.values()).filter(listing => 
      listing.university === university && listing.isActive
    );
  }

  async createListing(insertListing: InsertListing & { userId: string }): Promise<Listing> {
    const id = randomUUID();
    const listing: Listing = { 
      ...insertListing,
      images: insertListing.images || null,
      isActive: insertListing.isActive ?? true,
      id, 
      createdAt: new Date() 
    };
    this.listings.set(id, listing);
    return listing;
  }

  async updateListing(id: string, updates: Partial<Listing>): Promise<Listing | undefined> {
    const listing = this.listings.get(id);
    if (!listing) return undefined;
    
    const updatedListing = { ...listing, ...updates };
    this.listings.set(id, updatedListing);
    return updatedListing;
  }

  async deleteListing(id: string): Promise<boolean> {
    return this.listings.delete(id);
  }

  // Roommate methods
  async getAllRoommateProfiles(): Promise<RoommateProfile[]> {
    return Array.from(this.roommateProfiles.values()).filter(profile => profile.isActive);
  }

  async getRoommateProfile(id: string): Promise<RoommateProfile | undefined> {
    return this.roommateProfiles.get(id);
  }

  async getRoommateProfileByUser(userId: string): Promise<RoommateProfile | undefined> {
    return Array.from(this.roommateProfiles.values()).find(profile => profile.userId === userId);
  }

  async createRoommateProfile(insertProfile: InsertRoommateProfile & { userId: string }): Promise<RoommateProfile> {
    const id = randomUUID();
    const profile: RoommateProfile = { 
      ...insertProfile,
      preferences: insertProfile.preferences || null,
      budget: insertProfile.budget || null,
      moveInDate: insertProfile.moveInDate || null,
      location: insertProfile.location || null,
      contactInfo: insertProfile.contactInfo || null,
      isActive: insertProfile.isActive ?? true,
      id, 
      createdAt: new Date() 
    };
    this.roommateProfiles.set(id, profile);
    return profile;
  }

  async updateRoommateProfile(id: string, updates: Partial<RoommateProfile>): Promise<RoommateProfile | undefined> {
    const profile = this.roommateProfiles.get(id);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...updates };
    this.roommateProfiles.set(id, updatedProfile);
    return updatedProfile;
  }

  async deleteRoommateProfile(id: string): Promise<boolean> {
    return this.roommateProfiles.delete(id);
  }

  // Message methods
  async getMessages(userId: string): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(message => 
      message.senderId === userId || message.receiverId === userId
    );
  }

  async getConversation(userId1: string, userId2: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => 
        (message.senderId === userId1 && message.receiverId === userId2) ||
        (message.senderId === userId2 && message.receiverId === userId1)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = { 
      ...insertMessage,
      isRead: insertMessage.isRead ?? false,
      id, 
      createdAt: new Date() 
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageRead(id: string): Promise<boolean> {
    const message = this.messages.get(id);
    if (!message) return false;
    
    message.isRead = true;
    this.messages.set(id, message);
    return true;
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Listing methods
  async getAllListings(): Promise<Listing[]> {
    return await db.select().from(listings).where(eq(listings.isActive, true));
  }

  async getListing(id: string): Promise<Listing | undefined> {
    const [listing] = await db.select().from(listings).where(eq(listings.id, id));
    return listing || undefined;
  }

  async getListingsByUser(userId: string): Promise<Listing[]> {
    return await db.select().from(listings).where(eq(listings.userId, userId));
  }

  async getListingsByCategory(category: string): Promise<Listing[]> {
    return await db.select().from(listings).where(
      and(eq(listings.category, category), eq(listings.isActive, true))
    );
  }

  async getListingsByUniversity(university: string): Promise<Listing[]> {
    return await db.select().from(listings).where(
      and(eq(listings.university, university), eq(listings.isActive, true))
    );
  }

  async createListing(insertListing: InsertListing & { userId: string }): Promise<Listing> {
    const [listing] = await db
      .insert(listings)
      .values(insertListing)
      .returning();
    return listing;
  }

  async updateListing(id: string, updates: Partial<Listing>): Promise<Listing | undefined> {
    const [listing] = await db
      .update(listings)
      .set(updates)
      .where(eq(listings.id, id))
      .returning();
    return listing || undefined;
  }

  async deleteListing(id: string): Promise<boolean> {
    const result = await db.delete(listings).where(eq(listings.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Roommate methods
  async getAllRoommateProfiles(): Promise<RoommateProfile[]> {
    return await db.select().from(roommateProfiles).where(eq(roommateProfiles.isActive, true));
  }

  async getRoommateProfile(id: string): Promise<RoommateProfile | undefined> {
    const [profile] = await db.select().from(roommateProfiles).where(eq(roommateProfiles.id, id));
    return profile || undefined;
  }

  async getRoommateProfileByUser(userId: string): Promise<RoommateProfile | undefined> {
    const [profile] = await db.select().from(roommateProfiles).where(eq(roommateProfiles.userId, userId));
    return profile || undefined;
  }

  async createRoommateProfile(insertProfile: InsertRoommateProfile & { userId: string }): Promise<RoommateProfile> {
    const [profile] = await db
      .insert(roommateProfiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async updateRoommateProfile(id: string, updates: Partial<RoommateProfile>): Promise<RoommateProfile | undefined> {
    const [profile] = await db
      .update(roommateProfiles)
      .set(updates)
      .where(eq(roommateProfiles.id, id))
      .returning();
    return profile || undefined;
  }

  async deleteRoommateProfile(id: string): Promise<boolean> {
    const result = await db.delete(roommateProfiles).where(eq(roommateProfiles.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Message methods
  async getMessages(userId: string): Promise<Message[]> {
    return await db.select().from(messages).where(
      or(eq(messages.senderId, userId), eq(messages.receiverId, userId))
    );
  }

  async getConversation(userId1: string, userId2: string): Promise<Message[]> {
    return await db.select().from(messages).where(
      or(
        and(eq(messages.senderId, userId1), eq(messages.receiverId, userId2)),
        and(eq(messages.senderId, userId2), eq(messages.receiverId, userId1))
      )
    ).orderBy(messages.createdAt);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async markMessageRead(id: string): Promise<boolean> {
    const result = await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
