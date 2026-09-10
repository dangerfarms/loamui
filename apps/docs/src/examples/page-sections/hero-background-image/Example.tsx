import { Button, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="hero-background-image" aria-labelledby="hero-background-image-title">
      <img
        className="media"
        src="https://picsum.photos/id/206/1600/900"
        alt=""
        width="1600"
        height="900"
      />
      <div className="inner">
        <h1 id="hero-background-image-title">A field of seed, saved by the people who sow it.</h1>
        <p className="lede">
          Hedgerow grows open-pollinated vegetables, herbs and flowers on member plots across
          Shropshire, and posts the seed the week you order it.
        </p>
        <div className="actions">
          <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
          <Button>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch the harvest
          </Button>
        </div>
      </div>
    </section>
  );
}
