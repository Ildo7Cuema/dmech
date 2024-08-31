import { defineStore } from "pinia";
import userAuthUser from "src/composible/userAuthUser";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();
const { user } = userAuthUser();
export const useFuncionarioStore = defineStore("funcionarios", {
  state: () => ({
    funcionarios: [],
  }),

  getters: {
    funcionarioCount(state) {
      return state.funcionarios.length;
    },
  },

  actions: {
    //funcionarios ao nivel da dme
    async getFuncionarios(tabela, organization_id) {
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", organization_id);
      if (error) throw error;
      return (this.$state.funcionarios = data);
    },
    //funcionarios ao nivel da escola
    async getFuncionariosEscola(tabela, organization_id, escola_id) {
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", organization_id)
        .eq("escola_id", escola_id);
      if (error) throw error;
      return (this.$state.funcionarios = data);
    },

    // Buscar funcionarios pelo id
    async getFuncionarioNameById(tabela, idFuncionarios) {
      const { data, error } = await supabase
        .from(tabela)
        .select("name, genero")
        .eq("id", idFuncionarios);
      if (error) throw error.message;
      return data;
    },
  },
});
