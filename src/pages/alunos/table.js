const columns = [
  {
    name: "nome",
    label: "Nome conpleto",
    align: "left",
    field: "nome",
    sortable: true,
  },
  {
    name: "curso",
    label: "Curso",
    align: "left",
    field: (row) => row.cursos.nome_curso,
    sortable: true,
  },
  {
    name: "turma",
    label: "Turma",
    align: "left",
    field: (row) => row.turmas.nome_turma,
    sortable: true,
  },
  {
    name: "turma",
    label: "Sala nº",
    align: "left",
    field: (row) => row.turmas.num_sala,
    sortable: true,
  },
  {
    name: "classe",
    label: "Classe",
    align: "left",
    field: "classe",
    sortable: true,
  },
  {
    name: "periodo",
    label: "Período",
    align: "left",
    field: (row) => row.periodo.nome_periodo,
    sortable: true,
  },
  {
    name: "ano_lectivo",
    label: "Ano lectivo",
    align: "left",
    field: "ano_lectivo",
    sortable: true,
  },
  {
    name: "idade",
    label: "Idade",
    align: "left",
    field: (row) =>
      new Date().getFullYear() - new Date(row.data_nascimento).getFullYear(),
    sortable: true,
  },
  {
    name: "options",
    label: "Opções",
    align: "center",
    sortable: false,
  },
];

export { columns };
