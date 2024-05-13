import "@/styles/globals.css";
import { Metadata } from "next";
import { NextLayout, NextProvider } from "./provider";
import GoogleAnalytics from "./googleAnalytics";

export const metadata: Metadata = {
  title: "Eat Map",
  description: "나만의 맛집을 기록할 수 있는 맛집 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
