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
    async getCategorias(tabela) {
      const idUser = user.value.id;
      const { data, error } = await supabase
        .from(tabela)
        .select("*")
        .eq("user_id", idUser);
      if (error) throw error;
      return (this.$state.categorias = data);
    },
  },
});
