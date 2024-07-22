const columns = [
  {
    name: "nome_disciplina",
    label: "Nome da disciplina",
    align: "left",
    field: "nome_disciplina",
    sortable: true,
  },
  {
    name: "escola.name",
    label: "Minha escola",
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
