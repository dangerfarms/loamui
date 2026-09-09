import { Badge, Button, Card, Price, Rating } from "@loamui/core";
import "./example.css";

const PRODUCTS = [
  {
    slug: "sweet-pea-cupani",
    name: "Sweet pea ‘Cupani’ seeds",
    alt: "Sweet pea flowers in deep maroon and violet on a hazel wigwam",
    image: "hedgerow-sweet-pea",
    rating: 4.5,
    reviews: 128,
    price: 2.8,
    was: 3.5,
    offer: "Save 20%",
  },
  {
    slug: "copper-trowel",
    name: "Copper hand trowel",
    alt: "A copper trowel with an ash handle lying on a potting bench",
    image: "hedgerow-trowel",
    rating: 5,
    reviews: 41,
    price: 24,
  },
  {
    slug: "rhubarb-timperley-early",
    name: "Rhubarb ‘Timperley Early’ crown",
    alt: "A bare-root rhubarb crown with a pink bud, on damp newspaper",
    image: "hedgerow-rhubarb",
    rating: 4,
    reviews: 17,
    price: 8.5,
  },
  {
    slug: "hazel-bean-poles",
    name: "Hazel bean poles, bundle of ten",
    alt: "A bundle of coppiced hazel poles tied with twine, leaning on a wall",
    image: "hedgerow-hazel-poles",
    rating: 4.5,
    reviews: 63,
    price: 14,
  },
];

export default function Example() {
  return (
    <ul className="product-grid" role="list">
      {PRODUCTS.map((product) => (
        <li key={product.slug}>
          <Card
            render={
              <article className="product" aria-labelledby={`product-${product.slug}-title`} />
            }
          >
            <img
              className="media"
              src={`https://picsum.photos/seed/${product.image}/600/600`}
              alt={product.alt}
              width="600"
              height="600"
            />
            {product.offer && (
              <p className="meta">
                <Badge>{product.offer}</Badge>
              </p>
            )}
            <h3 id={`product-${product.slug}-title`}>
              <a href={`/shop/${product.slug}`}>{product.name}</a>
            </h3>
            <div className="rating">
              <Rating readOnly label="Average rating" value={product.rating} />
              <span>
                ({product.reviews}
                <span className="loam-VisuallyHidden"> reviews</span>)
              </span>
            </div>
            <p className="price">
              {product.was && (
                <>
                  <span className="loam-VisuallyHidden">Was </span>
                  <s>
                    <Price value={product.was} currency="GBP" locale="en-GB" />
                  </s>{" "}
                  <span className="loam-VisuallyHidden">Now </span>
                </>
              )}
              <Price value={product.price} currency="GBP" locale="en-GB" />
            </p>
            <div className="actions">
              <Button>
                Add<span className="loam-VisuallyHidden"> {product.name}</span> to basket
              </Button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
