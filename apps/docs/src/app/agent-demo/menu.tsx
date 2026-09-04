import { Badge, Button, Card } from "@loamui/core";
import "./menu.css";

type Dish = { name: string; description: string; price: string };

type Course = {
  title: string;
  status: "vegetarian" | "contains-nuts" | "sold-out";
  label: string;
  dishes: Dish[];
};

const courses: Course[] = [
  {
    title: "Starter",
    status: "vegetarian",
    label: "Vegetarian",
    dishes: [
      {
        name: "Burrata",
        description: "Heritage tomatoes, basil oil and sourdough crumb.",
        price: "£8.50",
      },
      {
        name: "Roast beetroot",
        description: "Whipped goat's curd, hazelnut and dill.",
        price: "£7.00",
      },
      {
        name: "Soup of the day",
        description: "Served with warm brown bread and salted butter.",
        price: "£6.50",
      },
    ],
  },
  {
    title: "Main course",
    status: "contains-nuts",
    label: "Contains nuts",
    dishes: [
      {
        name: "Chicken satay",
        description: "Peanut sauce, jasmine rice and pickled cucumber.",
        price: "£16.00",
      },
      {
        name: "Pesto linguine",
        description: "Pine nuts, basil and aged parmesan.",
        price: "£14.50",
      },
      {
        name: "Trout amandine",
        description: "Brown butter, toasted almonds and green beans.",
        price: "£19.00",
      },
    ],
  },
  {
    title: "Dessert",
    status: "sold-out",
    label: "Sold out",
    dishes: [
      {
        name: "Sticky toffee pudding",
        description: "Butterscotch sauce and clotted cream.",
        price: "£7.50",
      },
      { name: "Lemon tart", description: "Italian meringue and raspberry sorbet.", price: "£7.00" },
      {
        name: "Cheese board",
        description: "Three British cheeses, chutney and oatcakes.",
        price: "£9.50",
      },
    ],
  },
];

export function RestaurantMenu() {
  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="courses">
        {courses.map((course) => (
          <Card className={`course ${course.status}`} key={course.title}>
            <h3>
              {course.title} <Badge>{course.label}</Badge>
            </h3>
            <dl>
              {course.dishes.map((dish) => (
                <div key={dish.name}>
                  <dt>
                    {dish.name} <data value={dish.price.slice(1)}>{dish.price}</data>
                  </dt>
                  <dd>{dish.description}</dd>
                </div>
              ))}
            </dl>
            <Button disabled={course.status === "sold-out"}>Add to order</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
