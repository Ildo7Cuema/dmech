import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import usenotification from "src/composible/useNotify";

const { notifyError, notifySuccess } = usenotification();
const { supabase } = useSupabase();
//tabelas no banco
const mac1 = "mac1";
const mac2 = "mac2";
const mac3 = "mac3";
const npp1 = "npp1";
const npp2 = "npp2";
const npp3 = "npp3";
const npt1 = "npt1";
const npt2 = "npt2";
const npt3 = "npt3";
const mt1 = "mt1";
const mt2 = "mt2";
const mt3 = "mt3";
const mfd = "mfd";
const ne = "ne";
const nee = "nee";
const neo = "neo";
const mec = "mec";
const mf = "mf";
const pauta = "pauta";
const disciplina_table = "disciplinas";

export const useNotasStore = defineStore("notas", {
  state: () => ({
    notas: [],
  }),

  getters: {
    getAllCountNotas: (state) => state.notas.length,
  },

  actions: {
    // função para cadastrar dados do primeiro trimestre
    async addNota_primeiroTrimestre(infoAluno) {
      console.log(infoAluno);
      try {
        const { data, error } = await supabase
          .from(mac1)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre)
          .eq("docente_id", infoAluno.docente_id);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(mac1)
            .update([
              {
                mac1: infoAluno.mac,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(mac1).insert([
            {
              mac1: infoAluno.mac,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        notifyError("Erro ao inserir a nota ", error.message);
      }

      try {
        const { data, error } = await supabase
          .from(npp1)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(npp1)
            .update([
              {
                npp1: infoAluno.npp,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(npp1).insert([
            {
              npp1: infoAluno.npp,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(npt1)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(npt1)
            .update([
              {
                npt1: infoAluno.npt,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(npt1).insert([
            {
              npt1: infoAluno.npt,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(mt1)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(mt1)
            .update([
              {
                mt1: infoAluno.mt1,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
        } else {
          // Insert new record
          await supabase.from(mt1).insert([
            {
              mt1: infoAluno.mt1,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
        }
      } catch (error) {
        console.error(error);
      }

      //Inserir nota para pauta na tabela pauta do mt1
      try {
        const { data, error } = await supabase
          .from(pauta)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(pauta)
            .update([
              {
                mt1: infoAluno.mt1,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
        } else {
          // Insert new record
          const { data, error } = await supabase.from(pauta).insert([
            {
              mt1: infoAluno.mt1,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
            },
          ]);
          if (error) throw error.message;
          notifySuccess("Notas inseridas com sucesso");
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // ==============================================================================================================
    async addNota_segundoTrimestre(infoAluno) {
      console.log(infoAluno);
      try {
        const { data, error } = await supabase
          .from(mac2)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(mac2)
            .update([
              {
                mac2: infoAluno.mac2,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(mac2).insert([
            {
              mac2: infoAluno.mac2,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        notifyError("Erro ao inserir a nota ", error.message);
      }

      try {
        const { data, error } = await supabase
          .from(npp2)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(npp2)
            .update([
              {
                npp2: infoAluno.npp2,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(npp2).insert([
            {
              npp2: infoAluno.npp2,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(npt2)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(npt2)
            .update([
              {
                npt2: infoAluno.npt2,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(npt2).insert([
            {
              npt2: infoAluno.npt2,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(mt2)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(mt2)
            .update([
              {
                mt2: infoAluno.mt2,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
        } else {
          // Insert new record
          await supabase.from(mt2).insert([
            {
              mt2: infoAluno.mt2,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
        }
      } catch (error) {
        console.error(error);
      }

      //Inserindo nota na pauta mt2
      try {
        const { data, error } = await supabase
          .from(pauta)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(pauta)
            .update([
              {
                mt2: infoAluno.mt2,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
        } else {
          // Insert new record
          const { data, error } = await supabase.from(pauta).insert([
            {
              mt2: infoAluno.mt2,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
            },
          ]);
          if (error) throw error.message;
          notifySuccess("Notas inseridas com sucesso");
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // ==============================================================================================================
    // ==============================================================================================================
    async addNota_terceiroTrimestre(infoAluno) {
      console.log(infoAluno);
      try {
        const { data, error } = await supabase
          .from(mac3)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(mac3)
            .update([
              {
                mac3: infoAluno.mac3,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          notifySuccess(
            `Valor do MAC actualizado com sucesso: `,
            infoAluno.mac3,
            `VALORES`
          );
        } else {
          // Insert new record
          await supabase.from(mac3).insert([
            {
              mac3: infoAluno.mac3,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);

          notifySuccess(
            `Valor do MAC inserido com sucesso: `,
            infoAluno.mac3,
            `VALORES`
          );
        }
      } catch (error) {
        notifyError("Erro ao inserir a nota ", error.message);
      }

      try {
        const { data, error } = await supabase
          .from(npp3)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(npp3)
            .update([
              {
                npp3: infoAluno.npp3,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          notifySuccess(
            `Valor do NPP actualizado com sucesso: `,
            infoAluno.npp3,
            `VALORES`
          );
        } else {
          // Insert new record
          await supabase.from(npp3).insert([
            {
              npp3: infoAluno.npp3,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);

          notifySuccess(
            `Valor do NPP foi inserido com sucesso: `,
            infoAluno.npp3,
            `VALORES`
          );
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(npt3)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          await supabase
            .from(npt3)
            .update([
              {
                npt3: infoAluno.npt3,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          notifySuccess(
            `Valor do NPT foi actualizado com sucesso: `,
            infoAluno.npt3,
            `VALORES`
          );
        } else {
          // Insert new record
          await supabase.from(npt3).insert([
            {
              npt3: infoAluno.npt3,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
          notifySuccess(
            `Valor do NPT foi inserido com sucesso: `,
            infoAluno.npp3,
            `VALORES`
          );
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(mt3)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(mt3)
            .update([
              {
                mt3: infoAluno.mt3,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
        } else {
          // Insert new record
          await supabase.from(mt3).insert([
            {
              mt3: infoAluno.mt3,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }

      try {
        const { data, error } = await supabase
          .from(mfd)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(mfd)
            .update([
              {
                mfd: infoAluno.mfd,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
        } else {
          // Insert new record
          await supabase.from(mfd).insert([
            {
              mfd: infoAluno.mfd,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
        }
      } catch (error) {
        console.error(error);
      }
      console.log(infoAluno);

      //insert to mf table
      try {
        const { data, error } = await supabase
          .from(mf)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id)
          .eq("trimestre", infoAluno.trimestre);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(mf)
            .update([
              {
                mf: infoAluno.mf,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota MF actualizado com sucesso!");
        } else {
          // Insert new record
          await supabase.from(mf).insert([
            {
              mf: infoAluno.mf,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              trimestre: infoAluno.trimestre,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
              docente_id: infoAluno.docente_id,
            },
          ]);
          notifySuccess("Notas do MF inserido com sucesso");
        }
      } catch (error) {
        console.error(error);
      }
      //Inserindo nota na pauta valor do III trimestre mt3
      try {
        const { data, error } = await supabase
          .from(pauta)
          .select("*")
          .eq("aluno_id", infoAluno.aluno_id)
          .eq("ano_lectivo", infoAluno.ano_lectivo)
          .eq("disciplina_id", infoAluno.disciplina_id);

        if (error) {
          throw new Error(error.message);
        }

        if (data.length > 0) {
          // Update existing record
          const { id } = data[0];
          const { error } = await supabase
            .from(pauta)
            .update([
              {
                mt3: infoAluno.mt3,
                mfd: infoAluno.mfd,
                mf: infoAluno.mf,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
        } else {
          // Insert new record
          const { data, error } = await supabase.from(pauta).insert([
            {
              mt3: infoAluno.mt3,
              mfd: infoAluno.mfd,
              mf: infoAluno.mf,
              disciplina_id: infoAluno.disciplina_id,
              curso_id: infoAluno.curso_id,
              turma_id: infoAluno.turma_id,
              periodo_id: infoAluno.periodo_id,
              escola_id: infoAluno.escola_id,
              classe_id: infoAluno.classe_id,
              aluno_id: infoAluno.aluno_id,
              ano_lectivo: infoAluno.ano_lectivo,
            },
          ]);
          if (error) throw error.message;
          notifySuccess("Notas inseridas com sucesso");
          return data;
        }
      } catch (error) {
        console.error(error);
      }
      // confirmar ou verifica se o usuario selecionou o III Trimestre e as disciplinas de L. port para inserir os dados nas tabelas nee, neo, mec, mf
      if (
        (infoAluno.trimestre == "III Trimestre" &&
          infoAluno.nome_disciplina == "Língua Portuguesa") ||
        infoAluno.nome_disciplina == "Língua Estrangeira" ||
        infoAluno.nome_disciplina == "L. Portuguesa" ||
        infoAluno.nome_disciplina == "L. Estrangeira" ||
        infoAluno.nome_disciplina == "Inglês" ||
        infoAluno.nome_disciplina == "Francês"
      ) {
        //insert to nee table
        try {
          const { data, error } = await supabase
            .from(nee)
            .select("*")
            .eq("aluno_id", infoAluno.aluno_id)
            .eq("ano_lectivo", infoAluno.ano_lectivo)
            .eq("disciplina_id", infoAluno.disciplina_id)
            .eq("trimestre", infoAluno.trimestre);

          if (error) {
            throw new Error(error.message);
          }

          if (data.length > 0) {
            // Update existing record
            const { id } = data[0];
            const { error } = await supabase
              .from(nee)
              .update([
                {
                  nee: infoAluno.nee,
                  disciplina_id: infoAluno.disciplina_id,
                  curso_id: infoAluno.curso_id,
                  turma_id: infoAluno.turma_id,
                  periodo_id: infoAluno.periodo_id,
                  escola_id: infoAluno.escola_id,
                  trimestre: infoAluno.trimestre,
                  classe_id: infoAluno.classe_id,
                  aluno_id: infoAluno.aluno_id,
                  ano_lectivo: infoAluno.ano_lectivo,
                  docente_id: infoAluno.docente_id,
                },
              ])
              .eq("id", id);
            if (error)
              throw notifyError("Erro ao inserir a nota ", error.message);
            else notifySuccess("Nota actualizada com sucesso!");
          } else {
            // Insert new record
            await supabase.from(nee).insert([
              {
                nee: infoAluno.nee,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ]);
            notifySuccess("Notas inseridas com sucesso");
          }
        } catch (error) {
          console.error(error);
        }
        //insert to neo table
        try {
          const { data, error } = await supabase
            .from(neo)
            .select("*")
            .eq("aluno_id", infoAluno.aluno_id)
            .eq("ano_lectivo", infoAluno.ano_lectivo)
            .eq("disciplina_id", infoAluno.disciplina_id)
            .eq("trimestre", infoAluno.trimestre);

          if (error) {
            throw new Error(error.message);
          }

          if (data.length > 0) {
            // Update existing record
            const { id } = data[0];
            const { error } = await supabase
              .from(neo)
              .update([
                {
                  neo: infoAluno.neo,
                  disciplina_id: infoAluno.disciplina_id,
                  curso_id: infoAluno.curso_id,
                  turma_id: infoAluno.turma_id,
                  periodo_id: infoAluno.periodo_id,
                  escola_id: infoAluno.escola_id,
                  trimestre: infoAluno.trimestre,
                  classe_id: infoAluno.classe_id,
                  aluno_id: infoAluno.aluno_id,
                  ano_lectivo: infoAluno.ano_lectivo,
                  docente_id: infoAluno.docente_id,
                },
              ])
              .eq("id", id);
            if (error)
              throw notifyError("Erro ao inserir a nota ", error.message);
            else notifySuccess("Nota actualizada com sucesso!");
          } else {
            // Insert new record
            await supabase.from(neo).insert([
              {
                neo: infoAluno.neo,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ]);
            notifySuccess("Notas inseridas com sucesso");
          }
        } catch (error) {
          console.error(error);
        }
        //insert to mec table
        try {
          const { data, error } = await supabase
            .from(mec)
            .select("*")
            .eq("aluno_id", infoAluno.aluno_id)
            .eq("ano_lectivo", infoAluno.ano_lectivo)
            .eq("disciplina_id", infoAluno.disciplina_id)
            .eq("trimestre", infoAluno.trimestre);

          if (error) {
            throw new Error(error.message);
          }

          if (data.length > 0) {
            // Update existing record
            const { id } = data[0];
            const { error } = await supabase
              .from(mec)
              .update([
                {
                  mec: infoAluno.mec,
                  disciplina_id: infoAluno.disciplina_id,
                  curso_id: infoAluno.curso_id,
                  turma_id: infoAluno.turma_id,
                  periodo_id: infoAluno.periodo_id,
                  escola_id: infoAluno.escola_id,
                  trimestre: infoAluno.trimestre,
                  classe_id: infoAluno.classe_id,
                  aluno_id: infoAluno.aluno_id,
                  ano_lectivo: infoAluno.ano_lectivo,
                  docente_id: infoAluno.docente_id,
                },
              ])
              .eq("id", id);
            if (error)
              throw notifyError("Erro ao inserir a nota ", error.message);
            else notifySuccess("Nota actualizada com sucesso!");
          } else {
            // Insert new record
            await supabase.from(mec).insert([
              {
                mec: infoAluno.mec,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                trimestre: infoAluno.trimestre,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
                docente_id: infoAluno.docente_id,
              },
            ]);
            notifySuccess("Notas inseridas com sucesso");
          }
        } catch (error) {
          console.error(error);
        }

        try {
          const { data, error } = await supabase
            .from(pauta)
            .select("*")
            .eq("aluno_id", infoAluno.aluno_id)
            .eq("ano_lectivo", infoAluno.ano_lectivo)
            .eq("disciplina_id", infoAluno.disciplina_id);

          if (error) {
            throw new Error(error.message);
          }

          if (data.length > 0) {
            // Update existing record
            const { id } = data[0];
            const { error } = await supabase
              .from(pauta)
              .update([
                {
                  mec: infoAluno.mec,
                  disciplina_id: infoAluno.disciplina_id,
                  curso_id: infoAluno.curso_id,
                  turma_id: infoAluno.turma_id,
                  periodo_id: infoAluno.periodo_id,
                  escola_id: infoAluno.escola_id,
                  classe_id: infoAluno.classe_id,
                  aluno_id: infoAluno.aluno_id,
                  ano_lectivo: infoAluno.ano_lectivo,
                },
              ])
              .eq("id", id);
            if (error)
              throw notifyError("Erro ao inserir a nota ", error.message);
            else notifySuccess("Nota actualizada com sucesso!");
          } else {
            // Insert new record
            const { data, error } = await supabase.from(pauta).insert([
              {
                mec: infoAluno.mec,
                disciplina_id: infoAluno.disciplina_id,
                curso_id: infoAluno.curso_id,
                turma_id: infoAluno.turma_id,
                periodo_id: infoAluno.periodo_id,
                escola_id: infoAluno.escola_id,
                classe_id: infoAluno.classe_id,
                aluno_id: infoAluno.aluno_id,
                ano_lectivo: infoAluno.ano_lectivo,
              },
            ]);
            if (error) throw error.message;
            notifySuccess("Notas inseridas com sucesso");
            return data;
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    // ==============================================================================================================
    async getNotaPrimeiroTrimestre(
      idAluno,
      anoLectivo,
      escolaId,
      disciplina,
      trimestre,
      classeId,
      turmaId,
      periodoId,
      cursoId,
      docenteId
    ) {
      try {
        console.log(
          idAluno,
          anoLectivo,
          escolaId,
          disciplina,
          trimestre,
          classeId,
          turmaId,
          periodoId,
          cursoId,
          docenteId
        );
        const { data, error } = await supabase
          .from(mac1)
          .select("mac1")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (error) {
          throw new Error(error.message);
        }

        const mac1Data = data.length > 0 ? data[0] : 0;

        const { data: nppData, error: nppError } = await supabase
          .from(npp1)
          .select("npp1")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (nppError) {
          throw new Error(nppError.message);
        }

        const npp1Data = nppData.length > 0 ? nppData[0] : 0;

        const { data: nptData, error: nptError } = await supabase
          .from(npt1)
          .select("npt1")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (nptError) {
          throw new Error(nptError.message);
        }

        const npt1Data = nptData.length > 0 ? nptData[0] : 0;

        const { data: mtData, error: mtError } = await supabase
          .from(mt1)
          .select("mt1")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (mtError) {
          throw new Error(mtError.message);
        }

        const mt1Data = mtData.length > 0 ? mtData[0] : 0;

        return {
          mac1Data,
          npp1Data,
          npt1Data,
          mt1Data,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    //==========================================================================================================
    async getNotaSegundoTrimestre(
      idAluno,
      anoLectivo,
      escolaId,
      disciplina,
      trimestre,
      classeId,
      turmaId,
      periodoId,
      cursoId,
      docenteId
    ) {
      try {
        console.log(
          idAluno,
          anoLectivo,
          escolaId,
          disciplina,
          trimestre,
          classeId,
          turmaId,
          periodoId,
          cursoId,
          docenteId
        );
        const { data, error } = await supabase
          .from(mac2)
          .select("mac2")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (error) {
          throw new Error(error.message);
        }

        const mac2Data = data.length > 0 ? data[0] : 0;

        const { data: nppData, error: nppError } = await supabase
          .from(npp2)
          .select("npp2")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (nppError) {
          throw new Error(nppError.message);
        }

        const npp2Data = nppData.length > 0 ? nppData[0] : 0;

        const { data: nptData, error: nptError } = await supabase
          .from(npt2)
          .select("npt2")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (nptError) {
          throw new Error(nptError.message);
        }

        const npt2Data = nptData.length > 0 ? nptData[0] : 0;

        const { data: mtData, error: mtError } = await supabase
          .from(mt2)
          .select("mt2")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (mtError) {
          throw new Error(mtError.message);
        }

        const mt2Data = mtData.length > 0 ? mtData[0] : 0;

        return {
          mac2Data,
          npp2Data,
          npt2Data,
          mt2Data,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },

    async getNotaTerceiroTrimestre(
      idAluno,
      anoLectivo,
      escolaId,
      disciplina,
      trimestre,
      classeId,
      turmaId,
      periodoId,
      cursoId,
      docenteId
    ) {
      try {
        const { data, error } = await supabase
          .from(mac3)
          .select("mac3")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (error) {
          throw new Error(error.message);
        }

        const mac3Data = data.length > 0 ? data[0] : 0;

        const { data: nppData, error: nppError } = await supabase
          .from(npp3)
          .select("npp3")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (nppError) {
          throw new Error(nppError.message);
        }

        const npp3Data = nppData.length > 0 ? nppData[0] : 0;

        const { data: nptData, error: nptError } = await supabase
          .from(npt3)
          .select("npt3")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (nptError) {
          throw new Error(nptError.message);
        }

        const npt3Data = nptData.length > 0 ? nptData[0] : 0;

        const { data: mtData, error: mtError } = await supabase
          .from(mt3)
          .select("mt3")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (mtError) {
          throw new Error(mtError.message);
        }

        const mt3Data = mtData.length > 0 ? mtData[0] : 0;

        const { data: mfdData, error: mfdError } = await supabase
          .from(mfd)
          .select("mfd")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (mfdError) {
          throw new Error(mfdError.message);
        }
        const mfd3Data = mfdData.length > 0 ? mfdData[0] : 0;

        const { data: neeData, error: neeError } = await supabase
          .from(nee)
          .select("nee")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (neeError) {
          throw new Error(neeError.message);
        }
        const nee3Data = neeData.length > 0 ? neeData[0] : 0;

        const { data: neoData, error: neoError } = await supabase
          .from(neo)
          .select("neo")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (neoError) {
          throw new Error(neoError.message);
        }
        const neo3Data = neoData.length > 0 ? neoData[0] : 0;

        const { data: mecData, error: mecError } = await supabase
          .from(mec)
          .select("mec")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (mecError) {
          throw new Error(mecError.message);
        }
        const mec3Data = mecData.length > 0 ? mecData[0] : 0;

        const { data: neData, error: neError } = await supabase
          .from(ne)
          .select("ne")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (neError) {
          throw new Error(neError.message);
        }
        const ne3Data = neData.length > 0 ? neData[0] : 0;

        const { data: mfData, error: mfError } = await supabase
          .from(mf)
          .select("mf")
          .eq("aluno_id", idAluno)
          .eq("ano_lectivo", anoLectivo)
          .eq("escola_id", escolaId)
          .eq("disciplina_id", disciplina)
          .eq("trimestre", trimestre)
          .eq("classe_id", classeId)
          .eq("turma_id", turmaId)
          .eq("periodo_id", periodoId)
          .eq("curso_id", cursoId)
          .eq("docente_id", docenteId);

        if (mfError) {
          throw new Error(mfError.message);
        }
        const mf3Data = mfData.length > 0 ? mfData[0] : 0;

        return {
          mac3Data,
          npp3Data,
          npt3Data,
          mt3Data,
          mfd3Data,
          nee3Data,
          neo3Data,
          mec3Data,
          ne3Data,
          mf3Data,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },

    async getMiniPautas(
      escolaId,
      cursoId,
      classeId,
      turmaId,
      periodoId,
      anoLectivo,
      disciplinaId,
      docenteId
    ) {
      console.log(escolaId, classeId, cursoId);
      try {
        //I Trimestre
        const { data: mac1Data, error: mac1Error } = await supabase
          .from(mac1)
          .select(
            `mac1, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mac1Error) throw mac1Error;
        const dataMac1 = mac1Data.length > 0 ? mac1Data : null;

        const { data: npp1Data, error: npp1Error } = await supabase
          .from(npp1)
          .select(
            `npp1, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mac1Error) throw npp1Error;
        const dataNpp1 = npp1Data.length > 0 ? npp1Data : null;

        const { data: npt1Data, error: npt1Error } = await supabase
          .from(npt1)
          .select(
            `npt1, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (npt1Error) throw npt1Error;
        const dataNpt1 = npt1Data.length > 0 ? npt1Data : null;

        const { data: mt1Data, error: mt1Error } = await supabase
          .from(mt1)
          .select(
            `mt1, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mt1Error) throw mt1Error;
        const dataMt1 = mt1Data.length > 0 ? mt1Data : null;

        //II Trimestres
        const { data: mac2Data, error: mac2Error } = await supabase
          .from(mac2)
          .select(
            `mac2, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mac2Error) throw mac2Error;
        const dataMac2 = mac2Data.length > 0 ? mac2Data : null;

        const { data: npp2Data, error: npp2Error } = await supabase
          .from(npp2)
          .select(
            `npp2, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (npp2Error) throw npp2Error;
        const dataNpp2 = npp2Data.length > 0 ? npp2Data : null;

        const { data: npt2Data, error: npt2Error } = await supabase
          .from(npt2)
          .select(
            `npt2, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (npt2Error) throw npt2Error;
        const dataNpt2 = npt2Data.length > 0 ? npt2Data : null;

        const { data: mt2Data, error: mt2Error } = await supabase
          .from(mt2)
          .select(
            `mt2, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mt2Error) throw mt2Error;
        const dataMt2 = mt2Data.length > 0 ? mt2Data : null;

        //III Trimestres
        const { data: mac3Data, error: mac3Error } = await supabase
          .from(mac3)
          .select(
            `mac3, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mac3Error) throw mac3Error;
        const dataMac3 = mac3Data.length > 0 ? mac3Data : null;

        const { data: npp3Data, error: npp3Error } = await supabase
          .from(npp3)
          .select(
            `npp3, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (npp3Error) throw npp3Error;
        const dataNpp3 = npp3Data.length > 0 ? npp3Data : null;

        const { data: npt3Data, error: npt3Error } = await supabase
          .from(npt3)
          .select(
            `npt3, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (npt3Error) throw npt3Error;
        const dataNpt3 = npt3Data.length > 0 ? npt3Data : null;

        const { data: mt3Data, error: mt3Error } = await supabase
          .from(mt3)
          .select(
            `mt3, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mt3Error) throw mt3Error;
        const dataMt3 = mt3Data.length > 0 ? mt3Data : null;

        const { data: mfdData, error: mfdError } = await supabase
          .from(mfd)
          .select(
            `mfd, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mfdError) throw mfdError;
        const dataMfd = mfdData.length > 0 ? mfdData : null;

        const { data: neData, error: neError } = await supabase
          .from(ne)
          .select(
            `ne, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (neError) throw neError;
        const dataNe = neData.length > 0 ? neData : null;

        const { data: neeData, error: neeError } = await supabase
          .from(nee)
          .select(
            `nee, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (neeError) throw neeError;
        const dataNee = neeData.length > 0 ? neeData : null;

        const { data: neoData, error: neoError } = await supabase
          .from(neo)
          .select(
            `neo, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (neoError) throw neoError;
        const dataNeo = neoData.length > 0 ? neoData : null;

        const { data: mecData, error: mecError } = await supabase
          .from(mec)
          .select(
            `mec, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mecError) throw mecError;
        const dataMec = mecData.length > 0 ? mecData : null;

        const { data: mfData, error: mfError } = await supabase
          .from(mf)
          .select(
            `mf, alunos:aluno_id(nome, genero), disciplinas:disciplina_id(nome_disciplina), escolas:escola_id(nivel_ensino)`
          )
          .eq("curso_id", cursoId)
          .eq("periodo_id", periodoId)
          .eq("ano_lectivo", anoLectivo.ano_lectivo)
          .eq("escola_id", escolaId)
          .eq("turma_id", turmaId)
          .eq("classe_id", classeId)
          .eq("disciplina_id", disciplinaId)
          .eq("docente_id", docenteId);
        if (mfError) throw mfError;
        const dataMf = mfData.length > 0 ? mfData : null;

        return {
          dataMac1,
          dataNpp1,
          dataNpt1,
          dataMt1,
          dataMac2,
          dataNpp2,
          dataNpt2,
          dataMt2,
          dataMac3,
          dataNpp3,
          dataNpt3,
          dataMt3,
          dataMfd,
          dataNe,
          dataNee,
          dataNeo,
          dataMec,
          dataMf,
        };
      } catch (error) {}
    },
  },
});
