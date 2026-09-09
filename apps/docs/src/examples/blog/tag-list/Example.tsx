import { Badge } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <ul className="tag-list" role="list" aria-label="Tags">
      <li>
        <Badge size="lg" render={<a href="/tags/broad-beans">Broad beans</a>} />
      </li>
      <li>
        <Badge
          size="lg"
          render={
            <a href="/tags/autumn-sowing" aria-current="page">
              Autumn sowing
            </a>
          }
        />
      </li>
      <li>
        <Badge size="lg" render={<a href="/tags/legumes">Legumes</a>} />
      </li>
      <li>
        <Badge size="lg" render={<a href="/tags/overwintering">Overwintering</a>} />
      </li>
      <li>
        <Badge size="lg" render={<a href="/tags/pigeons">Pigeons</a>} />
      </li>
    </ul>
  );
}
