import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import { useQuasar, Dialog } from "quasar";
import userAuthUser from "src/composible/userAuthUser";
import usenotification from "src/composible/useNotify";

const { supabase } = useSupabase();
const { notifyError, notifySuccess } = usenotification();
const tabela = "turmas";
export const useTurmaStore = defineStore("turmas", {
  state: () => ({
    turmas: [],
  }),

  getters: {
    turmasCountByEscolaId: (state) => (escolaId) => {
      //return escolaId ? state.Turmas.filter((Turma) => Turma.escola_id === escolaId).length : 0;
      return state.turmas.filter((turma) => turma.escola_id === escolaId)
        .length;
    },
  },

  actions: {
    //Pegar todos os dados no banco de dados
    async getAllTurmas(escola_id) {
      console.log(escola_id);
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select(`*, curso:curso_id(*), escola:escola_id(*)`)
          .eq("escola_id", escola_id);
        if (error) throw error.message;
        console.log(data);
        return (this.turmas = data);
      } catch (error) {
        console.log(error);
      }
    },

    //Cadastrar informações no banco
    async addTurma(formData) {
      try {
        const { data, error } = await supabase.from(tabela).insert([
          {
            nome_turma: formData.nome_turma,
            num_sala: formData.num_sala,
            ano: formData.ano,
            curso_id: formData.curso_id,
            escola_id: formData.escola_id,
          },
        ]);
        if (error) throw error.message;

        notifySuccess("Turma cadastrada com sucesso");
        return (this.turmas = data);
      } catch (error) {}
    },

    //Buscar informações no banco pelo id
    async getTurmaById(id) {
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
    async updateTurmaById(id, formData) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .update({
            nome_turma: formData.nome_turma,
            num_sala: formData.num_sala,
            ano: formData.ano,
            curso_id: formData.curso_id,
            escola_id: formData.escola_id,
          })
          .eq("id", id);

        if (error) throw error.message;
        notifySuccess("Turma actualizada com sucesso");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    // Apagar informações no banco pelo id, mas antes perguntar se pretende apagar ou não. Se sim, apaga; se não, cancela.
    async deleteTurmaById(id) {
      try {
        Dialog.create({
          title: "Confirme",
          message: "Você tens a certeza que pretendes apagar esta Turma?",
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
            notifySuccess("Turma apagada com sucesso");
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
