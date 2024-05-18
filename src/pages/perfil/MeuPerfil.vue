<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row q-pa-md q-gutter-sm flex-center">
          <p class="col-12 q-mb-lg text-body2">
            <q-icon size="md" color="primary" name="mdi-account" /> Meu Perfil
          </p>
        </div>
        <q-separator />

        <q-card>
          <q-card-section>
            <q-form class="q-gutter-sm" @submit.prevent="updatePerfil">
              <q-input v-model="form.name" v-bind="{ ...inputConfig }" />
              <q-input v-model="form.email" v-bind="{ ...inputConfig }" />
              <q-input v-model="form.phone" v-bind="{ ...inputConfig }" />
              <q-input
                label="Actualizar senha"
                type="password"
                v-model="form.password"
                v-bind="{ ...inputConfig }"
              />
              <admin-access-op
                :emailAccess="form.emailAdmin"
                v-model="form.role"
              />
              <!-- <q-select
                v-if="form.phone == '921923232'"
                v-model="form.status"
                :options="optionsStatus"
                option-value="id"
                option-label="nome"
                map-options
                emit-value
                label="Selecione o status"
                :rules="[(val) => !!val || 'Porfavor informe o status']"
                v-bind="{ ...inputConfig }"
              /> -->
              <q-btn
                type="submit"
                no-caps
                label="Actualizar perfif"
                icon="mdi-account"
                color="primary"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { inputConfig } from "src/utils/inputVisual.js";
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import userAuthUser from "src/composible/userAuthUser";
import userApi from "src/composible/userApi";
import { useRouter } from "vue-router";
import adminAccessOp from "src/components/adminAccessOp/adminAccessOp.vue";
import { route } from "quasar/wrappers";
export default {
  components: { adminAccessOp },
  setup(props) {
    const { updateUser, user, logout } = userAuthUser();
    const router = useRouter();
    // const options = ref([
    //   "Super-admin",
    //   "Admin",
    //   "User",
    //   "Docente",
    //   "Secretaria",
    //   "Recursos-humanos",
    // ]);
    //const optionsStatus = ref([true, false]);

    const $q = useQuasar();

    const form = ref({
      name: "",
      phone: "",
      email: "",
      photoURL: "",
      file_name: "",
      role: "",
      emailAdmin: user.value.email,
      status: true,
    });

    onMounted(() => {
      console.log(user.value);
      form.value.name = user.value.user_metadata.name;
      form.value.phone = user.value.user_metadata.phone;
      form.value.email = user.value.email;
    });

    const updatePerfil = async () => {
      try {
        $q.loading.show({ message: "Actualizar perfil" });
        await updateUser(form.value);
        // $q.notify({
        //   message: "Perfil actualizado",
        //   color: "positive",
        //   position: "top-right",
        //   icon: "mdi-check",
        // });

        $q.dialog({
          title: "Perfil actualizado",
          message:
            "Perfil actualizado com éxito.\n\nVocê será deslogado do sistema, entre com novas credenciais",
          ok: true,
          persistent: true,
        });
        logout();
        router.push({ name: "loginPage" });
      } catch (error) {
        console.log(error);
        $q.notify({
          message: "Error ao actualizar perfil",
          color: "negative",
          position: "top-right",
          icon: "mdi-alert",
        });
      } finally {
        $q.loading.hide();
      }
    };

    return { inputConfig, form, updatePerfil };
  },
};
</script>
