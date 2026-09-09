import { Avatar, Badge, Card, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card
      render={
        <article className="vertical-article-card" aria-labelledby="vertical-article-card-title" />
      }
    >
      <img
        className="media"
        src="https://picsum.photos/seed/hedgerow-dahlia-tubers/600/750"
        alt=""
        width="600"
        height="750"
      />
      <p className="meta">
        <Badge>Winter jobs</Badge>
      </p>
      <h3 id="vertical-article-card-title">
        <a href="/journal/lifting-dahlias">Lifting and storing dahlia tubers</a>
      </h3>
      <div className="author">
        <Avatar name="Amara Okonkwo" aria-hidden />
        <div className="byline">
          <address>
            <a href="/growers/amara-okonkwo" rel="author">
              Amara Okonkwo
            </a>
          </address>
          <Time value="2026-10-20" locale="en-GB" dateStyle="long" />
        </div>
      </div>
    </Card>
  );
}
