"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions());

  if (categories.isLoading) {
    return <p>Loading...</p>;
  }

  return <div>{JSON.stringify(categories.data)}</div>;
}
