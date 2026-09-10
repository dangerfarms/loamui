import { Badge, SignpostLink } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <section className="banner-with-image" aria-labelledby="banner-with-image-title">
      <img
        className="media"
        src="https://picsum.photos/id/429/800/600"
        alt="A cup of freshly picked raspberries on the nursery bench"
        width="800"
        height="600"
      />
      <div className="text">
        <p className="eyebrow">
          <Badge>Until 30 November</Badge>
          <span>Bare-root season</span>
        </p>
        <h2 id="banner-with-image-title">Members take a fifth off fruit trees</h2>
        <p className="description">
          Apples, pears, plums and soft fruit on local rootstocks, lifted the week they are posted.
          Order before the end of November and the discount comes off at the basket.
        </p>
        <div className="actions">
          <SignpostLink href="/catalogue/fruit">See the fruit list</SignpostLink>
        </div>
      </div>
    </section>
  );
}
