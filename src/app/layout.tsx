import "./globals.css";
import React from "react";

export const metadata = {
  title: "AWS Flow Builder",
  description: "Visual AWS architecture builder for VPC/ECS with validation & rules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
