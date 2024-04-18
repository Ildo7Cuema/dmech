<template>
  <div class="row q-col-gutter-sm">
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
      <q-card>
        <q-card-section>
          <div id="chart"></div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
      <q-card>
        <q-card-section class="flex felx-center">
          <div id="chart2"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { ref, onMounted } from "vue";
import userSupabase from "boot/supabase";
import userAuthUser from "src/composible/userAuthUser";

export default {
  setup() {
    const { supabase } = userSupabase();
    const chartData = ref([]);
    const { user } = userAuthUser();
    const chartDataPizza = ref([]);
    const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

    onMounted(() => {
      fetchEmployeeData();
      fetchEmployeeDataPizza();
    });
    //Grafico de barra ou coluna
    const fetchEmployeeData = async () => {
      try {
        const { data, error } = await supabase
          .from("funcionarios")
          .select("nivelAcademico")
          .eq("user_id", user.value.id);

        if (error) {
          throw error;
        }

        const academicLevels = [
          "Técnico Básico",
          "Técnico Médio",
          "Licenciado(a)",
          "Mestre",
          "PhD",
        ];
        const academicLevelCounts = new Array(academicLevels.length).fill(0);

        data.forEach((employee) => {
          const index = academicLevels.indexOf(employee.nivelAcademico);
          if (index !== -1) {
            academicLevelCounts[index]++;
          }
        });

        chartData.value = academicLevelCounts;
        renderChart();
      } catch (error) {
        console.error("Erro ao buscar dados dos funcionários:", error.message);
      }
    };

    const renderChart = () => {
      const options = {
        series: [
          {
            data: chartData.value,
          },
        ],
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "Técnicos Básicos",
            "Técnicos Médios",
            "Licenciados",
            "Mestres",
            "PhD",
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: "12px",
            },
          },
        },
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    };

    //graafico de pizza
    const fetchEmployeeDataPizza = async () => {
      try {
        const { data, error } = await supabase
          .from("funcionarios")
          .select("genero")
          .eq("user_id", user.value.id);

        if (error) {
          throw error;
        }

        let masculinoCount = 0;
        let femininoCount = 0;

        data.forEach((employee) => {
          if (employee.genero === "Masculino") {
            masculinoCount++;
          } else if (employee.genero === "Feminino") {
            femininoCount++;
          }
        });

        chartDataPizza.value = [masculinoCount, femininoCount];
        renderChartPizza();
      } catch (error) {
        console.error("Erro ao buscar dados dos funcionários:", error.message);
      }
    };

    const renderChartPizza = () => {
      const options = {
        series: chartDataPizza.value,
        chart: {
          type: "donut",
          height: 200,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        labels: ["Masculino", "Feminino"],
        colors: colors,
      };

      const chart = new ApexCharts(document.querySelector("#chart2"), options);
      chart.render();
    };

    return {
      chartData,
      chartDataPizza,
    };
  },
};
</script>
