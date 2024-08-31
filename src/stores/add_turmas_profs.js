import { defineStore } from "pinia";
import useSupabase from "src/boot/supabase";
const { supabase } = useSupabase();
const disciplinas_profs_table = "disciplinas_docente";
const classes_profs_table = "classes_docente";
const cursos_profs_table = "cursos_docente";
const turmas_profs_table = "turmas_docente";
const periodos_profs_table = "periodos_docente";

export const useTurmasProf = defineStore("add_turmas_profs", {
  state: () => ({
    turmas_prof: [],
  }),

  getters: {
    countTurmasProf: (state) => state.turmas_prof.length,
  },

  actions: {
    async add_turmas_prof(form) {
      //add disciplinas
      console.log(form);
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(form.disciplina_id)) {
          const disciplinaProf = form.disciplina_id.map((disciplinaID) => ({
            dme_id: form.dme_id,
            escola_id: form.escola_id,
            docente_id: form.docente_id,
            disciplina_id: disciplinaID,
          }));

          console.log(disciplinaProf);
          const { data, error } = await supabase
            .from(disciplinas_profs_table)
            .insert(disciplinaProf);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from(disciplinas_profs_table)
            .insert({
              dme_id: form.dme_id,
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              disciplina_id: disciplinaID,
            });

          if (error) throw error.message;
        }
      } catch (error) {}
      //add cursos
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(form.cursos_id)) {
          const cursoProf = form.cursos_id.map((cursoID) => ({
            dme_id: form.dme_id,
            escola_id: form.escola_id,
            docente_id: form.docente_id,
            cursos_id: cursoID,
          }));

          console.log(cursoProf);
          const { data, error } = await supabase
            .from(cursos_profs_table)
            .insert(cursoProf);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from(cursos_profs_table)
            .insert({
              dme_id: form.dme_id,
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              cursos_id: cursoID,
            });

          if (error) throw error.message;
        }
      } catch (error) {}
      // add turmas
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(form.turmas_id)) {
          const turmaProf = form.turmas_id.map((turmaID) => ({
            dme_id: form.dme_id,
            escola_id: form.escola_id,
            docente_id: form.docente_id,
            turmas_id: turmaID,
          }));

          console.log(turmaProf);
          const { data, error } = await supabase
            .from(turmas_profs_table)
            .insert(turmaProf);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from(turmas_profs_table)
            .insert({
              dme_id: form.dme_id,
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              turmas_id: turmaID,
            });

          if (error) throw error.message;
        }
      } catch (error) {}

      //classes
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(form.classes_id)) {
          const classeProf = form.classes_id.map((classeID) => ({
            dme_id: form.dme_id,
            escola_id: form.escola_id,
            docente_id: form.docente_id,
            classes_id: classeID,
          }));

          console.log(classeProf);
          const { data, error } = await supabase
            .from(classes_profs_table)
            .insert(classeProf);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from(classes_profs_table)
            .insert({
              dme_id: form.dme_id,
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              classes_id: classeID,
            });

          if (error) throw error.message;
        }
      } catch (error) {}

      //periodos
      try {
        // Verifica se curso_id é um array e cria um array de objetos a serem inseridos
        if (Array.isArray(form.periodos_id)) {
          const periodoProf = form.periodos_id.map((periodoID) => ({
            dme_id: form.dme_id,
            escola_id: form.escola_id,
            docente_id: form.docente_id,
            periodos_id: periodoID,
          }));

          console.log(periodoProf);
          const { data, error } = await supabase
            .from(periodos_profs_table)
            .insert(periodoProf);

          if (error) throw error.message;
        } else {
          const { data, error } = await supabase
            .from(periodos_profs_table)
            .insert({
              dme_id: form.dme_id,
              escola_id: form.escola_id,
              docente_id: form.docente_id,
              periodos_id: periodoID,
            });

          if (error) throw error.message;
        }
      } catch (error) {}
    },

    async getDocente_disciplinas(dme_id, escola_id, docente_id) {
      try {
        const { data, error } = await supabase
          .from(disciplinas_profs_table)
          .select(`*, disciplinas:disciplina_id(id, nome_disciplina)`)
          .eq("dme_id", dme_id)
          .eq("escola_id", escola_id)
          .eq("docente_id", docente_id);

        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDocente_cursos(dme_id, escola_id, docente_id) {
      try {
        const { data, error } = await supabase
          .from(cursos_profs_table)
          .select(`*, cursos:cursos_id(id, nome_curso)`)
          .eq("dme_id", dme_id)
          .eq("escola_id", escola_id)
          .eq("docente_id", docente_id);

        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDocente_turmas(dme_id, escola_id, docente_id) {
      try {
        const { data, error } = await supabase
          .from(turmas_profs_table)
          .select(`*, turmas:turmas_id(id, nome_turma)`)
          .eq("dme_id", dme_id)
          .eq("escola_id", escola_id)
          .eq("docente_id", docente_id);

        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDocente_periodos(dme_id, escola_id, docente_id) {
      try {
        const { data, error } = await supabase
          .from(periodos_profs_table)
          .select(`*, periodos:periodos_id(id, nome_periodo)`)
          .eq("dme_id", dme_id)
          .eq("escola_id", escola_id)
          .eq("docente_id", docente_id);

        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDocente_classes(dme_id, escola_id, docente_id) {
      try {
        const { data, error } = await supabase
          .from(classes_profs_table)
          .select(`*, classes:classes_id(id, nome_classe)`)
          .eq("dme_id", dme_id)
          .eq("escola_id", escola_id)
          .eq("docente_id", docente_id);

        if (error) throw error.message;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
