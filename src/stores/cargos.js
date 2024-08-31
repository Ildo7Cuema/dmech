import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();
const db = "cargos";
export const useCargoStore = defineStore("cargos", {
  state: () => ({
    cargos: [],
  }),

  getters: {
    countCargos(state) {
      return state.cargos.length;
    },
  },
  actions: {
    async getDirectorDeTurma(idTurma) {
      const { data, error } = await supabase
        .from(db)
        .select(`cargo, funcionarios: funcionario_id(*)`)
        .eq("cargo_director_turma_id", idTurma);
      if (error) throw error.message;
      console.log(data);
      return data;
    },
    async getCoordenadorCurso(idCurso) {
      const { data, error } = await supabase
        .from(db)
        .select(`cargo, funcionarios: funcionario_id(*)`)
        .eq("cargo_coordenador_curso_id", idCurso);
      if (error) throw error.message;

      return data;
    },
  },
});
