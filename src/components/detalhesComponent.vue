<template>
  <q-dialog :model-value="show" persistent :full-width="$q.platform.mobile">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row">
          <div class="col-12 text-subtitle2 text-right">
            <q-avatar icon="mdi-account-details" /> Mais detalhes
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="margin-top: -120px !important">
        <div class="row q-gutter-y-sm">
          <div class="col-12">
            <q-img :src="url_image" style="max-width: 200px">
              <div class="absolute-bottom text-subtitle1 text-center">
                {{ itens.name }}
              </div>
            </q-img>
          </div>

          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Nome do pai:
              <span class="text-blue-grey-5">{{ itens.nome_pai }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Nome da maê:
              <span class="text-blue-grey-5">{{ itens.nome_mae }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Nº do Bilhete:
              <span class="text-blue-grey-5">{{
                itens.num_bilhete
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Data de emissão:
              <span class="text-blue-grey-5">{{
                itens.data_emissao
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Data de validade:
              <span class="text-blue-grey-5">{{
                itens.data_caducidade
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Data de nascimento:
              <span class="text-blue-grey-5">{{
                itens.data_nascimento
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Província:
              <span class="text-blue-grey-5">{{ itens.provincia }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Município:
              <span class="text-blue-grey-5">{{ itens.municipio }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Comuna:
              <span class="text-blue-grey-5">{{ itens.comuna }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Localidade/Bairro:
              <span class="text-blue-grey-5">{{ itens.localidade }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Categoria:
              <span class="text-blue-grey-5">{{
                itens.categorias.categoria
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Vencimento Base:
              <span class="text-green-10">{{
                formatCurrency(itens.salario_base)
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Vencimento Liquido:
              <span class="text-green-10">{{
                formatCurrency(itens.salario_liquido)
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Habilitação Literá:
              <span class="text-blue-grey-5">{{
                itens.habilitacao
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Área de formação:
              <span class="text-blue-grey-5">{{
                itens.area_formacao
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Instituto onde se formou:
              <span class="text-blue-grey-5">{{
                itens.instituto_formacao
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Nº de agente:
              <span class="text-blue-grey-5">{{ itens.num_agente }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Escola onde foi colocado:
              <span class="text-blue-grey-5">{{
                itens.escolas.nome
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Gênero:
              <span class="text-blue-grey-5">{{ itens.genero }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Data de início de funções:
              <span class="text-blue-grey-5">{{
                itens.data_inicio_funcao
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-6">
            <span class="text-body1"
              >Total de tempo em serviço:
              <span class="text-blue-grey-5">{{
                new Date().getFullYear() -
                new Date(itens.data_inicio_funcao).getFullYear()
              }}</span></span
            >
          </div>
          <div class="col-xs-12 col-sm-12 col-12">
            <span class="text-body1"
              >Total de tempo em falta para reforma:
              <span class="text-red-5"
                >{{
                  35 -
                  (new Date().getFullYear() -
                    new Date(itens.data_inicio_funcao).getFullYear())
                }}
                Anos</span
              ></span
            >
          </div>
        </div>
        <q-separator />
        <div class="row flex item-justify">
          <div class="col-sx-12 col-sm-12 col-md-6 col-lg-6" v-if="disciplinas">
            <span class="text-caption text-red"
              >Disciplinas que o docente Ministra</span
            >
            <ul>
              <li v-for="(d, index) in disciplinas" :key="index">
                {{ d.disciplinas.nome_disciplina }}
              </li>
            </ul>
          </div>
          <div class="col-sx-12 col-sm-12 col-md-6 col-lg-6" v-if="cursos">
            <span class="text-caption text-red"
              >Cursos onde o docente Ministra</span
            >
            <ul>
              <li v-for="(c, index) in cursos" :key="index">
                {{ c.cursos.nome_curso }}
              </li>
            </ul>
          </div>
          <div class="col-sx-12 col-sm-12 col-md-6 col-lg-6" v-if="classes">
            <span class="text-caption text-red"
              >Classes onde o docente Ministra</span
            >
            <ul>
              <li v-for="(c, index) in classes" :key="index">
                {{ c.classes.nome_classe }}
              </li>
            </ul>
          </div>
          <div class="col-sx-12 col-sm-12 col-md-6 col-lg-6" v-if="periodos">
            <span class="text-caption text-red"
              >Periodos que o docente Ministra</span
            >
            <ul>
              <li v-for="(p, index) in periodos" :key="index">
                {{ p.periodos.nome_periodo }}
              </li>
            </ul>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup @click="handClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, watch } from "vue";
import { formatCurrency } from "src/utils/formatCurrency";
import { useTurmasProf } from "src/stores/add_turmas_profs";
export default {
  name: "modalDetail",
  props: {
    itens: {
      type: Object,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const funcionarios = ref([]);
    const turmas = ref([]);
    const classes = ref([]);
    const disciplinas = ref([]);
    const cursos = ref([]);
    const periodos = ref([]);
    const $q = useQuasar();
    const url_image = ref(null);
    const {
      getDocente_classes,
      getDocente_cursos,
      getDocente_disciplinas,
      getDocente_periodos,
      getDocente_turmas,
    } = useTurmasProf();

    const handClose = () => {
      emit("closeModal");
    };

    watch(
      () => props.itens,
      (newValue) => {
        console.log(newValue);
        url_image.value = newValue.img_url;
        const { id, escola_id, user_id } = newValue;
        turmas.value = getDocente_turmas(user_id, escola_id, id);
        getDocente_disciplinas(user_id, escola_id, id).then((item) => {
          disciplinas.value = item;
        });
        getDocente_classes(user_id, escola_id, id).then((item) => {
          console.log(item);
          classes.value = item;
        });
        getDocente_cursos(user_id, escola_id, id).then((item) => {
          cursos.value = item;
        });
        getDocente_periodos(user_id, escola_id, id).then((item) => {
          periodos.value = item;
        });
      }
    );

    return {
      handClose,
      funcionarios,
      formatCurrency,
      turmas,
      classes,
      disciplinas,
      cursos,
      periodos,
      url_image,
    };
  },
};
</script>
