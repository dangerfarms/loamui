import { Avatar, Badge, Time } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <article className="article-header" aria-labelledby="article-header-title">
      <header>
        <p className="eyebrow">
          <a href="/guides">Growing guides</a>
        </p>
        <h1 id="article-header-title">Sowing broad beans in autumn</h1>
        <p className="standfirst">
          An October sowing of ‘Aquadulce Claudia’ overwinters in the open ground and crops a month
          before anything sown in spring. Which plots it suits, how deep to sow, and how to keep the
          pigeons off.
        </p>
        <div className="byline">
          <Avatar name="Nia Prosser" aria-hidden />
          <address>
            <a href="/growers/nia-prosser" rel="author">
              Nia Prosser
            </a>
          </address>
          <span>
            <Time value="2026-08-28" locale="en-GB" dateStyle="long" />
          </span>
          <span>
            Updated <Time value="2026-09-04" locale="en-GB" dateStyle="long" />
          </span>
          <span>6 min read</span>
        </div>
        <ul className="tags" role="list" aria-label="Tags">
          <li>
            <Badge size="lg" render={<a href="/tags/broad-beans">Broad beans</a>} />
          </li>
          <li>
            <Badge size="lg" render={<a href="/tags/autumn-sowing">Autumn sowing</a>} />
          </li>
          <li>
            <Badge size="lg" render={<a href="/tags/legumes">Legumes</a>} />
          </li>
        </ul>
        <figure>
          <img
            src="https://picsum.photos/seed/hedgerow-broad-beans-lead/1200/675"
            alt="Rows of young broad bean plants in a raised bed, netted against pigeons"
            width="1200"
            height="675"
          />
          <figcaption>
            Autumn-sown ‘Aquadulce Claudia’ on the Ludlow plot in February. Photograph: Nia Prosser
          </figcaption>
        </figure>
      </header>
    </article>
  );
}
