import { Loader } from "@/common";
import { Home } from "@/pages-components";
import { Suspense } from "react";

function HomePage() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />;
    </Suspense>
  );
}

export default HomePage;
