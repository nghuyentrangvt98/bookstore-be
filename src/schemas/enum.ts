import mongoose from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserRoleWithGuess {
  ADMIN = "admin",
  USER = "user",
  GUESS = "guess",
}

export enum Category {
  Fiction = "Fiction",
  NoneFiction = "Non-Fiction",
  Children = "Children",
  Education = "Education",
  Academic = "Academic",
}

export enum Language {
  vn = "Vietnamese",
  en = "English",
}
