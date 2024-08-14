import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();

export const useAnoLectivoStore = defineStore("ano_lectivo", {
  state: () => ({
    ano_lectivo: [],
  }),

  getters: {
    anoLectivoCount: (ano) => ano.ano_lectivo.length,
  },

  actions: {
    async getAllAnoLectivo(idEscola) {
      const { data, error } = await supabase
        .from("anos_lectivo")
        .select("ano_lectivo")
        .eq("escola_id", idEscola);

      if (error) throw error;
      console.log(data);
      return data;
    },
  },
});
