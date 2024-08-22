import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import { useQuasar, Dialog } from "quasar";
import userAuthUser from "src/composible/userAuthUser";
import usenotification from "src/composible/useNotify";

const { supabase } = useSupabase();
const { notifyError, notifySuccess } = usenotification();
const tabela = "disciplinas";
export const useDisciplinaStore = defineStore("disciplinas", {
  state: () => ({
    disciplinas: [],
  }),

  getters: {
    disciplinasCountByEscolaId: (state) => (escolaId) => {
      //return escolaId ? state.Turmas.filter((Turma) => Turma.escola_id === escolaId).length : 0;
      return state.disciplinas.filter(
        (disciplina) => disciplina.escola_id === escolaId
      ).length;
    },
  },

  actions: {
    //Pegar todos os dados no banco de dados
    async getAllDisciplinas(escola_id) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select(`*, escola:escola_id(*)`)
          .eq("escola_id", escola_id);
        if (error) throw error.message;

        return (this.disciplinas = data);
      } catch (error) {
        console.log(error);
      }
    },

    async addDisciplina(formData) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .insert([
            {
              nome_disciplina: formData.nome_disciplina,
              descricao: formData.descricao,
              escola_id: formData.escola_id,
            },
          ])
          .select();
        const disciplinaId = data[0].id;
        if (error) throw error.message;
        this.addDisciplinaCurso(disciplinaId, formData);
        return (this.disciplinas = data);
      } catch (error) {}
    },

    async addDisciplinaCurso(disciplinaID, formData) {
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(formData.curso_id)) {
          const disciplinaCursos = formData.curso_id.map((cursoId) => ({
            disciplina_id: disciplinaID,
            curso_id: cursoId,
            escola_id: formData.escola_id,
          }));
          const { data, error } = await supabase
            .from("cursos_disciplina")
            .insert(disciplinaCursos);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from("cursos_disciplina")
            .insert({
              disciplina_id: disciplinaID,
              curso_id: formData.curso_id,
              escola_id: formData.escola_id,
            });

          if (error) throw error.message;
        }
      } catch (error) {}
    },

    //Buscar informações no banco pelo id
    async getDisciplinaById(id) {
      console.log(id);
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    // Atualizar informações no banco pelo id
    async updateDisciplinaById(id, formData) {
      try {
        const dataToInsert = Array.isArray(formData.curso_id)
          ? formData.curso_id.map((cursoId) => ({
              nome_disciplina: formData.nome_disciplina,
              curso_id: cursoId,
              descricao: formData.descricao,
              escola_id: formData.escola_id,
            }))
          : [
              {
                nome_disciplina: formData.nome_disciplina,
                curso_id: formData.curso_id,
                descricao: formData.descricao,
                escola_id: formData.escola_id,
              },
            ];

        const { data, error } = await supabase
          .from(tabela)
          .update(dataToInsert)
          .eq("id", id);

        if (error) throw error.message;
        notifySuccess("Disciplina actualizado com sucesso");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    // Apagar informações no banco pelo id, mas antes perguntar se pretende apagar ou não. Se sim, apaga; se não, cancela.
    async deleteDisciplinaById(id) {
      try {
        Dialog.create({
          title: "Confirme",
          message: "Você tens a certeza que pretendes apagar esta disciplina?",
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            // User clicked "Yes", delete the student from the database
            const { data, error } = await supabase
              .from(tabela)
              .delete()
              .match({ id });

            if (error) throw error;
            notifySuccess("Disciplina apagada com sucesso");
            return data;
          })
          .onCancel(() => {
            // User clicked "No", do nothing
            console.log("Deletion canceled");
          });
      } catch (error) {
        console.log(error);
      }
    },

    async disciplinaCursos(id) {
      try {
        const { data, error } = await supabase
          .from("cursos_disciplina")
          .select(`curso_id, cursos:curso_id(*)`)
          .eq("disciplina_id", id);
        if (error) throw error.message;
        console.log(data);
        return data;
      } catch (error) {}
    },

    async getEscolaIdByEmail(email) {
      try {
        const { data, error } = await supabase
          .from("escolas")
          .select("id")
          .eq("email", email);
        if (error) throw error.message;
        const escolaId = data[0].id;
        return escolaId;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
