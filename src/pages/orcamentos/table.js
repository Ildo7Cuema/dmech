import { formatCurrency } from "src/utils/formatCurrency";

const columns = [
  {
    name: "project_name",
    label: "Nome do projecto",
    align: "left",
    field: "project_name",
    sortable: true,
  },
  {
    name: "area_actuacao",
    label: "Área de actuação",
    align: "left",
    field: "area_actuacao",
    sortable: true,
  },
  {
    name: "data_inicio",
    label: "Data de início",
    align: "left",
    field: "data_inicio",
    sortable: true,
  },
  {
    name: "data_fim",
    label: "Data do fim",
    align: "left",
    field: "data_fim",
    sortable: true,
  },

  {
    name: "custo",
    label: "Valor de custo",
    align: "left",
    field: "custo",
    sortable: true,
    format: (val) => formatCurrency(val),
  },
  {
    name: "options",
    label: "Opções",
    align: "left",
    field: "options",
  },
];

export { columns };
