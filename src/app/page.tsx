"use client";
import { WelcomePage } from "@/pages-components";
import { SDKProvider } from "@tma.js/sdk-react";

function Home() {
  return  (<SDKProvider acceptCustomStyles debug={false}>
      <WelcomePage />
  </SDKProvider>);
}

export default Home;
