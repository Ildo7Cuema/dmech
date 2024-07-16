<template>
  <div class="dashboard">
    <div class="cards">
      <div class="card">
        <h3>Card 1</h3>
        <p>Conteúdo do Card 1</p>
      </div>
      <div class="card">
        <h3>Card 2</h3>
        <p>Conteúdo do Card 2</p>
      </div>
      <div class="card">
        <h3>Card 3</h3>
        <p>Conteúdo do Card 3</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      // Initialize the charts
    });

    return {};
  },
};
</script>

<style>
.dashboard {
  display: flex;
  justify-content: space-between;
}

.cards {
  display: flex;
  gap: 20px;
}

.card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.charts {
  display: flex;
  gap: 20px;
}

.chart {
  flex-grow: 1;
}
</style>
