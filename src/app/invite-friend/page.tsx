import { Loader } from "@/common";
import { InviteFriend } from "@/pages-components";
import { Suspense } from "react";

export default function InviteFriendPage() {
  return (
    <Suspense fallback={<Loader />}>
      <InviteFriend />
    </Suspense>
  );
}
