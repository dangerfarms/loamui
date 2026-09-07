import { Badge, Button, Card } from "@loamui/core";
import "./menu.css";

const courses = [
  {
    title: "Starter",
    status: "vegetarian",
    label: "Vegetarian",
    dishes: [
      ["Burrata", "Heritage tomatoes, basil oil, sourdough crumb", "£9.50"],
      ["Roast beetroot", "Whipped goat's curd, hazelnuts, dill", "£8.00"],
      ["Wild mushroom toast", "Garlic butter, parsley, poached egg", "£8.50"],
    ],
  },
  {
    title: "Dessert",
    status: "sold-out",
    label: "Sold out",
    dishes: [
      ["Sticky toffee pudding", "Date sponge, butterscotch, clotted cream", "£7.50"],
      ["Lemon posset", "Shortbread, raspberries", "£6.50"],
      ["Chocolate tart", "Salted caramel, crème fraîche", "£7.00"],
    ],
  },
] as const;

export function RestaurantMenu() {
  return (
    <section className="menu">
      <h2>Menu</h2>
      {courses.map(({ title, status, label, dishes }) => (
        <Card key={title} className={`menu-card ${status}`}>
          <h3>
            {title} <Badge>{label}</Badge>
          </h3>
          <dl>
            {dishes.map(([name, description, price]) => (
              <div key={name}>
                <dt>
                  {name} <data value={price.slice(1)}>{price}</data>
                </dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
          <Button disabled={status === "sold-out"}>Order {title.toLowerCase()}</Button>
        </Card>
      ))}
    </section>
  );
}
