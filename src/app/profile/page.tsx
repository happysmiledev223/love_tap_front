import { Loader } from "@/common";
import { Profile } from "@/pages-components";
import { Suspense } from "react";

function ProfilePage() {
  return (
    <Suspense fallback={<Loader />}>
      <Profile />
    </Suspense>
  );
}

export default ProfilePage;
