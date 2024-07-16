const columns = [
  {
    name: "nome_periodo",
    label: "Nome do período",
    align: "left",
    field: "nome_periodo",
    sortable: true,
  },
  {
    name: "escola.name",
    label: "A sua escola",
    align: "left",
    field: (row) => row.escola.name,
    sortable: true,
  },
  {
    name: "options",
    label: "Opções",
    align: "left",
    field: "options",
    sortable: true,
  },
];

export { columns };
