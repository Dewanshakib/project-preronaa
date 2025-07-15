import EditPinForm from "@/components/pin/edit-pin-form";
import React from "react";

export default async function EditPin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pinId = (await params).id;

  const res = await fetch(`${process.env.BASE_URL}/api/pin/${pinId}`)
  const pinData = await res?.json()

  // console.log(pinData)

  return (
    <div>
      <EditPinForm pinDetails={pinData}/>
    </div>
  );
}
