"use client";

import { useEffect, useState } from "react";
import PinCard from "./pin-card";
import { IPinDetails } from "@/types/types";
import { Button } from "../ui/button";

function Pins() {
  const [pins, setPins] = useState<IPinDetails[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchPins = async (pageNumber: number) => {
    try {
      const res = await fetch(`/api/pin/all?page=${pageNumber}&limit=${limit}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setPins(data.pins);
      setTotalPages(data.totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch pins:", error);
    }
  };

  useEffect(() => {
    fetchPins(page);
  }, [page]); // Added page to the dependency array

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1); // Update page state instead of calling fetch directly
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1); // Update page state instead of calling fetch directly
    }
  };

  return (
    <div>
      <PinCard pins={pins} />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button
          disabled={page === 1}
          onClick={handlePrev}
          className={`${page === 1 && "cursor-not-allowed"}`}
        >
          Prev
        </Button>

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages || totalPages === 0}
          onClick={handleNext}
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
