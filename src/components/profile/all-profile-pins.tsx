"use client";
import { IPinDetails } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import UsersPinLoading from "../common/loader/users-pin-loading";

function AllProfilePins({ userId }: { userId: string }) {
  const [userPins, setUserPins] = useState<Array<IPinDetails>>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserPins = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/profile/${userId}/pins?page=${currentPage}&limit=${6}`
        );
        const data = await res?.json();
        setUserPins(data.pins);
        setTotalPages(data.total_page);
        setCurrentPage(data.current_page);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPins();
  }, [currentPage,userId]);

  // console.log(userPins);
  if (loading) return <UsersPinLoading />;

  return (
    <div>
      {/* user pins */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {userPins && userPins.length > 0 ? (
          userPins.map((pin) => (
            <div key={pin._id}>
              <div className="" key={pin._id}>
                <Link href={`/pin/${pin._id}`}>
                  <div className="w-full relative aspect-[16/9]">
                    <Image
                      fill
                      src={pin.photoUrl}
                      alt="pin photo"
                      loading="lazy"
                      className="object-cover rounded hover:opacity-90"
                      sizes="(max-width:120px)"
                    />
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-lg font-medium mt-10">No pins added yet</h1>
        )}
      </div>
      {/* pagination buttons and info */}
      {userPins && userPins.length > 0 && totalPages > 1 && (
        <div className="inline-flex justify-center w-full my-3 gap-2.5 items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </Button>
          <span className="font-medium">
            {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllProfilePins;
