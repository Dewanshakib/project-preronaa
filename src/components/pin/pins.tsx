"use client";

import { useEffect, useState } from "react";
import PinCard from "./pin-card";
import { IPinDetails } from "@/types/types";
import { Button } from "../ui/button";
import Loading from "../common/loader/loading";

function Pins() {
  const [pins, setPins] = useState<IPinDetails[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;
  const [loading, setLoading] = useState(false);

  const fetchPins = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pin/all?page=${pageNumber}&limit=${limit}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setPins(data.pins);
      setTotalPages(data.total_page);
      setPage(data.current_page);
    } catch (error) {
      console.error("Failed to fetch pins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPins(page);
  }, [page]);

  // console.log(pins);
  if (loading) return <Loading />;

  return (
    <div>
      <PinCard pins={pins} />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`${page === 1 && "cursor-not-allowed"}`}
        >
          Prev
        </Button>

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((prev) => prev + 1)}
          variant={"default"}
          className={`${
            page === totalPages || (totalPages === 0 && "cursor-not-allowed")
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pins;
