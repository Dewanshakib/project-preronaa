import { IPinDetails } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function SearchResult({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  const res = await fetch(
    `${process.env.BASE_URL}/api/search?query=${encodeURIComponent(query)}`
  );
  const data: IPinDetails[] = await res.json();
  // console.log(data);

  return (
    <div className="p-3.5">
      <h1 className="font-medium">You searhed for: {query}</h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3 mt-5">
          {data.map((pin) => (
            <div key={pin._id} className="">
              <Link href={`/pin/${pin._id.toString()}`}>
                <section className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                  <Image
                    src={pin.photoUrl}
                    alt="pin photo"
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </section>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center mt-44 text-3xl font-bold">No results found</h1>
      )}
    </div>
  );
}
