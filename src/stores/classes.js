import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import { useQuasar, Dialog } from "quasar";
import userAuthUser from "src/composible/userAuthUser";
import usenotification from "src/composible/useNotify";

const { supabase } = useSupabase();
const { notifyError, notifySuccess } = usenotification();
const tabela = "classes";
export const useClasseStore = defineStore("classes", {
  state: () => ({
    classes: [],
  }),

  getters: {
    classesCountByEscolaId: (state) => (escolaId) => {
      //return escolaId ? state.Turmas.filter((Turma) => Turma.escola_id === escolaId).length : 0;
      return state.classes.filter((classe) => classe.escola_id === escolaId)
        .length;
    },
  },

  actions: {
    //Pegar todos os dados no banco de dados
    async getAllClasses(escola_id) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select(`*, escola:escola_id(*)`)
          .eq("escola_id", escola_id);
        if (error) throw error.message;
        return (this.classes = data);
      } catch (error) {
        console.log(error);
      }
    },

    //Cadastrar informações no banco
    async addClasse(formData) {
      console.log(formData.id);

      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        const dataToInsert = Array.isArray(formData.id)
          ? formData.id.map((classId) => ({
              nome_classe: formData.nome_classe,
              escola_id: formData.escola_id,
            }))
          : [
              {
                nome_classe: formData.nome_classe,
                escola_id: formData.escola_id,
              },
            ];

        const { data, error } = await supabase
          .from(tabela)
          .insert(dataToInsert);

        if (error) throw error.message;

        notifySuccess("Classe(s) cadastrada(s) com sucesso");
        return (this.classes = data);
      } catch (error) {
        console.error("Erro ao cadastrar classe(s):", error);
      }
    },

    //Buscar informações no banco pelo id
    async getClasseById(id) {
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
    async updateClasseById(id, formData) {
      try {
        const dataToInsert = Array.isArray(formData.id)
          ? formData.id.map((classId) => ({
              nome_classe: formData.nome_classe,
              escola_id: formData.escola_id,
            }))
          : [
              {
                nome_classe: formData.nome_classe,
                escola_id: formData.escola_id,
              },
            ];

        const { data, error } = await supabase
          .from(tabela)
          .update(dataToInsert)
          .eq("id", id);

        if (error) throw error.message;
        notifySuccess("Classe actualizado com sucesso");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    // Apagar informações no banco pelo id, mas antes perguntar se pretende apagar ou não. Se sim, apaga; se não, cancela.
    async deleteClasseById(id) {
      try {
        Dialog.create({
          title: "Confirme",
          message: "Você tens a certeza que pretendes apagar este período?",
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
            notifySuccess("Período apagado com sucesso");
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
