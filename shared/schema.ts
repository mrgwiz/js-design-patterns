import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Pattern Schemas
export const patterns = pgTable("patterns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'javascript', 'nodejs', 'react'
  difficulty: text("difficulty").notNull(), // 'beginner', 'intermediate', 'advanced'
  type: text("type").notNull(), // 'creational', 'structural', 'behavioral', etc.
  content: text("content").notNull(),
  codeExample: text("code_example").notNull(),
  codeTemplate: text("code_template").notNull(),
  relatedPatterns: jsonb("related_patterns").notNull().$type<RelatedPattern[]>(),
  realWorldExamples: jsonb("real_world_examples").notNull().$type<RealWorldExample[]>(),
  benefits: jsonb("benefits").notNull().$type<string[]>(),
  drawbacks: jsonb("drawbacks").notNull().$type<string[]>(),
  furtherReading: jsonb("further_reading").notNull().$type<Reference[]>(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  patternId: integer("pattern_id").notNull(),
  userId: text("user_id").notNull(),
});

// Types
export type RelatedPattern = {
  id: number;
  name: string;
  description: string;
};

export type RealWorldExample = {
  title: string;
  description: string;
};

export type Reference = {
  title: string;
  description: string;
  url?: string;
};

// Insert and Select types
export const insertPatternSchema = createInsertSchema(patterns).omit({
  id: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
});

export type InsertPattern = z.infer<typeof insertPatternSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Pattern = typeof patterns.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
