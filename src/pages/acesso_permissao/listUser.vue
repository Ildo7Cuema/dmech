<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <span class="q-mb-md"
          ><q-icon name="mdi-account-group" size="md" />
          <b class="q-ml-md"
            >UTILIZADORES <span class="text-red-10">- Administrador</span>
            {{ form.emailAdmin }}</b
          >
        </span>
        <div class="row" v-if="$q.platform.is.desktop && users != null">
          <q-table
            :rows="users"
            flat
            bordered
            :columns="columns"
            row-key="id"
            class="col-12"
            virtual-scroll
            :filter="filter"
          >
            <template v-slot:top>
              <q-input
                class=""
                type="text"
                label="Pesquisar"
                v-bind="{ ...inputConfig }"
                v-model="filter"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-magnify" />
                </template>
              </q-input>
              <q-space />
              <q-btn
                v-if="$q.platform.is.desktop"
                icon="mdi-account-plus"
                label="Criar novo utilizadores"
                @click="addNewUser"
                v-bind="{ ...btnConfig }"
                color="primary"
              />
              <!-- <download-excel
                :data="users"
                :fields="fields"
                worksheet="users"
                name="users.xls"
                class="q-ml-md"
              >
                <q-btn
                  icon="mdi-file-excel"
                  label="Exportar uma lista"
                  v-bind="{ ...btnConfig }"
                />
              </download-excel> -->
            </template>
            <template v-slot:body-cell-name="props">
              <q-td :props="props">
                {{ props.row.user_metadata.name }}
              </q-td>
            </template>
            <template v-slot:body-cell-role="props">
              <q-td :props="props">
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Admin-DME'"
                  class="bg-cyan q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Admin-Escola'"
                  class="bg-cyan-8 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Super-admin'"
                  class="bg-teal-10 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'User'"
                  class="bg-green-10 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Docente'"
                  class="bg-lime-10 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Estudante'"
                  class="bg-lime-7 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Encarregado'"
                  class="bg-lime-4 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'RH-DME'"
                  class="bg-blue-grey-8 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
                <span
                  style="border-radius: 18px; font-size: 11px"
                  v-if="props.row.user_metadata.role == 'Secretaria-DME'"
                  class="bg-blue-grey-8 q-pa-sm text-white rounded"
                  ><b>{{ props.row.user_metadata.role }}</b></span
                >
              </q-td>
            </template>
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <span
                  v-if="props.row.user_metadata.status == true"
                  class="text-green-10"
                  ><b>Activo</b></span
                >
                <span v-else class="text-red-10"><b>Bloqueado</b></span>
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm text-center">
                <q-btn
                  flat
                  icon="mdi-pencil-outline"
                  color="info"
                  dense
                  size="sm"
                  @click="alterarRoleUser(props.row)"
                >
                  <q-tooltip>Alterar</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  icon="mdi-delete-outline"
                  color="negative"
                  dense
                  size="sm"
                  @click="apagarUser(props.row.id)"
                  ><q-tooltip>Apagar</q-tooltip></q-btn
                >

                <q-toggle
                  v-if="form.emailAdmin == 'ildocuema@gmail.com'"
                  size="sm"
                  checked-icon="check"
                  color="green"
                  unchecked-icon="clear"
                  v-model="props.row.user_metadata.status"
                  @click="
                    upateStatus(props.row.id, props.row.user_metadata.status)
                  "
                />
              </q-td>
            </template>
          </q-table>
        </div>

        <div
          class="flex flex-center text-body1 text-center"
          v-if="$q.platform.is.desktop && users == null"
        >
          <q-btn flat color="red">
            De momento não tens nenhum usuario cadastrado
          </q-btn>
        </div>

        <!-- List for mobile -->
        <q-list bordered v-if="$q.platform.is.mobile && users != null">
          <div
            class="row text-body3 text-h5 flex-center q-pa-lg bg-secondary text-white"
          >
            <q-btn flat icon="mdi-school-outline" label="users" />
          </div>
          <q-separator />
          <q-item
            v-for="user in users"
            :key="user.id"
            class="q-mb-sm"
            clickable
            v-ripple
            @click="alterarRoleUser(user)"
          >
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="mdi-school-outline"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ user.nome }}</q-item-label>
              <q-item-label caption lines="1"
                >Nº da user:
                <strong class="secondary">{{ user.numero }}</strong>
              </q-item-label>
              <q-item-label caption lines="1"
                >Nº do decreto:
                <strong class="secondary">{{ user.num_decreto }}</strong>
              </q-item-label>
            </q-item-section>
            <q-separator />
          </q-item>
        </q-list>

        <div
          class="flex flex-center text-body1 text-center"
          v-if="$q.platform.is.mobile && users == null"
        >
          <q-btn color="red">
            De momento não tens nenhum usuário cadastrado
          </q-btn>
        </div>

        <q-page-sticky
          class="margin-bottom"
          position="bottom-right"
          :offset="[18, 18]"
          v-if="$q.platform.is.mobile"
        >
          <q-btn fab icon="mdi-plus" color="primary" @click="addNewUser" />
        </q-page-sticky>

        <!-- Modal Form User -->
        <q-dialog v-model="modal">
          <q-card>
            <q-card-section>
              <div class="text-h6" v-if="formNewUser">
                <q-icon name="mdi-account-cog">
                  <q-tooltip>Cadastrar Utilizador</q-tooltip>
                </q-icon>
                Cadastrar novo Utilizador
              </div>
              <div class="text-h6" v-else>
                <q-icon name="mdi-database-plus">
                  <q-tooltip>Editar Utilizador</q-tooltip>
                </q-icon>
                Alterar informações do Utilizador
              </div>
            </q-card-section>

            <q-separator />
            <q-form @submit.prevent="updateFormUser">
              <q-card-section class="q-gutter-md">
                <q-input
                  label="Nome"
                  v-model="form.name"
                  v-bind="{ ...inputConfig }"
                  lazy-roles
                  :roles="[(val) => !!val || 'Informe o nome']"
                ></q-input>
                <q-input
                  label="E-mail"
                  v-model="form.email"
                  v-bind="{ ...inputConfig }"
                  lazy-roles
                  :roles="[(val) => !!val || 'Informe o e-mail do usuário']"
                ></q-input>
                <q-input
                  label="Telemovel"
                  v-model="form.phone"
                  v-bind="{ ...inputConfig }"
                  lazy-roles
                  :roles="[
                    (val) => !!val || 'Informe o nº de Telemóvel do usuário',
                  ]"
                ></q-input>
                <q-input
                  v-if="formNewUser"
                  type="password"
                  label="Digite uma senha"
                  v-model="form.password"
                  v-bind="{ ...inputConfig }"
                  lazy-roles
                  :roles="[(val) => !!val || 'Digite uma senha válida']"
                ></q-input>
                <!-- <q-select
                  v-if="form.emailAdmin == 'ildocuema@gmail.com'"
                  v-model="form.role"
                  :options="options"
                  option-label="name"
                  label="Selecione o nivel de acesso"
                  v-bind="{ ...inputConfig }"
                  lazy-roles
                  :roles="[(val) => !!val || 'Selecione um nível de acesso']"
                /> -->
                <admin-access-op
                  :emailAccess="form.emailAdmin"
                  v-model="form.role"
                />
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Cancelar"
                  color="primary"
                  v-close-popup
                  @click="cancelarUpdate"
                  icon="mdi-close"
                />
                <q-btn
                  v-if="formNewUser"
                  :loading="progress.loading"
                  flat
                  label="Cadastrar"
                  color="primary"
                  type="submit"
                  icon="mdi-database-plus"
                />
                <q-btn
                  v-else
                  :loading="progress.loading"
                  flat
                  label="Actualizar"
                  color="primary"
                  type="submit"
                  icon="mdi-check"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import userApi from "src/composible/userApi";
import userAuthUser from "src/composible/userAuthUser";
import usenotification from "src/composible/useNotify";
import { Loading, useQuasar } from "quasar";
import { columns } from "./table";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import adminAccessOp from "src/components/adminAccessOp/adminAccessOp.vue";
// import JsonExcel from "vue-json-excel3";
export default defineComponent({
  components: {
    /*DownloadExcel: JsonExcel*/
    adminAccessOp,
  },
  setup() {
    const users = ref([]);
    const {
      listUsers,
      updateStatusUser,
      updateSingleUser,
      deleteUser,
      user,
      createNewUser,
    } = userAuthUser();
    const filter = ref("");
    const $q = useQuasar();
    const modal = ref(false);
    const { notifyError, notifySuccess } = usenotification();
    const status = ref(false);
    const itemUser = ref({});
    const idUser = ref("");
    const formNewUser = ref(true);

    // const options = ref([
    //   "Super-admin",
    //   "Admin",
    //   "User",
    //   "Docente",
    //   "Secretaria",
    //   "Recursos-humanos",
    // ]);

    const progress = ref({ loading: false });

    const form = ref({
      name: "",
      email: "",
      role: "",
      password: "",
      phone: "",
      photoURL: "",
      emailAdmin: user.value.email,
      organization_id: user.value.id,
    });

    const listarUsuarios = async () => {
      Loading.show({ message: "Carregando usuários" });
      try {
        users.value = await listUsers();
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const upateStatus = async (id, status) => {
      try {
        await updateStatusUser(id, status);
        notifySuccess("Status atualizado com sucesso");
      } catch (error) {
        notifyError(error.message);
      } finally {
        listarUsuarios();
      }
    };

    const apagarUser = async (id) => {
      try {
        $q.dialog({
          title: "Confirme!",
          message: `Tens a certeza que pretendes eliminar a conta deste Usuário ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await deleteUser(id);
          listarUsuarios();
          notifySuccess("Usuário apagado com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    const alterarRoleUser = (item) => {
      modal.value = true;
      formNewUser.value = false;
      console.log(item);
      idUser.value = item.id;
      form.value.name = item.user_metadata.name;
      form.value.email = item.email;
      form.value.phone = item.user_metadata.phone;
      form.value.role = item.user_metadata.role;
    };

    const cleanForm = () => {
      idUser.value = "";
      form.value.name = "";
      form.value.email = "";
      form.value.phone = "";
      form.value.role = "";
    };

    const addNewUser = () => {
      formNewUser.value = true;
      modal.value = true;
      cleanForm();
    };

    const cancelarUpdate = () => {
      modal.value = false;
      cleanForm();
    };

    const updateFormUser = async () => {
      try {
        progress.value.loading = true;
        if (formNewUser.value != true) {
          const { email, name, phone, role } = form.value;
          await updateSingleUser(idUser.value, {
            name: name,
            email: email,
            phone: phone,
            role: role,
          });
          listarUsuarios();
          notifySuccess("Usuário actualizado com sucesso");
        } else {
          await createNewUser(form.value);
          listarUsuarios();
          notifySuccess("Usuário cadastrado com sucesso");
        }
      } catch (error) {
        notifyError(error.message);
      } finally {
        progress.value.loading = false;
        cancelarUpdate();
      }
    };

    onMounted(() => {
      listarUsuarios();
      if (user.value.email != "ildocuema@gmail.com") {
        window.history.back();
      }
    });

    return {
      columns,
      alterarRoleUser,
      apagarUser,
      users,
      btnConfig,
      inputConfig,
      filter,
      status,
      upateStatus,
      modal,
      itemUser,
      cancelarUpdate,
      form,
      updateFormUser,
      // options,
      progress,
      addNewUser,
      formNewUser,
      cleanForm,
      user,
    };
  },
});
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
</style>
