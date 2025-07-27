import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertListingSchema, insertRoommateProfileSchema, insertMessageSchema, loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username) || 
                          await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      delete updates.password; // Don't allow password updates through this route
      
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Listing routes
  app.get("/api/listings", async (req, res) => {
    try {
      const { category, university } = req.query;
      let listings;
      
      if (category) {
        listings = await storage.getListingsByCategory(category as string);
      } else if (university) {
        listings = await storage.getListingsByUniversity(university as string);
      } else {
        listings = await storage.getAllListings();
      }
      
      res.json(listings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/listings/:id", async (req, res) => {
    try {
      const listing = await storage.getListing(req.params.id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/listings", async (req, res) => {
    try {
      const listingData = insertListingSchema.parse(req.body);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      
      const listing = await storage.createListing({ ...listingData, userId });
      res.json(listing);
    } catch (error) {
      res.status(400).json({ message: "Invalid listing data" });
    }
  });

  app.put("/api/listings/:id", async (req, res) => {
    try {
      const updates = req.body;
      const listing = await storage.updateListing(req.params.id, updates);
      
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      
      res.json(listing);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/listings/:id", async (req, res) => {
    try {
      const success = await storage.deleteListing(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.json({ message: "Listing deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/users/:userId/listings", async (req, res) => {
    try {
      const listings = await storage.getListingsByUser(req.params.userId);
      res.json(listings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Roommate routes
  app.get("/api/roommates", async (req, res) => {
    try {
      const profiles = await storage.getAllRoommateProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/roommates/:id", async (req, res) => {
    try {
      const profile = await storage.getRoommateProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ message: "Roommate profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/roommates", async (req, res) => {
    try {
      const profileData = insertRoommateProfileSchema.parse(req.body);
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      
      const profile = await storage.createRoommateProfile({ ...profileData, userId });
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid roommate profile data" });
    }
  });

  app.put("/api/roommates/:id", async (req, res) => {
    try {
      const updates = req.body;
      const profile = await storage.updateRoommateProfile(req.params.id, updates);
      
      if (!profile) {
        return res.status(404).json({ message: "Roommate profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/api/roommates/:id", async (req, res) => {
    try {
      const success = await storage.deleteRoommateProfile(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Roommate profile not found" });
      }
      res.json({ message: "Roommate profile deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/users/:userId/roommate", async (req, res) => {
    try {
      const profile = await storage.getRoommateProfileByUser(req.params.userId);
      if (!profile) {
        return res.status(404).json({ message: "Roommate profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Message routes
  app.get("/api/users/:userId/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/messages/conversation/:userId1/:userId2", async (req, res) => {
    try {
      const messages = await storage.getConversation(req.params.userId1, req.params.userId2);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  app.patch("/api/messages/:id/read", async (req, res) => {
    try {
      const success = await storage.markMessageRead(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ message: "Message marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
