"use client";

import { useRef } from "react";
import { Avatar, Button, Card } from "@loamui/core";
import "./carousel.css";

const testimonials = [
  {
    name: "Ada Lovelace",
    role: "Engineering lead, Analytical Engines",
    quote:
      "We shipped a bespoke design system in a week. The primitives did the work; we supplied the vocabulary.",
  },
  {
    name: "Amara Okafor",
    role: "Product designer, Loom & Ledger",
    quote:
      "Dark mode, fluid type and contrast all came for free. I stopped writing overrides on day two.",
  },
  {
    name: "Sam Reed",
    role: "Founder, Northwind Studio",
    quote:
      "Our agent reads the docs and writes components that pass review. That has never happened before.",
  },
  {
    name: "Jane Doe",
    role: "Accessibility consultant",
    quote:
      "Real buttons, real headings, real focus rings. Nothing to fix in the audit, which is the highest praise I have.",
  },
];

export function TestimonialCarousel() {
  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: -1 | 1) => {
    const list = listRef.current;
    if (list) list.scrollBy({ left: direction * list.clientWidth });
  };

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading">What people say</h2>
      <ul ref={listRef}>
        {testimonials.map(({ name, role, quote }) => (
          <li key={name}>
            <Card>
              <blockquote>
                <p>{quote}</p>
              </blockquote>
              <footer>
                <Avatar name={name} aria-hidden />
                <p>
                  <strong>{name}</strong>
                  <br />
                  {role}
                </p>
              </footer>
            </Card>
          </li>
        ))}
      </ul>
      <div className="controls">
        <Button onClick={() => scroll(-1)}>Previous testimonial</Button>
        <Button onClick={() => scroll(1)}>Next testimonial</Button>
      </div>
    </section>
  );
}
