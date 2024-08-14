import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import { useQuasar, Dialog } from "quasar";
import userAuthUser from "src/composible/userAuthUser";
import usenotification from "src/composible/useNotify";

const { supabase } = useSupabase();
const { notifyError, notifySuccess } = usenotification();
const tabela = "cursos";
export const useCursoStore = defineStore("cursos", {
  state: () => ({
    cursos: [],
  }),

  getters: {
    cursoCountByEscolaId: (state) => (escolaId) => {
      console.log(escolaId);
      //return escolaId ? state.cursos.filter((curso) => curso.escola_id === escolaId).length : 0;
      return state.cursos.filter((curso) => curso.escola_id === escolaId)
        .length;
    },
  },

  actions: {
    //Pegar todos os dados no banco de dados
    async getAllCursos(escola_id) {
      console.log(escola_id);
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select("*")
          .eq("escola_id", escola_id);
        if (error) throw error.message;
        return (this.cursos = data);
      } catch (error) {
        console.log(error);
      }
    },

    //Cadastrar informações no banco
    async addCurso(formData) {
      console.log(formData);
      try {
        const { data, error } = await supabase.from(tabela).insert([
          {
            nome_curso: formData.nome_curso,
            descricao: formData.descricao,
            duracao: formData.duracao,
            escola_id: formData.escola_id,
          },
        ]);
        if (error) throw error.message;

        notifySuccess("Curso cadastrado com sucesso");
        return (this.cursos = data);
      } catch (error) {}
    },

    //Buscar informações no banco pelo id
    async getCursoById(id) {
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
    async updateCursoById(id, formData) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .update({
            nome_curso: formData.nome_curso,
            descricao: formData.descricao,
            duracao: formData.duracao,
            escola_id: formData.escola_id,
          })
          .eq("id", id);

        if (error) throw error.message;
        notifySuccess("Curso actualizado com sucesso");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    // Apagar informações no banco pelo id, mas antes perguntar se pretende apagar ou não. Se sim, apaga; se não, cancela.
    async deleteCursoById(id) {
      try {
        Dialog.create({
          title: "Confirme",
          message: "Você tens a certeza que pretendes apagar este curso?",
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
            notifySuccess("Curso apagado com sucesso");
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
