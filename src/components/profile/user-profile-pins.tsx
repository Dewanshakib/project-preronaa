"use client";
import React, { useEffect, useState } from "react";
import { IUserDetails } from "@/types/types";

function UserProfilePins({
  pinType,
  userId,
}: {
  pinType: string;
  userId: string;
}) {
  const [userPins, setUserPins] = useState<Array<IUserDetails>>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUserPins = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/profile/${userId}/pins?category=${pinType}&page=${currentPage}&limit=${6}`
      );
      const data = await res?.json();
      setUserPins(data);
      setTotalPages(data.total_page);
      setCurrentPage(data.current_page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPins();
  }, [currentPage]);

  console.log(userPins);

  if (loading) return <h1>Loading...</h1>;

  return <div></div>;
}

export default UserProfilePins;
