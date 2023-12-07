import { AuthorRepository } from "./authors";
import { CartRepository } from "./carts";
import { FileRepository } from "./file";
import { OrderRepository } from "./orders";
import { ProductRepository } from "./products";
import { UserRepository } from "./users";
import { WishlistRepository } from "./wishlist";

export const userRepo = new UserRepository();
export const authorRepo = new AuthorRepository();
export const fileRepo = new FileRepository();
export const productRepo = new ProductRepository();
export const cartRepo = new CartRepository();
export const orderRepo = new OrderRepository();
export const wishlistRepo = new WishlistRepository();
