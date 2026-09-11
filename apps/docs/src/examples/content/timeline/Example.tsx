import "./example.css";

const EVENTS = [
  {
    date: "2014-04",
    label: "April 2014",
    title: "Three allotments and a kitchen table",
    description:
      "Five growers on the Ludlow allotments pool the seed they have saved and post packets to friends who ask.",
  },
  {
    date: "2016-01",
    label: "January 2016",
    title: "The first catalogue",
    description:
      "Forty varieties in a photocopied booklet, sold from a trestle table at the winter market.",
  },
  {
    date: "2019-03",
    label: "March 2019",
    title: "Registered as a co-operative",
    description:
      "Hedgerow becomes a community benefit society: one member, one vote, and the surplus goes back into growing.",
  },
  {
    date: "2022-05",
    label: "May 2022",
    title: "The nursery opens at Bromfield",
    description:
      "Two acres, a polytunnel and a drying barn, with trial beds any member can walk on open days.",
  },
  {
    date: "2025-09",
    label: "September 2025",
    title: "A thousand members",
    description:
      "The thousandth member joins the week the catalogue passes four hundred varieties.",
  },
];

export default function Example() {
  return (
    <ol className="timeline" role="list">
      {EVENTS.map((event) => (
        <li key={event.date}>
          <time dateTime={event.date}>{event.label}</time>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </li>
      ))}
    </ol>
  );
}
