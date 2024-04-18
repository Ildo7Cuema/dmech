<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="q-gutter-x-md">
          <topo-name-page-vue :titulo="titulo" />
          <div class="row">
            <div class="col-6">
              <btn-back-page-vue />
            </div>
            <q-space />
            <q-btn
              flat
              dense
              size="sm"
              icon="mdi-eye-outline"
              label="ver orçamentos"
              @click="see_orcamentos"
            />
          </div>
        </div>
        <q-separator />

        <div class="row q-pt-sm flex-center">
          <p class="text-sm">Criar orçamento</p>

          <q-form class="col-12" @submit.prevent="addOrcamento">
            <q-input
              type="text"
              label="Nome do projecto"
              v-model="form.project_name"
              :rules="[(val) => !!val || 'Porfavor informe o nome do projecto']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              type="text"
              label="Area de actuação"
              v-model="form.area_actuacao"
              :rules="[(val) => !!val || 'Porfavor informe a área de actuação']"
              v-bind="{ ...inputConfig }"
            />

            <div class="q-gutter-md q-mt-md flex flex-center">
              <div>
                <p class="text-sm">Inicio da execução do projecto</p>
                <q-date
                  type="text"
                  class="q-mt-sm"
                  v-model="form.data_inicio"
                  :rules="[
                    (val) => !!val || 'Porfavor informe a data de início',
                  ]"
                  minimal
                />
              </div>

              <div>
                <p class="text-sm">Previsão de término da execução</p>
                <q-date
                  type="text"
                  class="q-mt-sm"
                  v-model="form.data_fim"
                  :rules="[
                    (val) =>
                      !!val || 'Porfavor informe a data do fim do programa',
                  ]"
                  minimal
                />
              </div>
            </div>

            <div class="q-pa-md q-gutter-sm">
              <p class="text-body1">Descrição do projecto</p>
              <q-editor
                :rules="[(val) => !!val || 'Porfavor informe a descrição']"
                v-model="form.descricao"
                :dense="$q.screen.lt.md"
                :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify'],
                    },
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify'],
                    },
                  ],
                  [
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                    'subscript',
                    'superscript',
                  ],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['print', 'fullscreen', 'upload', 'save'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code',
                      ],
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7',
                      ],
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana',
                      ],
                    },
                    'removeFormat',
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                  ['undo', 'redo'],
                  ['viewsource'],
                ]"
                :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana',
                }"
              />
            </div>

            <q-input
              type="text"
              label="Valor do custo"
              suffix="Kz"
              v-model="form.custo"
              :rules="[
                (val) => !!val || 'Porfavor informe o custo do projecto',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <div class="q-pa-md q-gutter-sm">
              <q-btn
                icon="mdi-content-save"
                label="Criar orçamento"
                class="q-mt-sm full-width"
                color="secondary"
                type="submit"
                v-bind="{ ...btnConfig }"
              />
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import btnBackPageVue from "src/components/btnBack/btnBackPage.vue";
import { defineComponent, ref, onMounted } from "vue";
import topoNamePageVue from "src/components/topoNamePage/topoNamePage.vue";
import useNotification from "src/composible/useNotify";
import useApi from "src/composible/userApi";
import { Loading } from "quasar";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "page-plano",
  components: { btnBackPageVue, topoNamePageVue },
  setup() {
    const table = "orcamento_project";
    const date = new Date();
    const router = useRouter();
    const titulo = "Área do plano";
    const { notifyError, notifySuccess } = useNotification();
    const { post } = useApi();
    const form = ref({
      project_name: "",
      area_actuacao: "",
      data_inicio: "",
      data_fim: "",
      descricao: "",
      custo: "",
    });

    const see_orcamentos = () => {
      router.push({ name: "orcamentos" });
    };
    const addOrcamento = async () => {
      try {
        Loading.show({ message: "Criar orçamento" });
        await post(table, form.value);
        notifySuccess("Orçamento criado com sucesso");
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };

    onMounted(() => {
      const dia = date.getDate();
      const mes = date.getMonth();
      const ano = date.getFullYear();

      form.value.data_inicio = ano + "/" + mes + "/" + dia;
      form.value.data_fim = ano + "/" + mes + "/" + dia;

      console.log(form.value);
    });

    return {
      addOrcamento,
      titulo,
      table,
      btnConfig,
      inputConfig,
      form,
      see_orcamentos,
    };
  },
});
</script>
