import { Card, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <ul className="grid-asymmetric" role="list">
      <li className="lead">
        <Card render={<article aria-labelledby="grid-asymmetric-lead" />}>
          <img
            className="media"
            src="https://picsum.photos/seed/hedgerow-september/1200/800"
            alt="The nursery bench in September, stacked with trays of perennials for the sale"
            width="1200"
            height="800"
          />
          <h3 id="grid-asymmetric-lead">September at the nursery</h3>
          <p>
            The plant sale opens on the first Saturday, the last of the summer seed comes off the
            bench, and the field walks move to the afternoon as the light shortens. Bare-root orders
            open on the fifteenth.
          </p>
          <div className="actions">
            <SignpostLink href="/news/september">Read the month’s notes</SignpostLink>
          </div>
        </Card>
      </li>
      <li>
        <Card render={<article aria-labelledby="grid-asymmetric-sale" />}>
          <h3 id="grid-asymmetric-sale">Plant sale</h3>
          <p>
            Member-grown perennials, herbs and the last vegetable plugs, on the bench from nine on
            Saturday 5 September.
          </p>
          <div className="actions">
            <SignpostLink href="/events/plant-sale">What is on the bench</SignpostLink>
          </div>
        </Card>
      </li>
      <li>
        <Card render={<article aria-labelledby="grid-asymmetric-swap" />}>
          <h3 id="grid-asymmetric-swap">Seed swap</h3>
          <p>
            Bring what you saved and take what you need, first Sunday of the month. Labels and
            envelopes are on the table.
          </p>
          <div className="actions">
            <SignpostLink href="/events/seed-swap">How the swap works</SignpostLink>
          </div>
        </Card>
      </li>
    </ul>
  );
}
