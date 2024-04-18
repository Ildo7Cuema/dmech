<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-form class="row justify-center" @submit.prevent="updatePassword">
          <p class="col-12 text-h5 text-center q-mt-lg">Redefinição de senha</p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
            <q-input
              outlined
              v-model="password"
              label="Senha"
              class="col-12"
              type="password"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length >= 6) ||
                  'Porfavor digite a sua nova senha',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-key-chain" />
              </template>
            </q-input>

            <q-btn
              type="submit"
              label="Enviar nova senha"
              class="full-width q-mt-lg"
              color="primary"
              no-caps
              icon="lock"
            />

            <q-btn
              :to="{ name: 'resetPassword' }"
              flat
              label="Esqueci minha senha"
              class="full-width q-mt-md"
              color="primary"
              no-caps
            />
            <q-btn
              :to="{ name: 'createUser' }"
              flat
              label="Criar uma conta"
              class="full-width q-mt-md"
              color="primary"
              no-caps
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import userAuth from "../composible/userAuthUser";
import { ref } from "vue";
import { Loading, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import usenotification from "src/composible/useNotify";
export default {
  name: "form-login",
  setup() {
    const { resetPassword } = userAuth();
    const { notifyError, notifySuccess } = usenotification();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const token = route.query.token;
    const password = ref("");

    const updatePassword = async () => {
      try {
        Loading.show({ message: "Porfavor aguarde..." });
        await resetPassword(token, password.value);
        router.push({ name: "loginPage" });
        notifySuccess("Senha alterada com sucesso");
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };
    return {
      password,
      updatePassword,
    };
  },
};
</script>
<style scoped></style>
