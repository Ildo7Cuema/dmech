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

    async addClasse(formData) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .insert([
            {
              nome_classe: formData.nome_classe,
              escola_id: formData.escola_id,
            },
          ])
          .select();
        if (error) throw error.message;
        const classeId = data[0].id;
        console.log(classeId);
        this.addClasseDisciplina(classeId, formData);
        return (this.classes = data);
      } catch (error) {}
    },

    //Cadastrar informações no banco classes_disciplina
    async addClasseDisciplina(classeID, formData) {
      console.log(classeID);
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(formData.disciplina_id)) {
          const classesDisciplinas = formData.disciplina_id.map(
            (disciplinaID) => ({
              disciplina_id: disciplinaID,
              classe_id: classeID,
              escola_id: formData.escola_id,
              curso_id: formData.curso_id,
            })
          );
          const { data, error } = await supabase
            .from("classes_disciplina")
            .insert(classesDisciplinas);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from("classes_disciplina")
            .insert({
              disciplina_id: disciplinaID,
              classe_id: classeID,
              escola_id: formData.escola_id,
              curso_id: formData.curso_id,
            });

          if (error) throw error.message;
        }
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
        if (Array.isArray(formData.disciplina_id)) {
          const classesDisciplinas = formData.disciplina_id.map(
            (disciplinaID) => ({
              disciplina_id: disciplinaID,
              classe_id: classeID,
              escola_id: formData.escola_id,
              curso_id: formData.curso_id,
            })
          );
          const { data, error } = await supabase
            .from("classes_disciplina")
            .update(classesDisciplinas)
            .eq("classe_id", id);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from("classes_disciplina")
            .update({
              disciplina_id: disciplinaID,
              classe_id: classeID,
              escola_id: formData.escola_id,
              curso_id: formData.curso_id,
            })
            .eq("classe_id", id);

          if (error) throw error.message;
        }
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

    async getClassesDisciplinas(classeId) {
      try {
        const { data, error } = await supabase
          .from("classes_disciplina")
          .select(`disciplina_id, disciplinas:disciplina_id(*)`)
          .eq("classe_id", classeId);
        if (error) throw error.message;
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
