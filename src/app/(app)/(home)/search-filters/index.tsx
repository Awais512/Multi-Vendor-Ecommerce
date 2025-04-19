import { Category } from "@/payload-types";
import { PaginatedDocs } from "payload";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";

interface Props {
  data: any;
}

export const SearchFilter = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={data} />
    </div>
  );
};
