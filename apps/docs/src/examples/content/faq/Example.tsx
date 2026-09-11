"use client";

import { useId } from "react";
import { Details } from "@loamui/core";
import "./example.css";

const QUESTIONS = [
  {
    question: "Do you post to Ireland and the Channel Islands?",
    answer:
      "Seed, yes, at the same second-class rate. Bare-root fruit and plants cannot cross the water without a phytosanitary certificate, so they are collected from the nursery or posted within Great Britain only.",
  },
  {
    question: "What if a packet does not come up?",
    answer:
      "Tell us the variety and the harvest year on the packet and we send a replacement from a different batch, or refund it. Germination is tested before listing, but a cold spring can still beat a good batch.",
  },
  {
    question: "Can a school or allotment society join?",
    answer:
      "Yes, as a group member. A group pays the household rate, receives the twelve packets as one parcel and can send up to four people to each workshop.",
  },
  {
    question: "How do I grow something for the bench?",
    answer:
      "Ask at the nursery or write to the bench. A grower takes on one variety, keeps it the required distance from its relatives, and brings the cleaned seed in after harvest for testing.",
  },
];

export default function Example() {
  const instanceId = useId();
  return (
    <section className="faq" aria-labelledby={`${instanceId}-faq-title`}>
      <div className="inner">
        <header>
          <h2 id={`${instanceId}-faq-title`}>Questions about ordering</h2>
          <p>
            Posting, replacements and joining as a group. Still unsure? The nursery answers the
            phone on open days.
          </p>
        </header>
        <div className="questions">
          {QUESTIONS.map((item) => (
            <Details.Root key={item.question} name={instanceId}>
              <Details.Summary>{item.question}</Details.Summary>
              <Details.Content>
                <p>{item.answer}</p>
              </Details.Content>
            </Details.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
