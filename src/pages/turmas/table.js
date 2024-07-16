const columns = [
  {
    name: "nome_turma",
    label: "Nome da Turma",
    align: "left",
    field: "nome_turma",
    sortable: true,
  },
  {
    name: "curso.nome_curso",
    label: "Cursos",
    align: "left",
    field: (row) => row.curso.nome_curso,
    sortable: true,
  },
  {
    name: "num_sala",
    label: "Número da Sala",
    align: "left",
    field: "num_sala",
    sortable: true,
  },
  {
    name: "ano",
    label: "Ano lectivo",
    align: "left",
    field: "ano",
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
