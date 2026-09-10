import { Badge, Button, Card } from "@loamui/core";
import "./environments.css";

type Status = "healthy" | "deploying" | "failed";

const STATUS_LABEL: Record<Status, string> = {
  healthy: "Healthy",
  deploying: "Deploying",
  failed: "Checks failed",
};

const ENVIRONMENTS: ReadonlyArray<{
  name: string;
  status: Status;
  lastDeploy: string;
  commit: string;
  url: string;
  action: string;
}> = [
  {
    name: "Production",
    status: "healthy",
    lastDeploy: "Today, 09:12",
    commit: "a1b2c3d",
    url: "https://app.example.com",
    action: "Open logs",
  },
  {
    name: "Staging",
    status: "deploying",
    lastDeploy: "Today, 10:40",
    commit: "e4f5a6b",
    url: "https://staging.example.com",
    action: "View deploy",
  },
  {
    name: "Preview",
    status: "failed",
    lastDeploy: "Yesterday, 17:05",
    commit: "c7d8e9f",
    url: "https://pr-482.example.com",
    action: "Roll back",
  },
];

export function EnvironmentsOverview() {
  return (
    <section className="environments">
      <h2>Environments</h2>
      <ul>
        {ENVIRONMENTS.map((env) => (
          <li key={env.name}>
            {/* The status class sets --loam-context on the card root; Badge and Button inside answer it. */}
            <Card className={`environment ${env.status}`}>
              <h3>
                {env.name} <Badge dot>{STATUS_LABEL[env.status]}</Badge>
              </h3>
              <dl>
                <dt>Last deploy</dt>
                <dd>{env.lastDeploy}</dd>
                <dt>Commit</dt>
                <dd>
                  <code>{env.commit}</code>
                </dd>
                <dt>URL</dt>
                <dd>
                  <a href={env.url}>{env.url}</a>
                </dd>
              </dl>
              <Button>{env.action}</Button>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
