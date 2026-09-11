"use client";

import { useId } from "react";
import { Badge, Card, Carousel, SignpostLink } from "@loamui/core";
import "./example.css";

const ARTICLES = [
  {
    slug: "picking-french-beans",
    category: "Growing guide",
    title: "Picking French beans at their best",
    seed: 627,
  },
  {
    slug: "haymaking",
    category: "Harvest",
    title: "Haymaking on the member fields",
    seed: 729,
  },
  {
    slug: "spring-buds",
    category: "Plant life",
    title: "A closer look at spring buds",
    seed: 400,
  },
  {
    slug: "woodland-tulips",
    category: "Spring colour",
    title: "Tulips at the woodland edge",
    seed: 976,
  },
  {
    slug: "changing-weather",
    category: "Field notes",
    title: "Reading the weather over the fields",
    seed: 542,
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <Carousel.Root
      className="article-carousel"
      aria-labelledby={`${instanceId}-article-carousel-title`}
      labels={{
        previous: "Previous articles",
        next: "Next articles",
        indicator: (index, count) => `Go to article ${index} of ${count}`,
        status: (index, count) => `Article ${index} of ${count}`,
      }}
    >
      <div className="head">
        <h2 id={`${instanceId}-article-carousel-title`}>From the growers’ journal</h2>
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
                  aria-labelledby={`${instanceId}-article-carousel-${article.slug}`}
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
              <h3 id={`${instanceId}-article-carousel-${article.slug}`}>{article.title}</h3>
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
