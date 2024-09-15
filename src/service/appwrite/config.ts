import { Account, Avatars, Client, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_PROJECT_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);


export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);


// constant // 
export const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const STORAGE_ID = import.meta.env.VITE_APPWRITE_STORAGE_ID;

export const SAVE_COL_ID = import.meta.env.VITE_APPWRITE_SAVEDPOST_COLLECTION_ID;
export const POST_COL_ID = import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID;
export const USER_COL_ID = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID;
