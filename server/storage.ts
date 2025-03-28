import { 
  patterns, 
  favorites, 
  type Pattern, 
  type InsertPattern, 
  type Favorite, 
  type InsertFavorite 
} from "@shared/schema";
import { patternsData } from "./pattern-data";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Pattern operations
  getAllPatterns(): Promise<Pattern[]>;
  getPatternBySlug(slug: string): Promise<Pattern | undefined>;
  getPatternsByCategory(category: string): Promise<Pattern[]>;
  searchPatterns(query: string): Promise<Pattern[]>;
  
  // Favorite operations
  getFavorites(userId: string): Promise<Pattern[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(patternId: number, userId: string): Promise<boolean>;
  isFavorite(patternId: number, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private patterns: Map<number, Pattern>;
  private favorites: Map<number, Favorite>;
  currentPatternId: number;
  currentFavoriteId: number;

  constructor() {
    this.patterns = new Map();
    this.favorites = new Map();
    this.currentPatternId = 1;
    this.currentFavoriteId = 1;
    
    // Initialize with pattern data
    this.initializePatterns();
  }

  private initializePatterns() {
    // Load the pattern data
    patternsData.forEach((pattern: Omit<InsertPattern, "id">) => {
      const id = this.currentPatternId++;
      this.patterns.set(id, { ...pattern, id });
    });
  }

  async getAllPatterns(): Promise<Pattern[]> {
    return Array.from(this.patterns.values());
  }

  async getPatternBySlug(slug: string): Promise<Pattern | undefined> {
    return Array.from(this.patterns.values()).find(
      (pattern) => pattern.slug === slug
    );
  }

  async getPatternsByCategory(category: string): Promise<Pattern[]> {
    return Array.from(this.patterns.values()).filter(
      (pattern) => pattern.category === category
    );
  }

  async searchPatterns(query: string): Promise<Pattern[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.patterns.values()).filter(
      (pattern) => 
        pattern.name.toLowerCase().includes(lowercaseQuery) ||
        pattern.description.toLowerCase().includes(lowercaseQuery) ||
        pattern.content.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getFavorites(userId: string): Promise<Pattern[]> {
    const userFavorites = Array.from(this.favorites.values()).filter(
      (favorite) => favorite.userId === userId
    );
    
    return userFavorites.map(favorite => {
      const pattern = this.patterns.get(favorite.patternId);
      if (!pattern) {
        throw new Error(`Pattern with id ${favorite.patternId} not found`);
      }
      return pattern;
    });
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const favorite: Favorite = { ...insertFavorite, id };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(patternId: number, userId: string): Promise<boolean> {
    const favoriteEntry = Array.from(this.favorites.entries()).find(
      ([_, favorite]) => favorite.patternId === patternId && favorite.userId === userId
    );
    
    if (favoriteEntry) {
      const [favoriteId] = favoriteEntry;
      return this.favorites.delete(favoriteId);
    }
    
    return false;
  }

  async isFavorite(patternId: number, userId: string): Promise<boolean> {
    return Array.from(this.favorites.values()).some(
      (favorite) => favorite.patternId === patternId && favorite.userId === userId
    );
  }
}

export const storage = new MemStorage();
