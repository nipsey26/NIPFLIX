import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: process.env.DATABASE_URL,
  },
});