import { Avatar } from "@loamui/core";
import "./example.css";

const PEOPLE = [
  { name: "Mari Hughes", role: "Head grower, brassicas and leaf crops" },
  { name: "Dafydd Rees", role: "Legumes and the drying barn" },
  { name: "Amara Okonkwo", role: "Tomatoes, peppers and the polytunnel" },
  { name: "Tom Price", role: "Roots, alliums and germination testing" },
];

export default function Example() {
  return (
    <section className="person-grid" aria-labelledby="person-grid-title">
      <header>
        <p className="eyebrow">The growers</p>
        <h2 id="person-grid-title">Who grows your seed</h2>
        <p className="description">
          Every variety in the catalogue is grown, selected and saved by a member. These four look
          after the trial beds at the nursery.
        </p>
      </header>
      <ul role="list">
        {PEOPLE.map((person) => (
          <li key={person.name}>
            <Avatar name={person.name} aria-hidden="true" />
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
