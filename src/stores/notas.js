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
          .eq("trimestre", infoAluno.trimestre);

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
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
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
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
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
              },
            ])
            .eq("id", id);
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
            },
          ]);
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
              },
            ])
            .eq("id", id);
        } else {
          // Insert new record
          await supabase.from(npp2).insert([
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
            },
          ]);
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
              },
            ])
            .eq("id", id);
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
            },
          ]);
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
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
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
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
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
              },
            ])
            .eq("id", id);
          if (error)
            throw notifyError("Erro ao inserir a nota ", error.message);
          else notifySuccess("Nota actualizada com sucesso!");
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
            },
          ]);
          notifySuccess("Notas inseridas com sucesso");
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
        infoAluno.nome_disciplina == "L. Estrangeira"
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
              },
            ]);
            notifySuccess("Notas inseridas com sucesso");
          }
        } catch (error) {
          console.error(error);
        }

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
                },
              ])
              .eq("id", id);
            if (error)
              throw notifyError("Erro ao inserir a nota ", error.message);
            else notifySuccess("Nota actualizada com sucesso!");
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
              },
            ]);
            notifySuccess("Notas inseridas com sucesso");
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
      cursoId
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
          cursoId
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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
      cursoId
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
          cursoId
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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
      cursoId
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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

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
          .eq("curso_id", cursoId);

        if (mtError) {
          throw new Error(mtError.message);
        }

        const mt3Data = mtData.length > 0 ? mtData[0] : 0;

        return {
          mac3Data,
          npp3Data,
          npt3Data,
          mt3Data,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
});
