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
    async getEscolas(tabela, organization_id) {
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", organization_id);
      if (error) throw error;
      return (this.$state.escolas = data);
    },

    async getEscolaByEmail(tabela, email) {
      const { data, error } = await supabase
        .from(tabela)
        .select("id")
        .eq("email", email);
      if (error) throw error;
      return data[0].id;
    },

    async getEscolaById(idEscola) {
      const { data, error } = await supabase
        .from("escolas")
        .select("nivel_ensino, name, provincia, municipio")
        .eq("id", idEscola);
      if (error) throw error;
      return data;
    },
  },
});
