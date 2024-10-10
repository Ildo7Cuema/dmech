import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";

const { supabase } = useSupabase();
const tableDB = "add_notas";
export const useAdd_Nota_Miniauta_Store = defineStore("add_notas", {
  state: () => ({
    notas: [],
  }),

  getters: {
    notasCount(state) {
      return state.notas.length;
    },
  },

  actions: {
    async getPauta(form) {
      const { data, error } = await supabase
        .from("pauta") // Nome da tabela
        .select(
          `
          *,
          alunos:aluno_id(nome, genero),escolas:escola_id(id, name, provincia, municipio),cursos:curso_id(id, nome_curso), periodos:periodo_id(nome_periodo), classes:classe_id(nome_classe), turmas:turma_id(id, nome_turma), disciplinas:disciplina_id(nome_disciplina)
          mt1, mt2, mt3, mfd, mf, ne, mec
        `
        )
        .eq("classe_id", form.classe_id)
        .eq("turma_id", form.turma_id)
        .eq("curso_id", form.curso_id)
        .eq("periodo_id", form.periodo_id)
        .eq("ano_lectivo", form.ano_lectivo.ano_lectivo);

      if (error) {
        console.error("Erro ao buscar dados:", error);
        return;
      }

      // Função para ordenar os dados por trimestre
      const ordemDisciplinas = [
        "Língua Portuguesa",
        "Inglês",
        "Francês",
        "Matemática",
      ];

      // Mapeia a disciplina para sua posição na lista de prioridade
      const disciplinaPrioridade = ordemDisciplinas.reduce(
        (acc, disciplina, index) => {
          acc[disciplina] = index;
          return acc;
        },
        {}
      );

      // Ordena os dados de acordo com a posição da disciplina
      console.log(data);
      const dadosOrdenados = data.sort((a, b) => {
        const disciplinaA = a.disciplinas.nome_disciplina;
        const disciplinaB = b.disciplinas.nome_disciplina;
        const posA =
          disciplinaPrioridade[disciplinaA] !== undefined
            ? disciplinaPrioridade[disciplinaA]
            : Infinity;
        const posB =
          disciplinaPrioridade[disciplinaB] !== undefined
            ? disciplinaPrioridade[disciplinaB]
            : Infinity;
        return posA - posB;
      });
      console.log(dadosOrdenados);
      return dadosOrdenados;
    },

    async getMiniPauta(
      escolaId,
      cursoID,
      classeID,
      nomeCurso,
      turmaID,
      periodoID,
      anoLectivo,
      disciplinaID,
      trimestre
    ) {
      console.log(nomeCurso);
      if (nomeCurso !== "Ensino primário") {
        const { data, error } = await supabase
          .from(tableDB)
          .select(
            `*, alunos:aluno_id(*), escolas:escola_id(*), turmas:turma_id(id,nome_turma), disciplinas:disciplina_id(*), docentes:docente_id(*), cursos:curso_id(id, nome_curso), classes:classe_id(id, nome_classe), periodos:periodo_id(nome_periodo)`
          )
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("curso_id", cursoID)
          .eq("classe_id", classeID)
          .eq("turma_id", turmaID)
          .eq("periodo_id", periodoID)
          .eq("disciplina_id", disciplinaID);
        if (error) {
          console.error("Error fetching data from database:", error);
          return;
        }
        // Função para ordenar os dados por trimestre
        function ordenarPorTrimestre(dados) {
          const ordemTrimestres = [
            "I Trimestre",
            "II Trimestre",
            "III Trimestre",
          ];
          return dados.sort((a, b) => {
            const trimestreA = ordemTrimestres.indexOf(a.trimestre);
            const trimestreB = ordemTrimestres.indexOf(b.trimestre);
            return trimestreA - trimestreB;
          });
        }

        const dadosOrdenados = ordenarPorTrimestre(data);

        console.log(dadosOrdenados);
        return dadosOrdenados;
      } else {
        //Buscar Mini-pauta para o ensino primario
        console.log(trimestre);
        const { data, error } = await supabase
          .from(tableDB) // Nome da tabela
          .select(
            `
        *,
        alunos:aluno_id(nome, genero),escolas:escola_id(id, name, provincia, municipio),cursos:curso_id(id, nome_curso), periodos:periodo_id(nome_periodo), classes:classe_id(nome_classe), turmas:turma_id(id, nome_turma), disciplinas:disciplina_id(nome_disciplina), funcionarios:docente_id(id, name, genero)
        mt1, mt2, mt3, mfd, mf, ne, mec
      `
          )
          .eq("classe_id", classeID)
          .eq("turma_id", turmaID)
          .eq("curso_id", cursoID)
          .eq("periodo_id", periodoID)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("trimestre", trimestre);

        if (error) {
          console.error("Erro ao buscar dados:", error);
          return;
        }

        // Função para ordenar os dados por trimestre
        const ordemDisciplinas = [
          "Língua Portuguesa",
          "Inglês",
          "Francês",
          "Matemática",
        ];

        // Mapeia a disciplina para sua posição na lista de prioridade
        const disciplinaPrioridade = ordemDisciplinas.reduce(
          (acc, disciplina, index) => {
            acc[disciplina] = index;
            return acc;
          },
          {}
        );

        // Ordena os dados de acordo com a posição da disciplina
        console.log(data);
        const dadosOrdenados = data.sort((a, b) => {
          const disciplinaA = a.disciplinas.nome_disciplina;
          const disciplinaB = b.disciplinas.nome_disciplina;
          const posA =
            disciplinaPrioridade[disciplinaA] !== undefined
              ? disciplinaPrioridade[disciplinaA]
              : Infinity;
          const posB =
            disciplinaPrioridade[disciplinaB] !== undefined
              ? disciplinaPrioridade[disciplinaB]
              : Infinity;
          return posA - posB;
        });
        console.log(dadosOrdenados);
        return dadosOrdenados;
      }
    },

    async add_mini_pauta(form) {
      //verifique se ja existe dados com os campos do form
      console.log(form);
      const { data, error } = await supabase
        .from(tableDB)
        .select("*")
        .eq("trimestre", form.trimestre)
        .eq("disciplina_id", form.disciplina_id)
        .eq("ano_lectivo", form.ano_lectivo)
        .eq("aluno_id", form.aluno_id)
        .eq("docente_id", form.docente_id);

      if (error) {
        console.error("Error fetching data from database:", error);
        return;
      }

      if (data.length > 0) {
        //faça actualização caso ja existir dados

        const existingData = data[0];
        const updatedData = { ...existingData, ...form };

        if (form.trimestre == "III Trimestre") {
          const { data: updatedRecord, error: updateError } = await supabase
            .from(tableDB)
            .update({
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              aluno_id: form.aluno_id,
              disciplina_id: form.disciplina_id,
              curso_id: form.curso_id,
              classe_id: form.classe_id,
              turma_id: form.turma_id,
              periodo_id: form.periodo_id,
              trimestre: form.trimestre,
              mac: form.mac,
              npp: form.npp,
              npt: form.npt,
              mt: form.mt1,
              ne: form.ne,
              nee: form.nee,
              neo: form.neo,
              mec: form.mec,
              mfd: form.mfd,
              mf: form.mf,
              ano_lectivo: form.ano_lectivo,
            })
            .eq("id", existingData.id);
          if (updateError) throw updateError.message;
          return updatedData;
        } else {
          const { data: updatedRecord, error: updateError } = await supabase
            .from(tableDB)
            .update({
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              aluno_id: form.aluno_id,
              disciplina_id: form.disciplina_id,
              curso_id: form.curso_id,
              classe_id: form.classe_id,
              turma_id: form.turma_id,
              periodo_id: form.periodo_id,
              trimestre: form.trimestre,
              mac: form.mac,
              npp: form.npp,
              npt: form.npt,
              mt: form.mt1,
              ano_lectivo: form.ano_lectivo,
            })
            .eq("id", existingData.id);
          if (updateError) throw updateError.message;
          return updatedData;
        }
      } else {
        //faça nova inserção
        if (form.trimestre == "III Trimestre") {
          console.log(form);
          const { data: newRecord, error: insertError } = await supabase
            .from(tableDB)
            .insert({
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              aluno_id: form.aluno_id,
              disciplina_id: form.disciplina_id,
              curso_id: form.curso_id,
              classe_id: form.classe_id,
              turma_id: form.turma_id,
              periodo_id: form.periodo_id,
              trimestre: form.trimestre,
              mac: form.mac,
              npp: form.npp,
              npt: form.npt,
              mt: form.mt1,
              ne: form.ne,
              nee: form.nee,
              neo: form.neo,
              mec: form.mec,
              mfd: form.mfd,
              mf: form.mf,
              ano_lectivo: form.ano_lectivo,
            });

          if (insertError) {
            console.error("Erro ao inserir os dados no banco:", insertError);
            return;
          }

          console.log("Dados inseridos com sucesso:", newRecord);
        } else {
          console.log(form);
          const { data: newRecord, error: insertError } = await supabase
            .from(tableDB)
            .insert({
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              aluno_id: form.aluno_id,
              disciplina_id: form.disciplina_id,
              curso_id: form.curso_id,
              classe_id: form.classe_id,
              turma_id: form.turma_id,
              periodo_id: form.periodo_id,
              trimestre: form.trimestre,
              mac: form.mac,
              npp: form.npp,
              npt: form.npt,
              mt: form.mt1,
              ano_lectivo: form.ano_lectivo,
            });

          if (insertError) {
            console.error("Erro ao inserir os dados no banco:", insertError);
            return;
          }

          console.log("Dados inseridos com sucesso:", newRecord);
        }
      }
    },
  },
});
