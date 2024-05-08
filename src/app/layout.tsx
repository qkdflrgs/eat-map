import "@/styles/globals.css";
import { Metadata } from "next";
import { NextLayout, NextProvider } from "./provider";

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
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
