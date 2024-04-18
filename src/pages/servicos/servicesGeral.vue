<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row q-pa-md q-gutter-sm flex-center">
          <p class="col-12 q-mb-lg text-body2">
            Áreas de serviços administrativos
          </p>

          <q-btn
            icon="mdi-account-group"
            label="P . E . R . H"
            v-bind="{ ...btnConfig }"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            :to="{ name: 'perh' }"
          />
          <q-btn
            icon="mdi-school-outline"
            label="Ed. Ensino"
            v-bind="{ ...btnConfig }"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            :to="{ name: 'edEnsino' }"
          />
          <q-btn
            icon="mdi-scale-balance"
            label="S.INSPESS."
            v-bind="{ ...btnConfig }"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            :to="{ name: 'inspencao' }"
          />
          <q-btn
            icon="mdi-laptop"
            label="S . C . T . I"
            v-bind="{ ...btnConfig }"
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            :to="{ name: 'ctiPage' }"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { btnConfig, inputConfig } from "src/utils/inputVisual";
export default {
  setup() {
    return {
      btnConfig,
      inputConfig,
    };
  },
};
</script>
<style lang="css"></style>
