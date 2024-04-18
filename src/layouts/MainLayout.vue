<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header for mobile -->
    <q-header bordered class="bg-primary-3 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar
            color="white"
            text-color="brown-5"
            icon="mdi-school-outline"
          />
          <span v-if="brand.name">
            <span class="q-ml-sm">{{ brand.name }}</span></span
          >
          <span v-else> <span class="q-ml-sm">D.M.E</span></span>
        </q-toolbar-title>
        <q-space />
        <darkmode-change />
        <q-btn
          dense
          flat
          class="q-ml-sm"
          icon="mdi-power"
          @click="logoutPage"
        />
      </q-toolbar>
    </q-header>

    <!-- Header for Desktop -->
    <q-header elevated v-if="$q.platform.is.desktop">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <span v-if="brand.name">{{ brand.name }}</span>
          <span v-else>D.M.E</span>
        </q-toolbar-title>

        <darkmode-change />
        <q-btn-dropdown
          flat
          icon="person"
          :label="user.user_metadata.name"
          v-if="user && $q.platform.is.desktop"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label
                  ><q-avatar icon="mdi-lock-open-plus" /> Permisão
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="formConfig">
              <q-item-section>
                <q-item-label
                  ><q-avatar icon="mdi-cog" /> Configurações</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logoutPage">
              <q-item-section>
                <q-item-label><q-avatar icon="mdi-logout" />Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer com tabs para os mobile -->
    <q-footer
      bordered
      class="bg-grey-3 text-primary"
      v-if="$q.platform.is.mobile"
    >
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-primary-8"
        v-model="tab"
        narrow-indicator
        align="justify"
        dense
      >
        <q-route-tab
          name="home"
          label="Home"
          icon="mdi-home"
          :to="{ name: 'admin' }"
        />

        <q-route-tab
          name="services"
          label="Cadastros"
          icon="mdi-database-cog-outline"
          :to="{ name: 'services-page' }"
        />

        <q-route-tab
          name="services"
          label="serviços"
          icon="mdi-widgets"
          :to="{ name: 'page-service' }"
        />

        <q-route-tab
          name="config"
          label="Configurações"
          icon="mdi-cog"
          :to="{ name: 'form-config' }"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import userAuthUser from "src/composible/userAuthUser";
import { useQuasar, Loading } from "quasar";
import { useRouter } from "vue-router";
import { links } from "./links.js";
import useApi from "src/composible/userApi";
import darkmodeChange from "src/components/darkMode/darkMode.vue";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    darkmodeChange,
  },

  setup() {
    const { getBrand, brand } = useApi();
    const leftDrawerOpen = ref(false);
    const { logout, user } = userAuthUser();
    const $q = useQuasar();
    const tab = ref("home");
    const router = useRouter();

    onMounted(() => {
      getBrand();
    });

    const formConfig = () => {
      router.push({ name: "form-config" });
    };

    const logoutPage = async () => {
      try {
        $q.dialog({
          title: "SAIR",
          message: "Você realmente deseja saír?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          Loading.show({ message: "Sair da aplicação ..." });
          await logout().finally(() => Loading.hide());
          router.replace({ path: "/login" });
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        Loading.hide();
      }
    };

    return {
      logout,
      logoutPage,
      user,
      tab,
      essentialLinks: links,
      leftDrawerOpen,
      brand,
      formConfig,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
