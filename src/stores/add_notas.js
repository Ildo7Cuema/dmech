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
