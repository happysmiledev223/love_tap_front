import { Loader } from "@/common";
import { User } from "@/pages-components";
import { Suspense } from "react";

export default function UserPage() {
  return (
    <Suspense fallback={<Loader />}>
      <User />
    </Suspense>
  );
}
