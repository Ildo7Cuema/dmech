import { defineStore } from "pinia";
import userAuthUser from "src/composible/userAuthUser";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();
const { user } = userAuthUser();

export const useEscolaStore = defineStore("escolas", {
  state: () => ({
    escolas: [],
  }),

  getters: {
    escolasCount(state) {
      return state.escolas.length;
    },
  },

  actions: {
    async getEscolas(tabela) {
      const idUser = user.value.id;
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", idUser);
      if (error) throw error;
      return (this.$state.escolas = data);
    },
  },
});
