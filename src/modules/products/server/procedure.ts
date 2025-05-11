import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoryData = await ctx.db.find({
          collection: "categories",
          depth: 1,
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoryData.docs.map((doc) => ({
          ...doc,
          subCategories: (doc.subCategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
          })),
        }));

        const subcategoriesSlug = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlug.push(
            ...parentCategory.subCategories.map(
              (subCategory) => subCategory.slug
            )
          );
        }
        where["category.slug"] = {
          in: [parentCategory?.slug, ...subcategoriesSlug],
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
      });

      return data;
    }),
});
