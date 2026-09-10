import { Badge, Button, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="hero-with-image" aria-labelledby="hero-with-image-title">
      <div className="inner">
        <div className="text">
          <p className="eyebrow">
            <Badge>Spring catalogue</Badge>
            <span>Sowing from March</span>
          </p>
          <h1 id="hero-with-image-title">Seed saved by growers, for growers.</h1>
          <p className="lede">
            Hedgerow is a nursery and seed co-op. Every packet is an open-pollinated variety grown
            on a member plot, dried and packed by hand, and posted the week you order it.
          </p>
          <div className="actions">
            <SignpostLink href="/catalogue">Browse the catalogue</SignpostLink>
            <Button>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch how we save seed
            </Button>
          </div>
        </div>
        <img
          className="media"
          src="https://picsum.photos/id/785/1200/900"
          alt="A grower's cupped hands holding a bundle of green shoots"
          width="1200"
          height="900"
        />
      </div>
    </section>
  );
}
