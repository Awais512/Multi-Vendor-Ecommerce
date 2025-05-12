import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";
import { tagsRouter } from "@/modules/tags/server/procedure";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,
  categories: categoriesRouter,
  tags: tagsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
