"use client";

import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export function PostDate({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Text size="xs" c="dimmed" mt={4}>
        Created at: {date.toISOString().replace('T', ' ').slice(0, -5)}
      </Text>
    );
  }

  return (
    <Text size="xs" c="dimmed" mt={4}>
      Created at: {date.toLocaleString()}
    </Text>
  );
}