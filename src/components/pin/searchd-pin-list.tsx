"use client";

import { Button } from "@/components/ui/button";
import { IPinDetails } from "@/types/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchedPinCard from "./searched-pin-card";
import Loading from "../common/loader/loading";

export default function SearchedPinList() {
  const paramas = useSearchParams();
  const query = paramas.get("query");

  const [page, setPage] = useState(1);
  const [pins, setPins] = useState<IPinDetails[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async (page: number) => {
      const limit = 9;
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?query=${query}&page=${page}&limit=${limit}`
        );
        const data = await res?.json();
        setPins(data.pins);
        setPage(data.current_page);
        setTotalPage(data.total_page);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults(page);
  }, [page, query]);

  if (loading) return <Loading/>

    // console.log(pins)

  return (
    <div className="p-3.5">
      <h1 className="font-medium">You searhed for: {query}</h1>
      <SearchedPinCard pins={pins} />
      <div className="flex flex-row gap-2 mt-10 justify-center">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1 && true}
          className={`${page === 1 && "opacity-50"}`}
        >
          Prev
        </Button>
        <span className="text-xl font-medium">
          {" "}
          {page} of {totalPage}
        </span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPage && true}
          className={`${page === totalPage && "opacity-50"}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
