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
              v-model="form.name"
              label="Nome da escola"
              class="col-12"
              :rules="[(val) => !!val || 'Porfavor digite o nome da escola']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.numero"
              label="Nº da escola"
              class="col-6"
              :rules="[(val) => !!val || 'Porfavor digite o nº da escola']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.num_decreto"
              label="Nº do decreto"
              class="col-6"
              :rules="[
                (val) => !!val || 'Porfavor digite o nº do decreto de criação',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <!-- Select nivel de ensino: Ensino primário, Ensino médio, ensino superios -->
            <q-select
              v-model="form.nivel_ensino"
              :options="options"
              label="Nivel de ensino"
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[(val) => !!val || 'Selecione o nivel de ensino']"
            ></q-select>

            <q-input
              v-model="form.provincia"
              label="Provincia"
              class="col-6"
              :rules="[
                (val) => !!val || 'Porfavor informe o nome da província',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.municipio"
              label="Município"
              class="col-6"
              :rules="[
                (val) => !!val || 'Porfavor informe o nome do município',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.natureza_escola"
              label="Natureza da escola"
              class="col-6"
              :rules="[
                (val) => !!val || 'Porfavor informe a natureza da escola',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.tipo_escola"
              label="Tipo de escola"
              class="col-6"
              :rules="[(val) => !!val || 'Porfavor informe o tipo de escola']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.salas_professores"
              label="Total de salas de professores"
              class="col-6"
              :rules="[(val) => !!val || 'Nº total de salas de professores']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.salas_alunos"
              label="Total de salas de alunos"
              class="col-6"
              :rules="[(val) => !!val || 'Nº total de salas de alunos']"
              v-bind="{ ...inputConfig }"
            />
            <div v-if="isUpdate == null">
              <q-separator />
              <div class="col-12 text-center">
                <b>Atribuir uma conta para a escola</b>
              </div>

              <q-input
                v-model="form.email"
                type="email"
                label="Informe o e-mail da escola"
                class="col-6"
                :rules="[(val) => !!val || 'Porfavor informe um e-mail']"
                v-bind="{ ...inputConfig }"
              />
              <q-input
                v-model="form.password"
                type="password"
                label="Informe uma palavra passe"
                class="col-6"
                :rules="[(val) => !!val || 'Porfavor uma palavra passe']"
                v-bind="{ ...inputConfig }"
              />
              <q-input
                v-model="form.phone"
                label="Informe o contacto do responsável"
                class="col-6"
                :rules="[
                  (val) => !!val || 'Porfavor uma contacto do responsável',
                  (val) =>
                    val.length == 9 ||
                    'O nº de telemóvel deve conter 9 caracter',
                ]"
                v-bind="{ ...inputConfig }"
              />
            </div>
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
    const { postEscola, getById, update, remove, uploadImage } = userApi();
    const { notifyError, notifySuccess } = usenotification();
    const table = "escolas";
    const router = useRouter();
    const $q = useQuasar();
    const route = useRoute();
    const options = ref(["Ensino primário", "Ensino médio", "Ensino superior"]);
    const form = ref({
      name: "",
      numero: "",
      num_decreto: "",
      nivel_ensino: "",
      provincia: "",
      municipio: "",
      natureza_escola: "",
      tipo_escola: "",
      salas_professores: "",
      salas_alunos: "",
      email: "",
      password: "",
      phone: "",
      role: "Admin-Escola",
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
          message: `tens a certeza que pretendes eliminar a ${item.name} ?`,
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
          await postEscola(table, form.value);
          notifySuccess("Escola cadastrada com sucesso");
        }
      } catch (error) {
        console.log(error);
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
      options,
    };
  },
};
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
