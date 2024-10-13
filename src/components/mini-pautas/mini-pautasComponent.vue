<template>
  <q-page class="q-mt-sm">
    <q-card flat dense style="border-radius: 0" size="sm">
      <q-card-section>
        <div class="row q-mb-sm">
          <div>
            [ <b class="text-red-10">{{ nome_disciplina }}</b> ] - [
            {{ nivel_ensino }} ] - [ {{ nome_escola }} ] - Ano Lectivo:
            <b class="text-red-10">{{ anoLectivo }}</b> - [ Turma:
            <b>{{ turma }}</b> ] - [ <b>{{ classe }}</b> ] - [Período:
            <b>{{ periodo }}</b> ]
          </div>
          <q-space />
          <div>
            <q-btn
              v-if="showMiniPautaPrint == false"
              outline
              color="gray-10"
              size="sm"
              label="Imprimir"
              no-caps
              icon="mdi-cloud-print-outline"
              @click="printMinPautaShow()"
            >
              <!--<q-icon name="mdi-cloud-print-outline" />-->
            </q-btn>
            <q-btn
              v-else
              outline
              color="gray-10"
              size="sm"
              label="Ocultar modo de Impressão"
              no-caps
              icon="mdi-eye-off"
              @click="printMinPautaHide()"
            >
              <!--<q-icon name="mdi-cloud-print-outline" />-->
            </q-btn>
          </div>
        </div>

        <table
          class="table green-border"
          id="dataTable"
          v-if="showMiniPautaPrint == false"
        >
          <thead>
            <tr>
              <th rowspan="2">Nº</th>
              <th rowspan="2" style="width: 200px !important">
                Nome de alunos
              </th>
              <th colspan="4">I Trimestre</th>
              <th colspan="4">II Trimestre</th>
              <th colspan="4">III Trimestres</th>
              <th rowspan="2">MFD</th>
              <th
                rowspan="2"
                v-if="
                  !isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)
                "
              >
                NE
              </th>
              <th
                colspan="3"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                EXAME O/E
              </th>
              <th rowspan="2">NF</th>
            </tr>
            <tr>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT1</th>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT2</th>
              <th>MAC</th>
              <th>NPP</th>
              <th>NPT</th>
              <th>MT3</th>
              <th
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                NEE
              </th>
              <th
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                NEO
              </th>
              <th
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                MEC
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(a, index) in dataMiniPautas" :key="a">
              <td style="text-align: center">{{ index + 1 }}</td>
              <td>{{ a.nome_aluno }}</td>
              <td :style="{ color: getColorMac1() }" style="text-align: center">
                {{ a.nota_mac1 }}
              </td>
              <td :style="{ color: getColorNpp1() }" style="text-align: center">
                {{ a.nota_npp1 }}
              </td>
              <td :style="{ color: getColorNpt1() }" style="text-align: center">
                {{ a.nota_npt1 }}
              </td>
              <td :style="{ color: getColorMt1() }" style="text-align: center">
                {{ a.nota_mt1 }}
              </td>
              <td :style="{ color: getColorMac2() }" style="text-align: center">
                {{ a.nota_mac2 }}
              </td>
              <td :style="{ color: getColorNpp2() }" style="text-align: center">
                {{ a.nota_npp2 }}
              </td>
              <td :style="{ color: getColorMpt2() }" style="text-align: center">
                {{ a.nota_npt2 }}
              </td>
              <td :style="{ color: getColorMt2() }" style="text-align: center">
                {{ a.nota_mt2 }}
              </td>
              <td :style="{ color: getColorMac3() }" style="text-align: center">
                {{ a.nota_mac3 }}
              </td>
              <td :style="{ color: getColorNpp3() }" style="text-align: center">
                {{ a.nota_npp3 }}
              </td>
              <td :style="{ color: getColorNpt3() }" style="text-align: center">
                {{ a.nota_npt3 }}
              </td>
              <td :style="{ color: getColorMt3() }" style="text-align: center">
                {{ a.nota_mt3 }}
              </td>
              <td :style="{ color: getColorMfd() }" style="text-align: center">
                {{ a.nota_mfd }}
              </td>
              <td
                :style="{ color: getColorMfd() }"
                style="text-align: center"
                v-if="
                  !isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)
                "
              >
                {{ a.nota_ne }}
              </td>
              <td
                :style="{ color: getColorNee() }"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                {{ a.nota_nee }}
              </td>
              <td
                :style="{ color: getColorNeo() }"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                {{ a.nota_neo }}
              </td>
              <td
                :style="{ color: getColorMec() }"
                style="text-align: center"
                v-if="isLinguaPortuguesaOrEstrangeira.includes(nome_disciplina)"
              >
                {{ a.nota_mec }}
              </td>
              <td :style="{ color: getColorMf() }" style="text-align: center">
                {{ a.nota_mf }}
              </td>
            </tr>
          </tbody>
        </table>

        <print-mini-pautas
          :loading="showMiniPautaPrint"
          :dataMiniPautas="dataMiniPautas"
          :nome_docente="nome_docente"
          :genero="genero"
          v-else
        />
      </q-card-section>
    </q-card>
    <br />
  </q-page>
</template>
<script>
import { ref, watch, onMounted, computed } from "vue";
import { useMiniPautaStore } from "src/stores/mini-pautas";
import { useDisciplinaStore } from "src/stores/disciplinas";
import { useEscolaStore } from "src/stores/escolas";
import { useClasseStore } from "src/stores/classes";
import { useTurmaStore } from "src/stores/turmas";
import { usePeriodoStore } from "src/stores/periodos";
import printMiniPautas from "./printMini-Pautas.vue";
export default {
  name: "Mini-Pautas-component",
  // configuração do componente
  props: {
    dataMiniPautas: { type: Object, required: true },
    nome_docente: { type: String, required: true },
    genero: { type: String, required: true },
  },
  components: {
    printMiniPautas,
  },

  setup(props) {
    //variaveis
    const { getNotas } = useMiniPautaStore();
    const { getDisciplinaById } = useDisciplinaStore();
    const { getEscolaById } = useEscolaStore();
    const { getClasseById } = useClasseStore();
    const { getTurmaById } = useTurmaStore();
    const { getPeriodoById } = usePeriodoStore();
    const nome_disciplina = ref("");
    const nivel_ensino = ref("");
    const anoLectivo = ref("");
    const nome_escola = ref("");
    const classe = ref("");
    const turma = ref("");
    const periodo = ref("");
    const joinedData = ref([]);
    const notasMiniPauta = ref([]);
    const showMiniPautaPrint = ref(false);
    const isLinguaPortuguesaOrEstrangeira = [
      "Língua Portuguesa",
      "L. Portuguesa",
      "Língua Estrangeira",
      "L. Estrangeira",
      "Inglês",
      "Ingles",
      "Francês",
      "Frances",
    ];

    onMounted(async () => {
      console.log(props.dataMiniPautas);
      anoLectivo.value = props.dataMiniPautas[0].ano_lectivo;
      await getDisciplinaById(props.dataMiniPautas[0].disciplinaid).then(
        (item) => {
          nome_disciplina.value = item.nome_disciplina;
        }
      );
      await getEscolaById(props.dataMiniPautas[0].escolaid).then((item) => {
        nome_escola.value = item[0].name;
        nivel_ensino.value = item[0].nivel_ensino;
      });

      await getClasseById(props.dataMiniPautas[0].classeid).then((item) => {
        console.log(item);
        classe.value = item.nome_classe;
      });

      await getTurmaById(props.dataMiniPautas[0].turmaid).then((item) => {
        turma.value = item.nome_turma;
      });

      await getPeriodoById(props.dataMiniPautas[0].periodoid).then((item) => {
        periodo.value = item.nome_periodo;
      });
    });

    const printMinPautaShow = () => {
      showMiniPautaPrint.value = true;
    };
    const printMinPautaHide = () => {
      showMiniPautaPrint.value = false;
    };
    //Busca dados da mini-pauta
    /*
    const createMap = (array, key) => {
      const map = new Map();
      if (array) {
        array.forEach((item) => {
          if (item.alunos && item.alunos.nome) {
            map.set(item.alunos.nome, { ...item });
          }
        });
      }
      return map;
    };



    const mapMac1 = createMap(props.dataMiniPautas.dataMac1, "nome");
    const mapMac2 = createMap(props.dataMiniPautas.dataMac2, "nome");
    const mapMac3 = createMap(props.dataMiniPautas.dataMac3, "nome");
    const mapMec = createMap(props.dataMiniPautas.dataMec, "nome");
    const mapMfd = createMap(props.dataMiniPautas.dataMfd, "nome");
    const mapMt1 = createMap(props.dataMiniPautas.dataMt1, "nome");
    const mapMt2 = createMap(props.dataMiniPautas.dataMt2, "nome");
    const mapMt3 = createMap(props.dataMiniPautas.dataMt3, "nome");
    const mapNee = createMap(props.dataMiniPautas.dataNee, "nome");
    const mapNeo = createMap(props.dataMiniPautas.dataNeo, "nome");
    const mapNpp1 = createMap(props.dataMiniPautas.dataNpp1, "nome");
    const mapNpp2 = createMap(props.dataMiniPautas.dataNpp2, "nome");
    const mapNpp3 = createMap(props.dataMiniPautas.dataNpp3, "nome");
    const mapNpt1 = createMap(props.dataMiniPautas.dataNpt1, "nome");
    const mapNpt2 = createMap(props.dataMiniPautas.dataNpt2, "nome");
    const mapNpt3 = createMap(props.dataMiniPautas.dataNpt3, "nome");
    const mapNe = createMap(props.dataMiniPautas.dataNe, "nome");
    const mapMf = createMap(props.dataMiniPautas.dataMf, "nome");

    const allMaps = ref([
      mapMac1,
      mapMac2,
      mapMac3,
      mapMec,
      mapMfd,
      mapMt1,
      mapMt2,
      mapMt3,
      mapNee,
      mapNeo,
      mapNpp1,
      mapNpp2,
      mapNpp3,
      mapNpt1,
      mapNpt2,
      mapNpt3,
      mapNe,
      mapMf,
    ]);

    allMaps.value.forEach((map) => {
      map.forEach((dataItem, name) => {
        let existing = joinedData.value.find((item) => item.nome === name);
        if (!existing) {
          existing = { nome: name };
          joinedData.value.push(existing);
          console.log(joinedData.value);
        }
        Object.assign(existing, dataItem);
      });
    });

    */

    //atribuir cor ao valor da coluna MAC1

    const corValor = (props) => {
      const value = props.row[props.col.field];
      const isNomeOrOrdemOrGenero = ["nome", "order", "genero"].includes(
        props.col.name
      );
      const isMTColumn = props.col.name.endsWith("_MT"); // Verifica se a coluna termina com '_MT'

      if (curso.value === "Ensino primário") {
        // Se for Ensino Primário
        if (isMTColumn) {
          return "color: red"; // Vermelho para colunas que terminam com '_MT'
        }
        return isNomeOrOrdemOrGenero ? "color: black" : "color: blue"; // Preto para nome, ordem e gênero; azul para outras
      } else {
        // Se não for Ensino Primário
        if (isNomeOrOrdemOrGenero) {
          return "color: black"; // Preto para nome, ordem e gênero
        }
        // Define cor com base no valor
        return value >= 10 ? "color: blue" : "color: red"; // Azul para >= 10, vermelho para < 10
      }
    };

    const getColorMac1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mac1 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mac1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPP1
    const getColorNpp1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npp1 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npp1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPT1
    const getColorNpt1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npt1 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npt1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MT1
    const getColorMt1 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mt1 != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mt1 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MAC2
    const getColorMac2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mac2 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mac2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPP2
    const getColorNpp2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npp2 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npp2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPT2
    const getColorMpt2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npt2 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npt2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MT2
    const getColorMt2 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mt2 != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mt2 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MAC3
    const getColorMac3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mac3 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mac3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPP3
    const getColorNpp3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npp3 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npp3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NPT3
    const getColorNpt3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.npt3 != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.npt3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MT3
    const getColorMt3 = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mt3 != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mt3 <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MFD
    const getColorMfd = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mfd != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mfd <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NEE
    const getColorNee = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.nee != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.nee <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NEO
    const getColorNeo = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.neo != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.neo <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna MEC
    const getColorMec = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mec != ""
      ) {
        return "blue";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mec <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //atribuir cor ao valor da coluna NF
    const getColorMf = () => {
      if (
        nivel_ensino.value == "Ensino primário" &&
        joinedData.value.mf != ""
      ) {
        return "red";
      }
      if (
        nivel_ensino.value == "Ensino secundario" &&
        joinedData.value.mf <= 9.44
      ) {
        return "red";
      } else {
        return "blue";
      }
    };

    //===================================================================================================================
    return {
      isLinguaPortuguesaOrEstrangeira,
      nome_disciplina,
      nivel_ensino,
      nome_escola,
      /*joinedData,*/
      getColorMac1,
      getColorNpp1,
      getColorNpt1,
      getColorMt1,
      getColorMac2,
      getColorNpp2,
      getColorMpt2,
      getColorMt2,
      getColorMac3,
      getColorNpp3,
      getColorNpt3,
      getColorMt3,
      getColorMfd,
      getColorNee,
      getColorNeo,
      getColorMec,
      getColorMf,
      notasMiniPauta,
      anoLectivo,
      classe,
      turma,
      periodo,
      showMiniPautaPrint,
      printMinPautaShow,
      printMinPautaHide,
    };
  },
};
</script>
<style scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.table.green-border th,
.table.green-border td {
  min-width: 100px; /* Ajuste a largura conforme necessário */
  white-space: nowrap;
}

.table.green-border {
  width: 100%;
  table-layout: fixed;
}

.table {
  margin: 0 auto;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #106603;
  padding: 0px;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.table input[type="number"] {
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
}

.table input[type="number"] {
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>
