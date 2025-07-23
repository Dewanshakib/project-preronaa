import EditPinForm from "@/components/pin/edit-pin-form";
import React from "react";

export default async function EditPin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pinId = (await params).id;

  const res = await fetch(`${process.env.BASE_URL}/api/pin/${pinId}`);
  const pinData = await res?.json();

  // console.log(pinData)

  return (
    <div>
      <EditPinForm pinDetails={pinData} />
    </div>
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id
  return {
    title: "Edit Pin",
    description: `Make changes to your pin (ID: ${id}) and improve its reach.`,
    openGraph: {
      title: "Edit Your Pin",
      description:
        "Update the content of your pin to reflect your latest ideas.",
      url: `/pin/edit/${id}`,
      siteName: "Preronaa",
      type: "website",
    },
  };
};
