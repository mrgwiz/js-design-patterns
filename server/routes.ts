import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFavoriteSchema } from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a dummy user ID for anonymous users
  app.use((req, res, next) => {
    if (!req.headers.userid) {
      req.headers.userid = nanoid();
    }
    next();
  });

  // Get all patterns
  app.get("/api/patterns", async (req: Request, res: Response) => {
    try {
      const patterns = await storage.getAllPatterns();
      res.json(patterns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patterns" });
    }
  });

  // Get pattern by slug
  app.get("/api/patterns/:slug", async (req: Request, res: Response) => {
    try {
      const pattern = await storage.getPatternBySlug(req.params.slug);
      if (!pattern) {
        return res.status(404).json({ message: "Pattern not found" });
      }
      res.json(pattern);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pattern" });
    }
  });

  // Get patterns by category
  app.get("/api/categories/:category", async (req: Request, res: Response) => {
    try {
      const patterns = await storage.getPatternsByCategory(req.params.category);
      res.json(patterns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch patterns by category" });
    }
  });

  // Search patterns
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const patterns = await storage.searchPatterns(query);
      res.json(patterns);
    } catch (error) {
      res.status(500).json({ message: "Failed to search patterns" });
    }
  });

  // Get user favorites
  app.get("/api/favorites", async (req: Request, res: Response) => {
    try {
      const userId = req.headers.userid as string;
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  // Add pattern to favorites
  app.post("/api/favorites", async (req: Request, res: Response) => {
    try {
      const userId = req.headers.userid as string;
      const parsedBody = insertFavoriteSchema.parse({
        ...req.body,
        userId
      });
      
      // Check if already a favorite
      const isAlreadyFavorite = await storage.isFavorite(parsedBody.patternId, userId);
      if (isAlreadyFavorite) {
        return res.status(400).json({ message: "Pattern is already a favorite" });
      }
      
      const favorite = await storage.addFavorite(parsedBody);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  // Remove pattern from favorites
  app.delete("/api/favorites/:patternId", async (req: Request, res: Response) => {
    try {
      const patternId = parseInt(req.params.patternId);
      const userId = req.headers.userid as string;
      
      if (isNaN(patternId)) {
        return res.status(400).json({ message: "Invalid pattern ID" });
      }
      
      const result = await storage.removeFavorite(patternId, userId);
      if (!result) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  // Check if pattern is a favorite
  app.get("/api/favorites/:patternId", async (req: Request, res: Response) => {
    try {
      const patternId = parseInt(req.params.patternId);
      const userId = req.headers.userid as string;
      
      if (isNaN(patternId)) {
        return res.status(400).json({ message: "Invalid pattern ID" });
      }
      
      const isFavorite = await storage.isFavorite(patternId, userId);
      res.json({ isFavorite });
    } catch (error) {
      res.status(500).json({ message: "Failed to check favorite status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
