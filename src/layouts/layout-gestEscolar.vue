<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-3">
    <q-header class="bg-grey-3 text-grey-9" reveal height-hint="60">
      <q-toolbar class="GPLAY__toolbar text-grey-6">
        <q-btn
          v-if="$q.platform.is.mobile || !leftDrawerOpen"
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <div class="q-pr-lg" v-if="$q.screen.gt.xs">
          <img class="GPLAY__logo" src="../../public/ensigna.png" />
          <span class="log-text text-bold">DME - Escola</span>
        </div>

        <q-space />

        <div class="GPLAY__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Procurar"
            class="bg-white col"
          />
          <q-btn
            class="GPLAY__toolbar-input-btn"
            color="primary"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-pl-md q-gutter-sm row no-wrap items-center">
          <q-btn round dense flat color="grey-8" size="14px" icon="apps">
            <q-tooltip>Menu Serviço</q-tooltip>
          </q-btn>

          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notificações</q-tooltip>
          </q-btn>

          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Conta</q-tooltip>
          </q-btn>

          <q-btn round flat @click="logoutUser">
            <q-avatar size="26px">
              <q-icon name="mdi-logout" />
            </q-avatar>
            <q-tooltip>Sair</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-3 text-grey-7"
      :width="200"
    >
      <q-list>
        <q-item
          clickable
          class="GPLAY__drawer-link bg-grey-10 text-grey-3"
          :to="{ name: 'homeEscola' }"
        >
          <q-item-section avatar class="text-grey-1">
            <q-icon name="mdi-school" />
          </q-item-section>
          <q-item-section class="text-grey-3">
            <q-item-label>Minha escola</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--movies"
          @click="handleCurso()"
        >
          <q-item-section
            avatar
            class="movies-icon bg-red-6 text-grey-1 text-center"
          >
            <q-icon name="school" />
          </q-item-section>
          <q-item-section class="movies-text">
            <q-item-label> Cursos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--books"
          @click="handleTurma()"
        >
          <q-item-section
            avatar
            class="books-icon bg-red-6 text-grey-1 text-center"
          >
            <q-icon name="mdi-google-classroom" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label> Turmas</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--books"
          @click="handlePeriodo()"
        >
          <q-item-section
            avatar
            class="books-icon bg-red-6 text-grey-1 text-center"
          >
            <q-icon name="mdi-clock-outline" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Período</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--books"
          @click="handleClasses()"
        >
          <q-item-section
            avatar
            class="books-icon bg-red-6 text-grey-1 text-center"
          >
            <q-icon name="mdi-chart-line" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Classes</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--books"
          @click="hendleDisciplina()"
        >
          <q-item-section
            avatar
            class="books-icon bg-red-6 text-grey-1 text-center"
          >
            <q-icon name="book" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Disciplinas</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--apps"
          @click="handleAlunos()"
        >
          <q-item-section avatar class="bg-green-7 text-grey-1 text-center">
            <q-icon name="mdi-account-group" />
          </q-item-section>
          <q-item-section class="apps-text">
            <q-item-label>Alunos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="GPLAY__drawer-link GPLAY__drawer-link--books">
          <q-item-section
            avatar
            class="books-icon bg-blue-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-numeric-9-plus-box" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Notas</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="GPLAY__drawer-link GPLAY__drawer-link--books">
          <q-item-section
            avatar
            class="books-icon bg-blue-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-microsoft-excel" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Mini-pautas</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="GPLAY__drawer-link GPLAY__drawer-link--books">
          <q-item-section
            avatar
            class="books-icon bg-blue-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-microsoft-excel" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Pautas</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="GPLAY__drawer-link GPLAY__drawer-link--books">
          <q-item-section
            avatar
            class="books-icon bg-blue-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-file-table-outline" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Termos de frequência</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="GPLAY__drawer-link GPLAY__drawer-link--books">
          <q-item-section
            avatar
            class="books-icon bg-blue-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-certificate" />
          </q-item-section>
          <q-item-section class="books-text">
            <q-item-label>Certificados</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable class="GPLAY__drawer-link GPLAY__drawer-link--music">
          <q-item-section
            avatar
            class="music-icon bg-orange-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-account-tie" />
          </q-item-section>
          <q-item-section class="music-text">
            <q-item-label>Professores</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          class="GPLAY__drawer-link GPLAY__drawer-link--devices"
        >
          <q-item-section
            avatar
            class="music-icon bg-blue-grey-7 text-grey-1 text-center"
          >
            <q-icon name="mdi-chart-line" />
          </q-item-section>
          <q-item-section class="music-text">
            <q-item-label>Estatística</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mb-md" />

        <q-item
          v-for="link in links1"
          :key="link.text"
          v-ripple
          dense
          clickable
          class="GPLAY__drawer-item"
        >
          <q-item-section class="text-grey-8">
            <q-item-label
              ><q-icon :name="link.icon" /> {{ link.text }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <q-page-sticky expand position="top">
        <q-toolbar class="GPLAY__sticky bg-white q-px-xl">
          <q-space />
          <q-btn
            icon="help"
            dense
            flat
            size="12px"
            class="GPLAY__sticky-help"
          />
          <q-btn
            icon="settings"
            dense
            flat
            class="GPLAY__sticky-settings q-ml-md"
            size="12px"
          />
        </q-toolbar>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import userAuthUser from "src/composible/userAuthUser";
import { useQuasar, Dialog } from "quasar";

export default {
  name: "GooglePlayLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);
    const router = useRouter();
    const { logout } = userAuthUser();

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    const handleAlunos = () => {
      router.push({ name: "pageAlunos" });
    };

    const handleCurso = () => {
      router.push({ name: "pageCurso" });
    };

    const handleTurma = () => {
      router.push({ name: "pageTurma" });
    };

    const handlePeriodo = () => {
      router.push({ name: "pagePeriodo" });
    };

    const hendleDisciplina = () => {
      router.push({ name: "pageDisciplina" });
    };

    const handleClasses = () => {
      router.push({ name: "pageClasse" });
    };

    const logoutUser = async () => {
      await Dialog.create({
        title: "Sair",
        message: "Tens a certeza que pretendes terminar a sessão?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          try {
            await logout();
            router.push({ name: "loginPage" });
          } catch (error) {
            console.log(error);
          }
        })
        .onCancel(() => {
          console.log("Voce cancelou");
        });
    };

    return {
      handleAlunos,
      handleCurso,
      leftDrawerOpen,
      search,
      storage,
      handleTurma,
      logoutUser,
      handlePeriodo,
      hendleDisciplina,
      handleClasses,

      links1: [
        { text: "Minha conta", icon: "mdi-account" },
        { text: "Comparticipação", icon: "mdi-cart-variant" },
      ],

      toggleLeftDrawer,
    };
  },
};
</script>

<style lang="sass">
.GPLAY

  &__toolbar
    height: 60px

  &__logo
    width: 75px
    height: 39px

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    max-width: 60px
    width: 100%

  &__drawer-link

    .q-item__section--avatar
      margin: -8px 0 -8px -16px
      padding: 8px 0 8px 16px
  .log-text
    margin-left: 10px
    font-size: 18px
    font-weight: 500



    .q-item__section--main
      margin: -8px -16px -8px 16px
      padding: 8px 16px 8px 2px
      font-size: 18px
      font-weight: 300

    &--apps, &--movies, &--music, &--books, &--devices
      background: #f5f5f5!important
      &:hover
        color: #eee !important

    &--apps:hover
      background: #43a047!important

    &--movies:hover
      background: #e53935!important

    &--music:hover
      background: #fb8c00!important

    &--books:hover
      background: #1e88e5!important

    &--devices:hover
      background: #546e7a!important

  &__drawer-item
    padding: 6px 12px 6px 23px

  &__sticky
    min-height: 49px
    border-bottom: 1px solid rgba(0,0,0,0.12)

  &__sticky-help
    border: 1px solid #ccc
    padding-left: 8px
    padding-right: 8px

  &__sticky-settings
    padding-left: 17px
    padding-right: 17px
    border: 1px solid #ccc
</style>
