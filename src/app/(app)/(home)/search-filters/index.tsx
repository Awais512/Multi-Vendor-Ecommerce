import { Category } from "@/payload-types";
import { PaginatedDocs } from "payload";
import { SearchInput } from "./search-input";

interface Props {
  data: PaginatedDocs<Category>;
}

export const SearchFilter = ({ data }: Props) => {
  console.log(data);

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
    </div>
  );
};
