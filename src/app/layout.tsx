import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "pi unpacked — What happens when you type a message into pi?",
  description:
    "The agent loop, 7 built-in tools, 56+ extensions, and the full extensibility surface of pi v0.64.0, mapped straight from the source.",
  openGraph: {
    title: "pi unpacked",
    description:
      "The agent loop, 7 built-in tools, 56+ extensions, and the full extensibility surface, mapped from the source.",
    url: "https://pi-unpacked.vercel.app",
    siteName: "pi unpacked",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
