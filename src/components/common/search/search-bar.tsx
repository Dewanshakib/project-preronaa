"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  // console.log(searchValue)

  const submitHandler = () => {
    if (searchValue.trim()) {
      router.push(
        `/search?query=${encodeURIComponent(
          searchValue.trim()
        )}`
      );
      setSearchValue("");
      setIsOpen(!isOpen);
      router.refresh()
    }
  };

  // hold the scroll of whole app
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // stops scroll
    } else {
      document.body.style.overflow = "auto"; // allows scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup when unmounted
    };
  }, [isOpen]);

  // Close modal on outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="">
      <Button
        onClick={() => setIsOpen(true)}
        variant={"secondary"}
        className="max-w-94 pl-2 pr-64 hidden md:block"
      >
        <span className="flex items-center gap-2">
          <Search className="size-5 ml-1" />
          <p className="text-gray-800 ml-1">Search your {"query's"} here...</p>
        </span>
      </Button>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
        className="md:hidden"
      >
        <Search className="size-6" />
      </Button>

      {/* MODAL OVERLAY */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 top-0 bg-black/50 h-screen w-[100vw] flex justify-center -left-4 z-50 transition-all  md:px-10 px-5"
        >
          {/* MODAL BOX */}
          <div className="bg-gray-100 p-5 rounded-sm h-fit shadow-xl mt-24 max-w-2xl w-full">
            <Input
              placeholder="Search your pins here..."
              value={searchValue}
              className="mb-2.5"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={submitHandler}>
              Find
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
