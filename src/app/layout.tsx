import type { Metadata } from "next";
import "./globals.css";
import Preload from "@/app/preload";

export const metadata: Metadata = {
  title: "TSM manuell",
  description: "Saksbehandlerfrontend for manuell behandling av tilbakedaterte sykemeldinger. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
    <Preload />
      <body>
        {children}
      </body>
    </html>
  );
}
