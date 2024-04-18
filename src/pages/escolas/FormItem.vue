<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-form class="row justify-center" @submit.prevent="addItems">
          <p class="col-12 text-body3 text-center q-mt-lg">
            {{
              isUpdate ? "Actualizar dados da escola" : "Cadastro de Escolas"
            }}
          </p>
          <div class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-sm">
            <q-input
              v-model="form.nome"
              label="Nome da escola"
              class="col-12"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor digite o nome da escola',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.numero"
              label="Nº da escola"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor digite o nº da escola',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.num_decreto"
              label="Nº do decreto"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Porfavor digite o nº do decreto de criação',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.provincia"
              label="Provincia"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Porfavor informe o nome da província',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.municipio"
              label="Município"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Porfavor informe o nome do município',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.natureza_escola"
              label="Natureza da escola"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Porfavor informe a natureza da escola',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.tipo_escola"
              label="Tipo de escola"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Porfavor informe o tipo de escola',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.salas_professores"
              label="Total de salas de professores"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Nº total de salas de professores',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.salas_alunos"
              label="Total de salas de alunos"
              class="col-6"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Nº total de salas de alunos',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-btn
              type="submit"
              :icon="
                isUpdate ? 'mdi-file-edit-outline' : 'mdi-content-save-all'
              "
              color="info"
              class="full-width"
              :label="isUpdate ? 'Actualizar escola' : 'Cadastrar escola'"
              v-bind="{ ...btnConfig }"
            />
            <!-- Btn delete for mobile -->
            <q-btn
              v-if="$q.platform.is.mobile && isUpdate"
              @click="deletarItem(form)"
              icon="mdi-delete-empty"
              color="secondary"
              class="full-width"
              label="Apagar escola"
            />

            <q-btn
              v-if="$q.platform.is.mobile"
              icon="mdi-format-list-bulleted"
              class="full-width q-pa-sm"
              label="Lista de escolas"
              :to="{ name: 'escolas' }"
              v-bind="{ ...btnConfig }"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import usenotification from "src/composible/useNotify";
import userApi from "src/composible/userApi";
import { Loading, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { btnConfig, inputConfig } from "src/utils/inputVisual";

export default {
  name: "form-categoria",
  setup() {
    const { post, getById, update, remove, uploadImage } = userApi();
    const { notifyError, notifySuccess } = usenotification();
    const table = "escolas";
    const router = useRouter();
    const $q = useQuasar();
    const route = useRoute();
    const form = ref({
      nome: "",
      numero: "",
      num_decreto: "",
      provincia: "",
      municipio: "",
      natureza_escola: "",
      tipo_escola: "",
      salas_professores: "",
      salas_alunos: "",
    });

    const isUpdate = computed(() => {
      return route.params.id;
    });

    onMounted(() => {
      if (isUpdate.value) {
        getItem(table, isUpdate.value);
      }
    });

    const deletarItem = async (item) => {
      try {
        $q.dialog({
          title: "Confirmação",
          message: `tens a certeza que pretendes eliminar a ${item.nome} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          Loading.show({ message: "Apagando informação da escola..." });
          await remove(table, item.id);
          router.push({ name: "escolas" });
          notifySuccess("Escola apagada com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const getItem = async (table, id) => {
      try {
        Loading.show({ message: "Carregando informações" });
        form.value = await getById(table, id);
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const addItems = async () => {
      try {
        if (isUpdate.value) {
          Loading.show({ message: "Actualização em processamento" });
          await update(table, form.value);
          notifySuccess("Escola actualizada com sucesso");
        } else {
          Loading.show({ message: "Cadastro em processamento" });
          await post(table, form.value);
          notifySuccess("Escola cadastrada com sucesso");
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
        router.push({ name: "escolas" });
      }
    };

    return {
      form,
      isUpdate,
      table,
      deletarItem,
      addItems,
      btnConfig,
      inputConfig,
    };
  },
};
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
