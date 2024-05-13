import "@/styles/globals.css";
import { Metadata } from "next";
import { NextLayout, NextProvider } from "./provider";
import { GoogleAnalytics } from "@next/third-parties/google";

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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
