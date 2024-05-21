import { defineStore } from "pinia";
import userAuthUser from "src/composible/userAuthUser";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();
const { user } = userAuthUser();

export const useCategoriaStore = defineStore("categorias", {
  state: () => ({
    categorias: [],
  }),

  getters: {
    categoriasCount(state) {
      return state.categorias.length;
    },
  },

  actions: {
    async getCategorias(tabela, organization_id) {
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", organization_id);
      if (error) throw error;
      return (this.$state.categorias = data);
    },
  },
});
