<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="row col-6 col-sm-6 q-pa-sm q-gutter-sm">
          <q-btn
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            icon="mdi-shape-plus"
            label="Categorias"
            v-bind="{ ...btnConfig }"
            :to="{ name: 'categorias' }"
          ></q-btn>
          <q-btn
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg text-center"
            icon="mdi-school-outline"
            label="Escola Info"
            v-bind="{ ...btnConfig }"
            :to="{ name: 'escolas' }"
          ></q-btn>

          <q-btn
            class="col-xs-12 col-sm-12 col-md-4 col-lg-4 q-pa-lg"
            icon="mdi-account-tie"
            label="Funcionário"
            v-bind="{ ...btnConfig }"
            :to="{ name: 'funcionarios' }"
          ></q-btn>
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
<style lang="sass">
.example-column-row-wrapping
  .column
    background: rgba(#aa0, .1)
  .column > div
    padding: 10px 15px
    background: rgba(#999, .15)
    border: 1px solid rgba(#999, .2)
  .column + .column
    margin-top: 1rem
</style>
