import { Avatar, Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<figure className="testimonial" />}>
      <blockquote>
        <p>
          I joined for the seed and stayed for the people. Every packet I have grown from has come
          true, and the guides read like a neighbour talking you through it over the fence.
        </p>
      </blockquote>
      <figcaption>
        <Avatar name="Mari Hughes" aria-hidden="true" />
        <div className="author">
          <span className="name">Mari Hughes</span>
          <span className="role">Member since 2019, Ludlow</span>
        </div>
      </figcaption>
    </Card>
  );
}
