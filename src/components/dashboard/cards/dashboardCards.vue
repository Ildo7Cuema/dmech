<template>
  <q-card class="my-card">
    <q-card-section horizontal class="flex justify-center items-center q-mb-lg">
      <q-card-actions vertical class="justify-around q-px-md">
        <q-btn class="col-6 q-ma-md text-h6" :color="colorIcon" :icon="icon" />
      </q-card-actions>
      <q-space />
      <q-card-actions vertical class="justify-around items-center">
        <q-btn
          dense
          flat
          round
          class="col-6 text-right q-ma-md text-h6"
          :label="total"
        />
      </q-card-actions>
    </q-card-section>
    <br />
    <div
      class="absolute-bottom text-subtitle2 text-center q-mt-md q-pa-sm flex justify-center bg-grey-2"
    >
      {{ titulo }}
    </div>
  </q-card>
</template>

<script>
export default {
  name: "dashboardCads",
  props: {
    tabela: {
      type: String,
      require: true,
    },
    titulo: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
    colorIcon: {
      type: String,
      require: false,
    },
    total: {
      type: Number,
      require: true,
    },
  },

  setup(props) {},
};
</script>

<style scoped>
.my-card {
  /* Adjust card styles if needed */
}

/* Centering the card section horizontally and vertically */
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}
</style>
