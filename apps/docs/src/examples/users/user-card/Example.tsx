"use client";

import { useId } from "react";
import { Avatar, Button, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  const name = useId();
  return (
    <Card render={<article className="user-card" aria-labelledby={name} />}>
      <Avatar name="Imogen Hartley" src="https://picsum.photos/id/823/240/240" aria-hidden />
      <h2 id={name}>Imogen Hartley</h2>
      <p className="role">Steward, Lower Field plot</p>
      <dl className="stats">
        <div>
          <dt>Varieties saved</dt>
          <dd>38</dd>
        </div>
        <div>
          <dt>Seasons</dt>
          <dd>7</dd>
        </div>
        <div>
          <dt>Followers</dt>
          <dd>212</dd>
        </div>
      </dl>
      <div className="actions">
        <Button>Follow</Button>
      </div>
    </Card>
  );
}
