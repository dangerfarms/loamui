"use client";

import { useState } from "react";
import { Checkbox, Price, Table, Time } from "@loamui/core";
import "./example.css";

const ORDERS = [
  { id: "HW-1042", member: "Mari Hughes", placed: "2026-09-08", items: 3, total: 14.6 },
  { id: "HW-1041", member: "Dafydd Rees", placed: "2026-09-08", items: 12, total: 41.2 },
  { id: "HW-1040", member: "Amara Okonkwo", placed: "2026-09-07", items: 1, total: 3.4 },
  { id: "HW-1039", member: "Tom Bradshaw", placed: "2026-09-07", items: 6, total: 22.8 },
  { id: "HW-1038", member: "Priya Natarajan", placed: "2026-09-05", items: 4, total: 11 },
  { id: "HW-1037", member: "Nia Prosser", placed: "2026-09-04", items: 8, total: 27.5 },
];

export default function Example() {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const all = selected.size === ORDERS.length;
  const some = selected.size > 0 && !all;

  const toggleAll = () => {
    setSelected(all ? new Set() : new Set(ORDERS.map((order) => order.id)));
  };
  const toggle = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="table-with-selection">
      <Table className="orders" highlightOnHover>
        <caption>Orders placed this week, each with a box to select it.</caption>
        <thead>
          <tr>
            <th scope="col" className="select">
              <Checkbox.Control
                aria-label="Select all orders"
                checked={all}
                indeterminate={some}
                onChange={toggleAll}
              />
            </th>
            <th scope="col">Order</th>
            <th scope="col">Member</th>
            <th scope="col">Placed</th>
            <th scope="col" className="number">
              Items
            </th>
            <th scope="col" className="number">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((order) => (
            <tr key={order.id}>
              <td className="select">
                <Checkbox.Control
                  aria-label={`Select order ${order.id}`}
                  checked={selected.has(order.id)}
                  onChange={() => toggle(order.id)}
                />
              </td>
              <th scope="row">{order.id}</th>
              <td>{order.member}</td>
              <td>
                <Time value={order.placed} locale="en-GB" dateStyle="medium" />
              </td>
              <td className="number">{order.items}</td>
              <td className="number">
                <Price value={order.total} currency="GBP" locale="en-GB" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="status" role="status">
        {selected.size === 0
          ? "No orders selected."
          : `${selected.size} of ${ORDERS.length} orders selected.`}
      </p>
    </div>
  );
}
