"use client";

import { UploadId } from "@/app/ui/components/upload-id";
import { Fragment } from "react";

export default function Generare(): JSX.Element {
  return (
    <Fragment>
      <section className="hidden md:flex generate-tab p-4 w-full h-full">
        <div className="z-40 absolute uplaod-id w-full h-full inset-0">
          <UploadId />
        </div>
      </section>
      <section className="md:hidden">
 Not eligible bro
      </section>
    </Fragment>
  );
}
