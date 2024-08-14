import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();

export const useMiniPautaStore = defineStore("counter", {
  state: () => ({
    miniPautas: [],
  }),

  getters: {
    miniPautaCount: (state) => state.miniPautas.length,
  },

  actions: {
    async getNotas(
      escolaId,
      cursoID,
      classeID,
      turmaID,
      periodoID,
      anoLectivo,
      disciplinaID
    ) {
      const { data: view_notas, error } = await supabase
        .from("view_notas_completa")
        .select("*")
        .eq("escolaid", escolaId)
        .eq("cursoid", cursoID)
        .eq("classeid", classeID)
        .eq("turmaid", turmaID)
        .eq("periodoid", periodoID)
        .eq("ano_lectivo", anoLectivo.ano_lectivo)
        .eq("disciplinaid", disciplinaID);
      if (error) throw error.message;
      return (this.miniPautas = view_notas);
    },
  },
});
