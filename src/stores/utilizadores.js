import { defineStore } from "pinia";
import userAuthUser from "src/composible/userAuthUser";
import useSupabase from "src/boot/supabase";

const { listUsers } = userAuthUser();
const { supabaseAdmin } = useSupabase();
export const useUtilizadores = defineStore("utilizadores", {
  state: () => ({
    utilizadores: [],
  }),

  getters: {
    countUtilizadores: (state) => state.utilizadores.length,
  },

  actions: {
    async utilizadoresList() {
      const {
        data: { users },
        error,
      } = await supabaseAdmin.auth.admin.listUsers();

      if (error) throw error;
      const unauthenticatedUsers = users.filter(
        (itenUser) => itenUser.email !== "ildocuema@gmail.com"
      );
      return (this.$state.utilizadores = unauthenticatedUsers);
    },
  },
});
