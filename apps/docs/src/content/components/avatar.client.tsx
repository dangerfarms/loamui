"use client";

import { Avatar } from "@loamui/core";

export function AvatarGroupDemo() {
  return (
    <Avatar.Group aria-label="Participants">
      <Avatar.Root role="img" aria-label="Jane Doe">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root role="img" aria-label="Sam Reed">
        <Avatar.Fallback>SR</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root role="img" aria-label="Amara Okafor">
        <Avatar.Fallback>AO</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root role="img" aria-label="5 more people">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar.Root>
    </Avatar.Group>
  );
}
