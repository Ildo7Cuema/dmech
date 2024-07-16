import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
import { useQuasar, Dialog } from "quasar";
import userAuthUser from "src/composible/userAuthUser";
import usenotification from "src/composible/useNotify";

const { supabase } = useSupabase();
const { notifyError, notifySuccess } = usenotification();
const tabela = "alunos";
const tabela_ano_lectivo = "anos_lectivo";
export const useAlunosStore = defineStore("alunos", {
  state: () => ({
    alunos: [],
  }),

  getters: {
    AlunosCountByEscolaId: (state) => (escolaId) => {
      //return escolaId ? state.Turmas.filter((Turma) => Turma.escola_id === escolaId).length : 0;
      return state.alunos.filter((aluno) => aluno.escola_id === escolaId)
        .length;
    },
  },

  actions: {
    //Pegar todos os dados no banco de dados
    async getAllAlunos(escola_id) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .select(
            `*, escola:escola_id(*), turmas:turma_id(*), classe:classe_id(*)`
          )
          .eq("escola_id", escola_id);
        if (error) throw error.message;
        console.log(data);
        return (this.alunos = data);
      } catch (error) {
        console.log(error);
      }
    },

    //Cadastrar informações no banco
    async addAluno(formData) {
      try {
        const { data, error } = await supabase.from(tabela).insert([
          {
            nome_aluno: formData.nome_aluno,
            descricao: formData.descricao,
            escola_id: formData.escola_id,
          },
        ]);
        if (error) throw error.message;

        notifySuccess("Príodo cadastrado com sucesso");
        return (this.alunos = data);
      } catch (error) {}
    },

    //Buscar informações no banco pelo id
    async getAlunoById(id) {
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
    async updateAlunoById(id, formData) {
      try {
        const { data, error } = await supabase
          .from(tabela)
          .update({
            nome_aluno: formData.nome_aluno,
            descricao: formData.descricao,
            escola_id: formData.escola_id,
          })
          .eq("id", id);

        if (error) throw error.message;
        notifySuccess("Príodo actualizado com sucesso");
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    // Apagar informações no banco pelo id, mas antes perguntar se pretende apagar ou não. Se sim, apaga; se não, cancela.
    async deleteAlunoById(id) {
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
          .select("*")
          .eq("email", email);
        if (error) throw error.message;
        const escolaId = data;
        return escolaId;
      } catch (error) {
        console.log(error);
      }
    },

    async getAnoLectivoIdByEscolaId(escola_id) {
      console.log(escola_id);
      try {
        const { data, error } = await supabase
          .from(tabela_ano_lectivo)
          .select("*")
          .eq("escola_id", escola_id);
        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    //verifica se o ano lectivo ja foi criado
    async addOrUpdateAnoLectivo(escola_id) {
      try {
        const currentYear = new Date().getFullYear();
        const anoLectivoCorrente = currentYear + "/" + (currentYear + 1);
        const { data: existingAnoLectivo, error } = await supabase
          .from(tabela_ano_lectivo)
          .select("*")
          .eq("escola_id", escola_id)
          .eq("ano_lectivo", anoLectivoCorrente);

        if (error) throw error.message;

        if (existingAnoLectivo.length > 0) {
          console.log("Ano lectivo já cadastrado");
          return;
        }

        const { data, error: insertError } = await supabase
          .from(tabela_ano_lectivo)
          .insert([
            {
              escola_id,
              ano_lectivo: anoLectivoCorrente,
            },
          ]);

        if (insertError) throw insertError.message;

        console.log("Ano lectivo cadastrado com sucesso");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
