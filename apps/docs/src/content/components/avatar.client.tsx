"use client";

import { Avatar } from "@loamui/core";

export function AvatarGroupDemo() {
  return (
    <Avatar.Group more={5} labels={{ more: (n) => `${n} more people` }}>
      <Avatar name="Jane Doe" />
      <Avatar name="Sam Reed" />
      <Avatar name="Amara Okafor" />
    </Avatar.Group>
  );
}
