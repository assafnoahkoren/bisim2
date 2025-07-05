"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  IconUserPlus,
  IconBrandDiscord,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { api } from "~/trpc/react";

export default function SignUp() {
  const router = useRouter();
  
  const signupMutation = api.auth.signup.useMutation({
    onSuccess: async (data, variables) => {
      notifications.show({
        title: "Account created",
        message: "Signing you in...",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      
      const result = await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });
      
      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    },
    onError: (error) => {
      notifications.show({
        title: "Registration failed",
        message: error.message,
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    signupMutation.mutate({
      email: values.email,
      password: values.password,
      name: values.name || undefined,
    });
  };

  return (
    <Box bg="gray.0" mih="100vh">
      <Container size={420} pt={100}>
        <Title ta="center" fw={900}>
          Create your account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component={Link} href="/auth/signin">
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name (optional)"
                {...form.getInputProps("name")}
              />

              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a password"
                required
                {...form.getInputProps("password")}
              />

              <PasswordInput
                label="Confirm password"
                placeholder="Confirm your password"
                required
                {...form.getInputProps("confirmPassword")}
              />

              <Button
                fullWidth
                type="submit"
                loading={signupMutation.isPending}
                leftSection={<IconUserPlus size={16} />}
              >
                Create account
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