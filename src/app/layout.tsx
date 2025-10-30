import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
