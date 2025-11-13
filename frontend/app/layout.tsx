import "./globals.css";
import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Revest — Dynamic Form",
  description: "Assignment frontend with dynamic form generation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
