import { Card } from "@loamui/core";
import "./example.css";

export default function Example() {
  return (
    <div className="stats-grid" role="group" aria-label="This season at a glance">
      <Card render={<dl className="stat" />}>
        <dt>Varieties in the catalogue</dt>
        <dd className="value">412</dd>
      </Card>
      <Card render={<dl className="stat" />}>
        <dt>Member growers</dt>
        <dd className="value">1,280</dd>
      </Card>
      <Card render={<dl className="stat" />}>
        <dt>Packets posted this year</dt>
        <dd className="value">38,610</dd>
      </Card>
    </div>
  );
}
