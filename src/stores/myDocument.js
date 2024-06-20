import { defineStore } from "pinia";
import userAuthUser from "src/composible/userAuthUser";
import useSupabase from "src/boot/supabase";

const { supabase, supabaseAdmin } = useSupabase();
const { user } = userAuthUser();
export const useDocumentStore = defineStore("myDocument", {
  state: () => ({
    myDocument: [],
  }),

  getters: {
    myDocumentCount: (state) => state.myDocument.length,
  },

  actions: {
    async getMyDocument(fileName) {
      const { data, error } = await supabase
        .from("docFuncionario")
        .select("*")
        .eq("id_funcionario", 5);
      if (error) throw error;
      return (this.$state.myDocument = data);
    },

    async downloadFile(fileName) {
      const { data, error } = await supabase.storage
        .from("docFuncionarios")
        .download(fileName);
      if (error) {
        console.log(error);
      } else {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName + ".pdf";
        a.click();
      }
    },

    async deleteFile(id, fileName) {
      const { data, error } = await supabase
        .from("docFuncionario")
        .delete()
        .match({ id });
      if (error) throw error;
      this.deleteFileBucket(fileName);
      return data;
    },

    async deleteFileBucket(fileName) {
      const { data, error } = await supabase.storage
        .from("docFuncionarios")
        .remove([fileName]);
      if (error) throw error;
      return data;
    },
  },
});
