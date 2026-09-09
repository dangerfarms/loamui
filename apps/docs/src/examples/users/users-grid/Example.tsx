import { Avatar, Card, Price, SignpostLink } from "@loamui/core";
import "./example.css";

const GROWERS = [
  {
    id: "imogen",
    name: "Imogen Hartley",
    role: "Steward, Lower Field",
    email: "imogen@hedgerow.example",
    rate: 22,
  },
  {
    id: "bryn",
    name: "Bryn Powell",
    role: "Head grower",
    email: "bryn@hedgerow.example",
    rate: 28,
  },
  {
    id: "sadia",
    name: "Sadia Rahman",
    role: "Seed librarian",
    email: "sadia@hedgerow.example",
    rate: 20,
  },
  {
    id: "tomos",
    name: "Tomos Ellis",
    role: "Open days coordinator",
    email: "tomos@hedgerow.example",
    rate: 18.5,
  },
];

export default function Example() {
  return (
    <ul className="users-grid" role="list">
      {GROWERS.map((grower) => (
        <li key={grower.id}>
          <Card render={<article aria-labelledby={`users-grid-${grower.id}`} />}>
            <Avatar
              name={grower.name}
              src={`https://picsum.photos/seed/hedgerow-${grower.id}/120/120`}
              aria-hidden
            />
            <div className="text">
              <h2 id={`users-grid-${grower.id}`}>{grower.name}</h2>
              <p className="role">{grower.role}</p>
            </div>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${grower.email}`}>{grower.email}</a>
                </dd>
              </div>
              <div>
                <dt>Rate</dt>
                <dd>
                  <Price value={grower.rate} currency="GBP">
                    an hour
                  </Price>
                </dd>
              </div>
            </dl>
            <SignpostLink href={`/growers/${grower.id}`}>Book a session</SignpostLink>
          </Card>
        </li>
      ))}
    </ul>
  );
}
