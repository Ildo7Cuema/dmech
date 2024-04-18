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
    async getFuncionarios(tabela) {
      const idUser = user.value.id;
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", idUser);
      if (error) throw error;
      return (this.$state.funcionarios = data);
    },
  },
});
