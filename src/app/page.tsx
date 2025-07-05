import Link from "next/link";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Avatar,
  Badge,
  Stack,
  Box,
  Paper,
} from "@mantine/core";
import {
  IconLogout,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <Box bg="gray.0" mih="100vh">
        <Container size="lg" py="xl">
          <Stack gap="xl">
            {/* Header Section */}
            <Paper radius="md" p="xl" shadow="sm" bg="white">
              <Stack align="center" gap="lg">
                <Badge size="lg" variant="light" color="blue" radius="sm">
                  Built with T3 Stack
                </Badge>
                
                <Title order={1} size="3rem" ta="center" fw={900}>
                  Welcome to{" "}
                  <Text
                    component="span"
                    inherit
                    gradient={{ from: "blue", to: "cyan" }}
                    variant="gradient"
                  >
                    My T3 App
                  </Text>
                </Title>
                
                <Text size="xl" c="dimmed" ta="center" maw={600}>
                  A modern, type-safe web application built with Next.js, tRPC,
                  Prisma, and TypeScript
                </Text>

                {/* Auth Section */}
                <Group mt="md">
                  {session?.user ? (
                    <>
                      <Group gap="sm">
                        <Avatar color="blue" radius="xl">
                          {session.user.name?.[0]?.toUpperCase() ?? "U"}
                        </Avatar>
                        <Text fw={500}>{session.user.name ?? session.user.email}</Text>
                      </Group>
                      <Button
                        component={Link}
                        href="/api/auth/signout"
                        leftSection={<IconLogout size={16} />}
                        variant="light"
                        color="gray"
                      >
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        component={Link}
                        href="/auth/signin"
                        leftSection={<IconLogin size={16} />}
                        variant="light"
                      >
                        Sign in
                      </Button>
                      <Button
                        component={Link}
                        href="/auth/signup"
                        leftSection={<IconUserPlus size={16} />}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </Group>
              </Stack>
            </Paper>

            {/* Main Content Area */}
            {session?.user && (
              <Paper radius="md" p="xl" withBorder>
                <Stack align="center" gap="md">
                  <Title order={3}>Welcome back, {session.user.name ?? "User"}!</Title>
                  <Text c="dimmed" ta="center">
                    You&apos;re successfully logged in. Start building your application here.
                  </Text>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Container>
      </Box>
    </HydrateClient>
  );
}