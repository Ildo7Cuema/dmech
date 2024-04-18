import { formatCurrency } from "src/utils/formatCurrency";
const columns = [
  {
    name: "categoria",
    label: "Nome de categoria",
    align: "left",
    field: "categoria",
    sortable: true,
  },
  {
    name: "actions",
    label: "Opções",
    align: "left",
    field: "actions",
    sortable: true,
  },
];

export { columns };
