import { EntityManager, MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

let orm: MikroORM;
let em: EntityManager;

export async function getORM() {
  if (!orm) {
    console.log("Initializing MikroORM...");
    try {
      orm = await MikroORM.init(config);
      console.log("MikroORM initialized successfully");
    } catch (error) {
      console.error("Error initializing MikroORM:", error);
      throw error;
    }
  }
  return orm;
}

export async function getEM() {
  if (!em) {
    const orm = await getORM();
    em = orm.em.fork();
  }
  return em;
}

// Initialize ORM on startup to catch any issues early
// This is optional but can help prevent initialization issues during requests
if (process.env.NODE_ENV !== "test") {
  getORM().catch(err => {
    console.error("Failed to initialize MikroORM:", err);
  });
} 