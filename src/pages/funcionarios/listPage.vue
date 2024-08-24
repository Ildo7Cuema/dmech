<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <loading-component :show="loading" />

        <div
          class="row"
          v-if="
            $q.platform.is.desktop &&
            loading == false &&
            funcionarioCategoriasAndEscolas != ''
          "
        >
          <q-table
            :rows="funcionarioCategoriasAndEscolas"
            flat
            bordered
            :columns="columns"
            row-key="id"
            class="col-12"
            virtual-scroll
          >
            <template v-slot:top>
              <q-input
                dense
                type="text"
                label="Pesquisar"
                v-model="filter"
                v-bind="{ ...inputConfig }"
                ><template v-slot:prepend>
                  <q-icon name="mdi-magnify" /> </template
              ></q-input>
              <q-space />
              <q-btn
                v-if="$q.platform.is.desktop && perfil !== 'Admin-Escola'"
                icon="mdi-plus"
                label="Cadastrar novo funcionario"
                :to="{ name: 'form-funcionario' }"
                v-bind="{ ...btnConfig }"
              />
              <q-btn
                v-if="$q.platform.is.desktop && perfil === 'Admin-Escola'"
                icon="mdi-plus"
                label="Cadastrar novo funcionario"
                :to="{ name: 'page-form-funcionario' }"
                v-bind="{ ...btnConfig }"
              />
              <download-excel
                :data="funcionarioCategoriasAndEscolas"
                :fields="fields"
                worksheet="funcionarios"
                name="Funcionarios.xls"
                class="q-ml-md"
              >
                <q-btn
                  icon="mdi-file-excel"
                  label="Exportar uma lista"
                  v-bind="{ ...btnConfig }"
                />
              </download-excel>
            </template>
            <template v-slot:body-cell-img_url="props">
              <q-td :props="props" class="text-center">
                <q-avatar v-if="props.row.img_url">
                  <img :src="props.row.img_url" />
                </q-avatar>
                <q-avatar
                  v-else
                  color="secondary"
                  text-color="white"
                  icon="mdi-image-off"
                  class="flex-center"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-add_turma="props">
              <q-td :props="props" class="q-gutter-x-sm item-center">
                <q-btn
                  icon="mdi-google-classroom"
                  color="positive"
                  dense
                  flat
                  size="sm"
                  @click="addTurmas(props.row)"
                  ><q-tooltip>Atribuir turmas ao docente</q-tooltip></q-btn
                >
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm text-center">
                <q-btn
                  icon="mdi-eye-outline"
                  color="grey"
                  dense
                  size="sm"
                  flat
                  @click="detalhes(props.row)"
                >
                  <q-tooltip>Ver detalhes</q-tooltip>
                </q-btn>
                <q-btn
                  icon="mdi-pencil-outline"
                  color="info"
                  dense
                  size="sm"
                  flat
                  @click="alterarItem(props.row)"
                >
                  <q-tooltip>Alterar</q-tooltip>
                </q-btn>
                <q-btn
                  icon="mdi-delete-outline"
                  color="negative"
                  dense
                  size="sm"
                  flat
                  @click="deletarItem(props.row)"
                  ><q-tooltip>Apagar</q-tooltip></q-btn
                >
                <q-btn
                  icon="mdi-plus"
                  color="positive"
                  dense
                  flat
                  size="sm"
                  @click="addDoc(props.row)"
                  ><q-tooltip>Adicionar documentos</q-tooltip></q-btn
                >
              </q-td>
            </template>
          </q-table>
        </div>

        <!-- List for mobile -->
        <q-list
          bordered
          v-if="
            $q.platform.is.mobile &&
            loading == false &&
            funcionarioCategoriasAndEscolas != ''
          "
        >
          <div
            class="row text-body3 text-h5 flex-center q-pa-lg bg-secondary text-white"
          >
            <q-btn flat icon="mdi-account-tie" label="Funcionários" />
          </div>
          <q-separator />
          <q-item
            v-for="funcionario in funcionarioCategoriasAndEscolas"
            :key="funcionario.id"
            class="q-mb-sm q-mt-sm"
          >
            <q-item-section avatar>
              <q-avatar v-if="funcionario.img_url">
                <img :src="funcionario.img_url" />
              </q-avatar>
              <q-avatar
                v-else
                color="grey"
                text-color="white"
                icon="mdi-image-off"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ funcionario.name }}</q-item-label>
              <q-item-label caption lines="1"
                >Nº de agente:
                <strong class="secondary">{{ funcionario.num_agente }}</strong>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <div>
                <q-btn-dropdown
                  flat
                  dropdown-icon="mdi-dots-vertical"
                  no-icon-animation
                >
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      @click="alterarItem(funcionario)"
                    >
                      <q-item-section>
                        <q-item-label>
                          <q-btn
                            dense
                            flat
                            size="sm"
                            no-caps
                            icon="mdi-file-edit"
                            color="green-10"
                            label="Alterar"
                          />
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      @click="detalhes(funcionario)"
                    >
                      <q-item-section>
                        <q-item-label>
                          <q-btn
                            dense
                            flat
                            size="sm"
                            label="Mais detalhes"
                            icon="mdi-eye-outline"
                            color="blue-grey-8"
                          />
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      @click="deletarItem(funcionario)"
                    >
                      <q-item-section>
                        <q-item-label>
                          <q-btn
                            dense
                            flat
                            size="sm"
                            label="Apagar"
                            icon="mdi-delete-circle-outline"
                            color="red-8"
                          />
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      @click="addDoc(funcionario)"
                    >
                      <q-item-section>
                        <q-item-label>
                          <q-btn
                            icon="cloud_upload"
                            color="positive"
                            label="Arquivar documentos"
                            dense
                            flat
                            size="sm"
                            no-caps
                          ></q-btn>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <!--


                -->
              </div>
            </q-item-section>
            <q-separator />
          </q-item>
        </q-list>

        <q-page-sticky
          class="margin-bottom"
          position="bottom-right"
          :offset="[18, 18]"
          v-if="$q.platform.is.mobile && perfil !== 'Admin-Escola'"
        >
          <q-btn
            fab
            icon="mdi-plus"
            color="primary"
            :to="{ name: 'form-funcionario' }"
          />
        </q-page-sticky>

        <q-page-sticky
          class="margin-bottom"
          position="bottom-right"
          :offset="[18, 18]"
          v-if="$q.platform.is.mobile && perfil === 'Admin-Escola'"
        >
          <q-btn
            fab
            icon="mdi-plus"
            color="primary"
            :to="{ name: 'page-form-funcionario' }"
          />
        </q-page-sticky>

        <!-- Mais detalhes -->
        <detalhes-component
          :show="handleShowDetail"
          :itens="itens"
          @closeModal="closeModal"
        />
        <!-- fim dialog -->

        <add-doc
          :show="handleShowAddDoc"
          :itens="itens"
          @closeModal="closeModal"
        />

        <!--Atribuir turma-->
        <add-turma
          v-if="itens"
          :show="handleShowAddTurmas"
          :itens="itens"
          @closeModal="closeModal"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import userApi from "src/composible/userApi";
import usenotification from "src/composible/useNotify";
import userAuth from "src/composible/userAuthUser";
import { useQuasar } from "quasar";
import { columns } from "./table";
import detalhesComponent from "src/components/detalhesComponent.vue";
import addDoc from "src/components/addDocument.vue";
import addTurma from "src/components/addTurmas.vue";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import { fields } from "./fieldsExport";
import JsonExcel from "vue-json-excel3";
import loadingComponent from "src/components/loading/loadingComponent.vue";
export default defineComponent({
  components: {
    detalhesComponent,
    DownloadExcel: JsonExcel,
    addDoc,
    addTurma,
    loadingComponent,
  },
  setup() {
    const funcionarios = ref([]);
    const itensDetails = ref("");
    const { remove, getFuncionariosWithCategoriasAndEscolas } = userApi();
    const token = userAuth();
    const { user } = userAuth();
    const router = useRouter();
    const storage = "sgdme";
    const handleShowDetail = ref(false);
    const handleShowAddDoc = ref(false);
    const handleShowAddTurmas = ref(false);
    const $q = useQuasar();
    const perfil = ref("");
    const itens = ref({});
    const card = ref(false);
    const filter = ref("");
    const table = "funcionarios";
    const { notifyError, notifySuccess } = usenotification();
    const funcionarioCategoriasAndEscolas = ref([]);
    const loading = ref(false);

    const detalhes = (data) => {
      itens.value = data;
      handleShowDetail.value = true;
    };

    const closeModal = () => {
      handleShowDetail.value = false;
      handleShowAddDoc.value = false;
      handleShowAddTurmas.value = false;
    };

    const addDoc = (data) => {
      itens.value = data;
      handleShowAddDoc.value = true;
    };

    const addTurmas = (data) => {
      itens.value = data;
      handleShowAddTurmas.value = true;
    };

    const deletarItem = async (item) => {
      try {
        $q.dialog({
          title: "Confirmação",
          message: `tens a certeza que pretendes eliminar ${item.name} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          $q.loading.show({ message: "Apagando dados do funcionários..." });
          await remove(table, item.id);
          listarFuncionariosComCategoria();
          notifySuccess("Dados do funcionário apagado com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };

    const alterarItem = (item) => {
      if (user.value.user_metadata.role == "Admin-Escola") {
        router.push({
          name: "form-funcionario-edit-Escola-admin",
          params: { id: item.id },
        });
      } else {
        router.push({ name: "form-funcionario", params: { id: item.id } });
      }
    };

    onMounted(() => {
      listarFuncionariosComCategoria();
      perfil.value = user.value.user_metadata.role;
    });

    const listarFuncionariosComCategoria = async () => {
      try {
        loading.value = true;
        funcionarioCategoriasAndEscolas.value =
          await getFuncionariosWithCategoriasAndEscolas(table, user.value);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    const isDiferentID = computed(() => {
      if (user.value.id != user.value.user_metadata.organization_id) {
        return user.value.user_metadata.organization_id;
      } else {
        return user.value.id;
      }
    });

    return {
      columns,
      alterarItem,
      deletarItem,
      funcionarios,
      storage,
      token,
      detalhes,
      card,
      itensDetails,
      itens,
      handleShowDetail,
      handleShowAddDoc,
      handleShowAddTurmas,
      addDoc,
      btnConfig,
      inputConfig,
      fields,
      listarFuncionariosComCategoria,
      funcionarioCategoriasAndEscolas,
      filter,
      closeModal,
      isDiferentID,
      perfil,
      addTurmas,
      loading,
    };
  },
});
</script>

<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
