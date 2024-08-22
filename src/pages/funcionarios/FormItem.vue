<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <q-form class="row justify-center" @submit.prevent="addItems">
          <p class="col-12 text-body3 text-center q-mt-lg">
            {{
              isUpdate
                ? "Actualizar dados do funcionário"
                : "Cadastrar novo funcionário"
            }}
          </p>
          <div class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-sm">
            <q-input
              label="Carregue uma foto do tipo passe"
              stack-label=""
              v-model="image"
              multiple
              filled
              type="file"
              accept="image/*"
              v-bind="{ ...inputConfig }"
            />
            <!-- <div class="col-12 q-ma-md flex flex-center">
              <q-uploader
                style="max-width: 300px"
                label="Adicione uma imagen"
                accept=".jpg, image/*"
                v-model="image"
                multiple
                filled
              />
            </div>-->

            <q-input
              v-model="form.name"
              label="Nome completo"
              class="col-12"
              :rules="[(val) => !!val || 'Porfavor digite o nome da escola']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.nome_pai"
              label="Nome do pai"
              class="col-12"
              :rules="[(val) => !!val || 'Porfavor o nome do pai']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.nome_mae"
              label="Nome da maê"
              class="col-12"
              :rules="[(val) => !!val || 'Porfavor o nome da maê']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.phone"
              label="Nº do telemóvel"
              class="col-12"
              :rules="[
                (val) => !!val || 'Porfavor informe o nº do telemóvel',
                (val) =>
                  (val && val.length == 9) ||
                  'O nº do telemóvel tem de ter no mínimo 9 dígitos',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              v-model="form.email"
              label="E-mail"
            />
            <!--:rules="[(val) => !!val || 'Informe o e-mail']" -->

            <q-input
              v-model="form.num_bilhete"
              label="Nº do bilhete"
              class="col-12"
              :rules="[
                (val) => !!val || 'Porfavor informe o nº do Bilhete',
                (val) =>
                  (val && val.length == 14) ||
                  'O nº do Bilhete tem de ter no mínimo 14 caracteres',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.data_emissao"
              label="Data de emissão"
              class="col-12"
              type="date"
              :rules="[(val) => !!val || 'Porfavor informe a data de emissão']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.data_caducidade"
              label="Data de caducidade"
              class="col-12"
              type="date"
              :rules="[
                (val) => !!val || 'Porfavor informe a data de caducidade',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.data_nascimento"
              label="Data de nascimento"
              class="col-12"
              type="date"
              :rules="[
                (val) => !!val || 'Porfavor informe a data de nascimento',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-select
              v-model="form.genero"
              :options="options"
              option-label="name"
              label="Selecione o gênero"
              :rules="[
                (val) => !!val || 'Porfavor informe o gênero do funcionário',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-select
              v-model="form.estado_civil"
              :options="estado_civil"
              option-label="name"
              label="Estado Civil"
              :rules="[(val) => !!val || 'Porfavor informe o estado civil']"
              v-bind="{ ...inputConfig }"
            />

            <q-select
              v-model="form.nivelAcademico"
              :options="nivelAcademico"
              option-label="name"
              label="Selecione o nível acadêmico"
              :rules="[
                (val) =>
                  !!val || 'Porfavor informe o nível acadêmico do funcionário',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.data_inicio_funcao"
              label="Data de início de função"
              class="col-12"
              type="date"
              :rules="[
                (val) => !!val || 'Porfavor informe a data de início de função',
              ]"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.num_agente"
              label="Nº de agente"
              class="col-12"
              :rules="[(val) => !!val || 'Porfavor informe o nº de agente']"
              v-bind="{ ...inputConfig }"
            />

            <q-select
              v-model="form.cituacao_funcionario"
              :options="cituacao_fucnionario"
              option-label="name"
              label="Selecione a cituação do funcionário"
              :rules="[
                (val) => !!val || 'Porfavor informe a cituação do funcionário',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.provincia"
              label="Provincia"
              class="col-12"
              :rules="[(val) => !!val || 'Informe a província']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.municipio"
              label="Município"
              class="col-12"
              :rules="[(val) => !!val || 'Informe o município']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.comuna"
              label="Comuna"
              class="col-12"
              lazy-rules
              :rules="[(val) => !!val || 'Informe a Comuna']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-model="form.localidade"
              label="Localidade"
              class="col-12"
              :rules="[(val) => !!val || 'Informe a localidade']"
              v-bind="{ ...inputConfig }"
            />

            <q-select
              v-model="form.categoria_id"
              :options="categorias"
              option-value="id"
              option-label="categoria"
              map-options
              emit-value
              label="Selecione uma categoria"
              :rules="[(val) => !!val || 'Porfavor Selecione uma categoria']"
              v-bind="{ ...inputConfig }"
            />

            <q-select
              v-model="form.status_nomeacao"
              :options="estado_nomeacao"
              option-label="name"
              label="É nomeado para um cargo ?"
              :rules="[(val) => !!val || 'Porfavor o status de nomeacao']"
              v-bind="{ ...inputConfig }"
            />

            <q-input
              v-if="form.status_nomeacao == 'Sim'"
              v-model="form.nome_cargo"
              label="Informe o cargo"
              class="col-12"
              :rules="[(val) => !!val || 'Informe o cargo deste funcionário']"
              v-bind="{ ...inputConfig }"
            ></q-input>

            <q-input
              type="numeric"
              v-model="form.salario_base"
              label="Vencimento Base"
              class="col-12"
              :rules="[(val) => !!val || 'Informe o salário base']"
              v-bind="{ ...inputConfig }"
            >
              <template v-slot:append>
                <span class="text-xxs text-primary meu-tamanho">{{
                  formatCurrency(form.salario_base)
                }}</span>
              </template>
            </q-input>

            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[(val) => !!val || 'Informe o salário base por extenso']"
              v-model="form.salario_base_extenso"
              label="Escreva o salário base por extenso"
            />

            <q-input
              v-model="form.salario_liquido"
              label="Vencimento Líquido"
              class="col-12"
              :rules="[(val) => !!val || 'Informe o salário líquido']"
              v-bind="{ ...inputConfig }"
              ref="inputRef"
            >
              <template v-slot:append>
                <span class="text-xxs text-primary meu-tamanho">{{
                  formatCurrency(form.salario_liquido)
                }}</span>
              </template>
            </q-input>

            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[
                (val) => !!val || 'Informe o salário liquido por extenso',
              ]"
              v-model="form.salario_liquido_extenso"
              label="Escreva o salário líquido por extenso"
            />

            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[
                (val) =>
                  !!val ||
                  'Informe o nome do balcão onde é domiciliado o salário',
              ]"
              v-model="form.balcao_domicilio"
              label="Balcão onde é domiciliado o salário"
            />
            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[(val) => !!val || 'Informe o nº da conta bancária']"
              v-model="form.num_conta_bancaria"
              label="Nº da conta bancária"
            />
            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[
                (val) =>
                  !!val ||
                  'Informe o nome da província onde se encotra este balcão',
              ]"
              v-model="form.balcao_domicilio_provincia"
              label="Província onde se encotra este balcão"
            />
            <q-input
              class="col-12"
              v-bind="{ ...inputConfig }"
              :rules="[
                (val) =>
                  !!val ||
                  'Informe o nome da província onde se encotra este balcão',
              ]"
              v-model="form.balcao_domicilio_municipio"
              label="Município onde se encotra este balcão"
            />

            <q-select
              v-model="form.escola_id"
              :options="escolas"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              label="Selecione a escola a que pertence"
              :rules="[(val) => !!val || 'Porfavor a escola a que pertence']"
              v-bind="{ ...inputConfig }"
              v-if="perfil !== 'Admin-Escola'"
            />
            <div class="col-12 q-pa-md">
              <span><b>É docente em frente do aluno?</b></span>
              <div class="q-gutter-sm">
                <q-radio
                  v-model="form.tipo_funcionario"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="Docente"
                  label="Sim"
                />
                <q-radio
                  v-model="form.tipo_funcionario"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="Pessoal administrativo"
                  label="Não"
                />
                <div class="q-px-sm">
                  Você o selecionou como:
                  <strong class="text-red-10">{{
                    form.tipo_funcionario
                  }}</strong>
                </div>
                <div v-if="perfil !== 'Admin-Escola'">
                  <q-select
                    v-if="form.tipo_funcionario == 'Docente'"
                    v-model="form.disciplinas_ministrada"
                    :options="disciplinas"
                    option-value="id"
                    option-label="name"
                    map-options
                    emit-value
                    label="Disciplinas ministradas"
                    multiple
                    filled
                    v-bind="{ ...inputConfig }"
                    :rules="[
                      (val) =>
                        !!val ||
                        'Selecione as disciplinas que o docente ministra',
                    ]"
                  />
                </div>
                <div v-else>
                  <q-select
                    v-if="form.tipo_funcionario == 'Docente'"
                    v-model="form.disciplinas_ministrada"
                    :options="disciplinasEscola"
                    option-value="id"
                    option-label="nome_disciplina"
                    map-options
                    emit-value
                    label="Disciplinas ministradas"
                    multiple
                    filled
                    v-bind="{ ...inputConfig }"
                    :rules="[
                      (val) =>
                        !!val ||
                        'Selecione as disciplinas que o docente ministra',
                    ]"
                  />

                  <q-select
                    v-if="form.tipo_funcionario == 'Docente'"
                    v-model="form.classes_prof"
                    :options="classes_prof"
                    option-value="id"
                    option-label="nome_classe"
                    map-options
                    emit-value
                    label="Selecione as classes que o docente ministra"
                    multiple
                    filled
                    v-bind="{ ...inputConfig }"
                    :rules="[
                      (val) =>
                        !!val || 'Selecione as classes que o docente ministra',
                    ]"
                  />

                  <q-select
                    v-if="form.tipo_funcionario == 'Docente'"
                    v-model="form.cursos_prof"
                    :options="cursos_prof"
                    option-value="id"
                    option-label="nome_curso"
                    map-options
                    emit-value
                    label="Selecione os cursos onde o docente ministra"
                    multiple
                    filled
                    v-bind="{ ...inputConfig }"
                    :rules="[
                      (val) =>
                        !!val || 'Selecione os cursos onde o docente ministra',
                    ]"
                  />

                  <q-select
                    v-if="form.tipo_funcionario == 'Docente'"
                    v-model="form.turmas_prof"
                    :options="turmas_prof"
                    option-value="id"
                    option-label="nome_turma"
                    map-options
                    emit-value
                    label="Selecione as turmas onde o docente ministra"
                    multiple
                    filled
                    v-bind="{ ...inputConfig }"
                    :rules="[
                      (val) =>
                        !!val || 'Selecione as turmas onde o docente ministra',
                    ]"
                  />

                  <q-select
                    v-if="form.tipo_funcionario == 'Docente'"
                    v-model="form.periodos_prof"
                    :options="periodos_prof"
                    option-value="id"
                    option-label="nome_periodo"
                    map-options
                    emit-value
                    label="Selecione o período onde o docente ministra"
                    multiple
                    filled
                    v-bind="{ ...inputConfig }"
                    :rules="[
                      (val) =>
                        !!val || 'Selecione o período onde o docente ministra',
                    ]"
                  />
                </div>
              </div>
            </div>
            <q-input
              v-model="form.habilitacao"
              label="Habilitação"
              class="col-12"
              :rules="[(val) => !!val || 'Informe a habilitação']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.area_formacao"
              label="Área de formação"
              class="col-12"
              :rules="[(val) => !!val || 'Informe a área de formação']"
              v-bind="{ ...inputConfig }"
            />
            <q-input
              v-model="form.instituto_formacao"
              label="Instituto de formação"
              class="col-12"
              :rules="[
                (val) =>
                  !!val || 'Informe o nome da instituição onde se formou',
              ]"
              v-bind="{ ...inputConfig }"
            />

            <div v-if="isUpdate == null">
              <q-separator />
              <div class="col-12 text-center">
                <b>Atribuir uma conta para este funcionario</b>
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
              <admin-access-other v-model="form.role" :perfil="perfil" />
            </div>

            <q-btn
              type="submit"
              :icon="
                isUpdate ? 'mdi-file-edit-outline' : 'mdi-content-save-all'
              "
              class="full-width"
              :label="
                isUpdate
                  ? 'Actualizar dados do funcionário'
                  : 'Cadastrar o funcionário'
              "
              v-bind="{ ...btnConfig }"
            />

            <!-- Btn delete for mobile -->
            <q-btn
              v-if="$q.platform.is.mobile && isUpdate"
              @click="deletarItem(form)"
              outline
              icon="mdi-delete-empty"
              color="negative"
              class="full-width"
              label="Apagar dados do  funcionário"
              no-caps
            />

            <q-btn
              v-if="$q.platform.is.mobile"
              flat
              icon="mdi-format-list-bulleted"
              color="primary"
              class="full-width q-pa-sm"
              label="Lista de funcionários"
              :to="{ name: 'funcionarios' }"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import usenotification from "src/composible/useNotify";
import userApi from "src/composible/userApi";
import { Loading, useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { btnConfig, inputConfig } from "src/utils/inputVisual";
import { formatCurrency } from "src/utils/formatCurrency";
import userAuthUser from "src/composible/userAuthUser";
import adminAccessOther from "src/components/adminAccessOp/adminAccessOther.vue";
import { disciplinas } from "./disciplinas";
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useEscolaStore } from "src/stores/escolas";
import { useCursoStore } from "src/stores/cursos";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import { useClasseStore } from "src/stores/classes";
export default {
  name: "form-categoria",
  components: { adminAccessOther },

  setup() {
    const {
      postFuncionario,
      getById,
      update,
      list,
      remove,
      uploadImage,
      fileName,
    } = userApi();
    const { getEscolaByEmail } = useEscolaStore();
    const { notifyError, notifySuccess } = usenotification();
    const { getAllDisciplinas } = useDisciplinaStore();
    const { getAllClasses } = useClasseStore();
    const { getAllCursos } = useCursoStore();
    const { getAllTurmas } = useTurmaStore();
    const { getAllPeriodos } = usePeriodoStore();

    const table = "funcionarios";
    const router = useRouter();
    const { user } = userAuthUser();

    const moneyFormatForDirective = {
      decimal: ".",
      thousands: ",",
      prefix: "$ ",
      suffix: " #",
      precision: 2,
      masked: false /* doesn't work with directive */,
    };

    const route = useRoute();
    const $q = useQuasar();
    const options = ref(["Masculino", "Femenino"]);
    const nivelAcademico = ref([
      "Técnico Basico",
      "Técnico médio",
      "Licenciado(a)",
      "Mestre",
      "Phd",
    ]);
    const cituacao_fucnionario = ref([
      "Em efectivo serviço",
      "Em estado provisório",
    ]);
    const estado_nomeacao = ref(["Sim", "Não"]);
    const estado_civil = ref(["Casado (a)", "Solteiro (a)"]);
    const categorias = ref([]);
    const escolas = ref([]);
    const image = ref([]);
    const perfil = ref("");

    const disciplinasEscola = ref([]);
    const classes_prof = ref([]);
    const turmas_prof = ref([]);
    const cursos_prof = ref([]);
    const periodos_prof = ref([]);

    const form = ref({
      name: "",
      nome_pai: "",
      nome_mae: "",
      num_agente: "",
      num_bilhete: "",
      phone: "",
      data_emissao: "",
      data_caducidade: "",
      data_nascimento: "",
      num_conta_bancaria: "",
      disciplinas_ministrada: [],
      email: "",
      genero: "",
      data_inicio_funcao: "",
      provincia: "",
      municipio: "",
      tipo_funcionario: "",
      comuna: "",
      localidade: "",
      status_nomeacao: "",
      categoria_id: "",
      escola_id: "",
      habilitacao: "",
      area_formacao: "",
      instituto_formacao: "",
      img_url: "",
      file_name: "",
      salario_base: 0,
      salario_liquido: 0,
      nivelAcademico: "",
      salario_base_extenso: "",
      salario_liquido_extenso: "",
      cituacao_funcionario: "",
      estado_civil: "",
      balcao_domicilio: "",
      balcao_domicilio_provincia: "",
      balcao_domicilio_municipio: "",
      role: "",
      password: "",
      perfil: "",
      classes_prof: [],
      cursos_prof: [],
      turmas_prof: [],
      periodos_prof: [],
    });

    const isUpdate = computed(() => {
      return route.params.id;
    });

    const listarCategorias = async () => {
      categorias.value = await list("categorias", isDiferentID.value);
    };

    const listarEscolas = async () => {
      if (user.value.user_metadata.role == "Admin-Escola") {
        const id = await getEscolaByEmail("escolas", user.value.email);
        form.value.escola_id = id;
      } else {
        escolas.value = await list("escolas", isDiferentID.value);
      }
    };

    const deletarItem = async (item) => {
      try {
        $q.dialog({
          title: "Confirmação",
          message: `tens a certeza que pretendes eliminar ${item.nome} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          Loading.show({ message: "Apagando informação do funcionário..." });
          await remove(table, item.id);
          router.push({ name: "funcionario" });
          notifySuccess("Funcionário apagado com sucesso");
        });
      } catch (error) {
        notifyError(error.message);
      } finally {
        Loading.hide();
      }
    };
    onMounted(() => {
      listarCategorias();
      listDisciplinasEscola();
      listClassesEscola();
      listTurmasEscola();
      listCursosEscola();
      listPeriodoEscola();
      listarEscolas();
      if (isUpdate.value) {
        getItem(table, isUpdate.value);
      }

      perfil.value = user.value.user_metadata.role;
      form.value.perfil = user.value.user_metadata.role;
    });

    const listDisciplinasEscola = async () => {
      //verifica se o perfil é de uma escola
      if (user.value.user_metadata.role == "Admin-Escola") {
        // se o perfil for de acesso de escola então pega o id da escola e busca todas as disciplinas desta escola
        const id = await getEscolaByEmail("escolas", user.value.email);
        disciplinasEscola.value = await getAllDisciplinas(id);
      }
    };

    const listClassesEscola = async () => {
      //verifica se o perfil é de uma escola
      if (user.value.user_metadata.role == "Admin-Escola") {
        // se o perfil for de acesso de escola então pega o id da escola e busca todas as disciplinas desta escola
        const id = await getEscolaByEmail("escolas", user.value.email);
        classes_prof.value = await getAllClasses(id);
        console.log("classes:", classes_prof.value);
      }
    };

    const listTurmasEscola = async () => {
      //verifica se o perfil é de uma escola
      if (user.value.user_metadata.role == "Admin-Escola") {
        // se o perfil for de acesso de escola então pega o id da escola e busca todas as disciplinas desta escola
        const id = await getEscolaByEmail("escolas", user.value.email);
        turmas_prof.value = await getAllTurmas(id);

        console.log("turmas:", turmas_prof.value);
      }
    };

    const listCursosEscola = async () => {
      //verifica se o perfil é de uma escola
      if (user.value.user_metadata.role == "Admin-Escola") {
        // se o perfil for de acesso de escola então pega o id da escola e busca todas as disciplinas desta escola
        const id = await getEscolaByEmail("escolas", user.value.email);
        cursos_prof.value = await getAllCursos(id);

        console.log("cursos:", cursos_prof.value);
      }
    };

    const listPeriodoEscola = async () => {
      //verifica se o perfil é de uma escola
      if (user.value.user_metadata.role == "Admin-Escola") {
        // se o perfil for de acesso de escola então pega o id da escola e busca todas as disciplinas desta escola
        const id = await getEscolaByEmail("escolas", user.value.email);
        periodos_prof.value = await getAllPeriodos(id);

        console.log("periodos:", periodos_prof.value);
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
        if (image.value.length > 0) {
          await uploadImage(image.value[0], "sgdme").then((imgUrl) => {
            form.value.img_url = imgUrl;
            form.value.file_name = fileName;
          });
        }
        if (isUpdate.value) {
          Loading.show({ message: "Actualização em processamento" });
          await update(table, form.value);
          notifySuccess("Funcionário actualizado com sucesso");
        } else {
          Loading.show({ message: "Cadastro em processamento" });
          await postFuncionario(table, form.value);
          notifySuccess("Funcionário cadastrada com sucesso");
        }
      } catch (error) {
        console.log(form.value);
        notifyError(error.message);
      } finally {
        Loading.hide();
        if (user.value.user_metadata.role == "Admin-Escola") {
          router.push({ name: "pageFuncionarios" });
        } else {
          router.push({ name: "funcionarios" });
        }
      }
    };

    const isDiferentID = computed(() => {
      if (user.value.id != user.value.user_metadata.organization_id) {
        console.log(user.value.user_metadata.organization_id);
        return user.value.user_metadata.organization_id;
      } else {
        console.log(user.value.id);
        return user.value.id;
      }
    });

    const valorNumber = (valor) => {
      form.value.salario_base = valor;
    };

    return {
      form,
      isUpdate,
      valorNumber,
      table,
      image,
      deletarItem,
      addItems,
      categorias,
      escolas,
      options,
      btnConfig,
      inputConfig,
      nivelAcademico,
      formatCurrency,
      moneyFormatForDirective,
      cituacao_fucnionario,
      estado_civil,
      estado_nomeacao,
      isDiferentID,
      disciplinas,
      disciplinasEscola,
      perfil,
      classes_prof,
      turmas_prof,
      cursos_prof,
      periodos_prof,
    };
  },
};
</script>
<style lang="css" scoped>
.margin-bottom {
  margin-bottom: 80px !important;
}
.meu-tamanho {
  font-size: 16px;
}
</style>
