import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilter } from "./search-filters";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const HomeLayout = async ({ children }: Props) => {
  const payload = await getPayload({ config: configPromise });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subCategories: (doc.subCategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
    })),
  }));

  console.log(formattedData);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
