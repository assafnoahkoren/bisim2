import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { type Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "My T3 App",
  description: "A modern web application built with T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider>
          <Notifications position="top-right" />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
