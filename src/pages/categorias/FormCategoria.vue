<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-form class="row justify-center" @submit.prevent="addCategoria">
          <p class="col-12 text-body3 text-center q-mt-lg">
            {{ isUpdate ? "Actualizar categoria" : "Registo de categorias" }}
          </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
            <q-input
              v-model="form.categoria"
              label="Categoria"
              class="col-12"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Porfavor digite o nome da categoria',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-btn
              type="submit"
              :icon="
                isUpdate ? 'mdi-file-edit-outline' : 'mdi-content-save-all'
              "
              color="primary"
              class="full-width"
              :label="isUpdate ? 'Actualizar categoria' : 'Cadastrar categoria'"
              v-bind="{ ...btnConfig }"
            />

            <q-btn
              v-if="$q.platform.is.mobile && isUpdate"
              @click="deletarItem(form)"
              icon="mdi-delete-empty"
              color="secondary"
              class="full-width"
              label="Apagar categoria"
            />
            <q-space />
            <q-btn
              v-if="$q.platform.is.mobile"
              icon="mdi-format-list-bulleted"
              class="full-width q-pa-sm"
              label="Lista de categorias"
              flat
              :to="{ name: 'categorias' }"
              v-bind="{ ...btnConfig }"
            />
          </div>
        </q-form>

        <q-page-sticky
          class="margin-bottom"
          position="bottom-right"
          :offset="[18, 18]"
          v-if="$q.platform.is.mobile"
          @click="form = ''"
        >
          <q-btn
            fab
            icon="mdi-plus"
            color="primary"
            :to="{ name: 'form-categoria' }"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed, inject } from "vue";
import { inputConfig, btnConfig } from "src/utils/inputVisual";
import usenotification from "src/composible/useNotify";
import userApi from "src/composible/userApi";
import { Loading, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "form-categoria",
  setup() {
    const { post, getById, update, remove } = userApi();
    const $q = useQuasar();
    const { notifyError, notifySuccess } = usenotification();
    const table = "categorias";
    const router = useRouter();
    const route = useRoute();
    const form = ref({
      categoria: "",
    });

    const isUpdate = computed(() => {
      return route.params.id;
    });

    onMounted(() => {
      if (isUpdate.value) {
        getCategoria(table, isUpdate.value);
      }
    });

    const deletarItem = async (item) => {
      try {
        $q.dialog({
          title: "Confirmação",
          message: `tens a certeza que pretendes eliminar a categoria ${item.categoria} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          Loading.show({ message: "Apagando categoria..." });
          await remove(table, item.id);
          router.push({ name: "categorias" });
          notifySuccess("categoria apagada com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const getCategoria = async (table, id) => {
      try {
        Loading.show({ message: "Carregando informações" });
        form.value = await getById(table, id);
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const addCategoria = async () => {
      try {
        if (isUpdate.value) {
          Loading.show({ message: "Actualização em processamento" });
          await update(table, form.value);
          notifySuccess("Categoria actualizada com sucesso");
        } else {
          Loading.show({ message: "Cadastro em processamento" });
          await post(table, form.value);
          notifySuccess("Categoria cadastrada com sucesso");
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
        router.push({ name: "categorias" });
      }
    };

    return {
      form,
      isUpdate,
      deletarItem,
      table,
      addCategoria,
      inputConfig,
      btnConfig,
    };
  },
};
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
