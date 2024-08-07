import { Loader } from "@/common";
import { Leaders } from "@/pages-components";
import { Suspense } from "react";

function LeadersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Leaders />;
    </Suspense>
  );
}

export default LeadersPage;
