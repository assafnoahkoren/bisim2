"use client";

import { useState } from "react";
import {
  TextInput,
  Button,
  Stack,
  Text,
  Title,
  Alert,
  Group,
  Paper,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconPlus,
  IconInfoCircle,
  IconCheck,
} from "@tabler/icons-react";

import { api } from "~/trpc/react";
import { PostDate } from "./post-date";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      notifications.show({
        title: "Success",
        message: "Your post has been created!",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to create post",
        color: "red",
      });
    },
  });

  return (
    <Stack>
      <Title order={3}>Your Posts</Title>
      
      {latestPost ? (
        <Alert
          variant="light"
          color="blue"
          title="Latest Post"
          icon={<IconInfoCircle size={16} />}
        >
          <Text size="sm" truncate>
            {latestPost.name}
          </Text>
          <PostDate date={latestPost.createdAt} />
        </Alert>
      ) : (
        <Alert
          variant="light"
          color="gray"
          icon={<IconInfoCircle size={16} />}
        >
          You have no posts yet. Create your first post below!
        </Alert>
      )}

      <Paper p="md" withBorder>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost.mutate({ name });
          }}
        >
          <Stack>
            <TextInput
              placeholder="What's on your mind?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Create a new post"
              description="Share your thoughts with the community"
              required
              disabled={createPost.isPending}
            />
            <Group justify="flex-end">
              <Button
                type="submit"
                loading={createPost.isPending}
                leftSection={<IconPlus size={16} />}
                disabled={!name.trim()}
              >
                Create Post
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}