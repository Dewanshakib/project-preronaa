import SearchedPinList from "@/components/pin/searchd-pin-list";
import React, { Suspense } from "react";

export default function Search() {
  return (
    <div>
      <Suspense>
        <SearchedPinList />
      </Suspense>
    </div>
  );
}
