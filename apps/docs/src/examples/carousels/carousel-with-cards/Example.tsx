"use client";

import { useId } from "react";
import { Badge, Card, Carousel, SignpostLink } from "@loamui/core";
import "./example.css";

const ARTICLES = [
  {
    slug: "autumn-broad-beans",
    category: "Growing guide",
    title: "Sowing broad beans in autumn",
    seed: 627,
  },
  {
    slug: "curing-winter-squash",
    category: "Harvest",
    title: "Curing winter squash for storage",
    seed: 729,
  },
  {
    slug: "saving-tomato-seed",
    category: "Seed saving",
    title: "Saving tomato seed without the smell",
    seed: 400,
  },
  {
    slug: "lifting-dahlias",
    category: "Winter jobs",
    title: "Lifting and storing dahlia tubers",
    seed: 976,
  },
  {
    slug: "green-manures",
    category: "Soil",
    title: "Green manures for a bed you will not touch till March",
    seed: 542,
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <Carousel.Root
      className="carousel-with-cards"
      aria-labelledby={`${instanceId}-carousel-with-cards-title`}
      labels={{
        previous: "Previous articles",
        next: "Next articles",
        indicator: (index, count) => `Go to article ${index} of ${count}`,
        status: (index, count) => `Article ${index} of ${count}`,
      }}
    >
      <div className="head">
        <h2 id={`${instanceId}-carousel-with-cards-title`}>From the growers’ journal</h2>
        <div className="controls">
          <Carousel.Previous />
          <Carousel.Next />
        </div>
      </div>
      <Carousel.Track>
        {ARTICLES.map((article) => (
          <Carousel.Item key={article.slug}>
            <Card
              render={
                <article
                  className="article"
                  aria-labelledby={`${instanceId}-carousel-with-cards-${article.slug}`}
                />
              }
            >
              <img
                className="media"
                src={`https://picsum.photos/id/${article.seed}/640/400`}
                alt=""
                width="640"
                height="400"
                loading="lazy"
              />
              <p className="meta">
                <Badge>{article.category}</Badge>
              </p>
              <h3 id={`${instanceId}-carousel-with-cards-${article.slug}`}>{article.title}</h3>
              <div className="foot">
                <SignpostLink href={`/journal/${article.slug}`}>
                  Read article<span className="loam-VisuallyHidden"> – {article.title}</span>
                </SignpostLink>
              </div>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel.Track>
      <Carousel.Indicators />
    </Carousel.Root>
  );
}
