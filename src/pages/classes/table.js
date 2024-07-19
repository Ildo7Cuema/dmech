const columns = [
  {
    name: "nome_classe",
    label: "Nome de classes frequentadas",
    align: "left",
    field: "nome_classe",
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
