<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-form class="row justify-center" @submit.prevent="resetPassword">
          <p class="col-12 text-h5 text-center q-mt-lg">Redefinir senha</p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
            <p class="text-body1">
              Esqueceu sua senha? sem problema vamos resolver. Informe-nos seu
              E-mail de seguida inviarémos um link de redefinição da sua senha
            </p>
            <q-input
              outlined
              v-model="form.email"
              label="E-mail"
              class="col-12"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Porfavor digite seu e-mail',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>

            <q-btn
              icon="send"
              type="submit"
              label="Enviar"
              class="full-width q-mt-lg"
              color="primary"
              no-caps
            />

            <q-btn
              :to="{ name: 'loginPage' }"
              flat
              label="Já tenho uma conta"
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
import usenotification from "src/composible/useNotify";

import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "form-login",
  setup() {
    const { sendEmailResetPassword } = userAuth();
    const { notifyError, notifySuccess } = usenotification();
    const $q = useQuasar();
    const form = ref({
      email: "",
    });

    const resetPassword = async () => {
      try {
        $q.loading.show({ message: "Porfavor aguarde..." });
        await sendEmailResetPassword(form.value);
        notifySuccess(
          "Solicitou uma nova senha, porfavor verifique sua caixa de email"
        );
      } catch (error) {
        notifyError(error.message);
      } finally {
        $q.loading.hide();
      }
    };
    return {
      form,
      sendEmailResetPassword,
      resetPassword,
    };
  },
};
</script>
<style scoped></style>
src/boot/supabase
