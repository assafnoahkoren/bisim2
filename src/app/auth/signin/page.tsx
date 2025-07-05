"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Divider,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconLogin,
  IconBrandDiscord,
  IconAlertCircle,
} from "@tabler/icons-react";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 0 ? null : "Password is required"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        notifications.show({
          title: "Authentication failed",
          message: "Invalid email or password",
          color: "red",
          icon: <IconAlertCircle size={16} />,
        });
      } else {
        notifications.show({
          title: "Success",
          message: "You have been signed in successfully",
          color: "green",
        });
        router.push("/");
        router.refresh();
      }
    } catch {
      notifications.show({
        title: "Error",
        message: "An unexpected error occurred. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.0" mih="100vh">
      <Container size={420} pt={100}>
        <Title ta="center" fw={900}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} href="/auth/signup">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps("password")}
              />

              <Button
                fullWidth
                type="submit"
                loading={loading}
                leftSection={<IconLogin size={16} />}
              >
                Sign in
              </Button>
            </Stack>
          </form>

          {/* <Divider label="Or continue with" labelPosition="center" my="lg" />

          <Stack>
            <Button
              fullWidth
              variant="default"
              leftSection={<IconBrandDiscord size={16} />}
              onClick={() => signIn("discord", { callbackUrl: "/" })}
            >
              Discord
            </Button>
          </Stack> */}
        </Paper>
      </Container>
    </Box>
  );
}