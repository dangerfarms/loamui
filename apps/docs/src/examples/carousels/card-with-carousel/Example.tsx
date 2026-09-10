"use client";

import { Card, Carousel, Price, Rating } from "@loamui/core";
import "./example.css";

const PHOTOS = [
  {
    seed: 206,
    alt: "The cabin at the edge of the orchard in evening light",
  },
  {
    seed: 225,
    alt: "A pot of tea and a cup on the cabin’s kitchen table",
  },
  {
    seed: 33,
    alt: "The meadow beside the cabin at dusk, seen from the porch",
  },
];

export default function Example() {
  return (
    <Card
      render={<article className="card-with-carousel" aria-labelledby="card-with-carousel-title" />}
    >
      <Carousel.Root
        className="photos"
        labels={{
          region: "Photos of the Orchard Cabin",
          previous: "Previous photo",
          next: "Next photo",
          indicator: (index, count) => `Go to photo ${index} of ${count}`,
          status: (index, count) => `Photo ${index} of ${count}`,
        }}
      >
        <Carousel.Track>
          {PHOTOS.map((photo) => (
            <Carousel.Item key={photo.seed}>
              <img
                src={`https://picsum.photos/id/${photo.seed}/640/400`}
                alt={photo.alt}
                width="640"
                height="400"
                loading="lazy"
              />
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <div className="controls">
          <Carousel.Previous />
          <Carousel.Indicators />
          <Carousel.Next />
        </div>
      </Carousel.Root>
      <div className="head">
        <h3 id="card-with-carousel-title">The Orchard Cabin</h3>
        <p className="rating">
          <Rating readOnly label="Average rating" value={4.8} />
          <span>
            (63<span className="loam-VisuallyHidden"> reviews</span>)
          </span>
        </p>
      </div>
      <p className="description">
        Two nights at the nursery, sleeping four, with the walled garden to yourselves once the
        gates close and breakfast from the yard café.
      </p>
      <p className="price">
        <Price value={145} currency="GBP" locale="en-GB">
          per night
        </Price>
      </p>
    </Card>
  );
}
