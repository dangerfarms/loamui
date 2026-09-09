import { Badge, Button, Card, Price, Rating } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <Card render={<article className="product-card" aria-labelledby="product-card-title" />}>
      <img
        className="media"
        src="https://picsum.photos/seed/hedgerow-sweet-pea/600/600"
        alt="Sweet pea flowers in deep maroon and violet on a hazel wigwam"
        width="600"
        height="600"
      />
      <p className="meta">
        <Badge>Save 20%</Badge>
      </p>
      <h3 id="product-card-title">
        <a href="/seeds/sweet-pea-cupani">Sweet pea ‘Cupani’ seeds</a>
      </h3>
      <div className="rating">
        <Rating readOnly label="Average rating" value={4.5} />
        <span>
          (128<span className="loam-VisuallyHidden"> reviews</span>)
        </span>
      </div>
      <p className="price">
        <span className="loam-VisuallyHidden">Was </span>
        <s>
          <Price value={3.5} currency="GBP" locale="en-GB" />
        </s>{" "}
        <span className="loam-VisuallyHidden">Now </span>
        <Price value={2.8} currency="GBP" locale="en-GB" />
      </p>
      <div className="actions">
        <Button>
          Add<span className="loam-VisuallyHidden"> Sweet pea ‘Cupani’ seeds</span> to basket
        </Button>
      </div>
    </Card>
  );
}
