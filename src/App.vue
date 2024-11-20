<template>
  <v-app>
    <v-toolbar density="compact">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <RouterLink to="/"> Pet-Shop </RouterLink>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu transition="scale-transition">
        <template v-slot:activator="{props}">
          <v-btn icon v-bind="props">
            <v-badge contenet="6" color="red-darken-2" size="x-small">
              <v-icon icon="mdi-bell" color="blue-darken-4"></v-icon>
            </v-badge>
          </v-btn>
        </template>
      </v-menu>

      <v-btn variant="outlined" to="/" size="small" text="Home" class="ma-m2"></v-btn>
      <v-btn v-if="!authStore.authUser" variant="outlined" to="/login" size="small" text="Login" class="ma-m2"></v-btn>
      <v-btn v-if="!authStore.authUser" variant="outlined" to="/register" size="small" text="Login" class="ma-m2"></v-btn>
      <v-btn v-if="!authStore.authUser" variant="outlined" size="small" text="Logout" class="ma-m2" @click="logout"></v-btn>
      <v-btn v-if="!authStore.authUser" variant="outlined" to="/profile" size="small" text="Perfi" class="ma-m2"></v-btn>
    </v-toolbar>

    <v-main> 
      <v-fade-transition>
        <RouterView />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import {onMounted,ref} from "vue";
  import {RouterView} from "vue-router";
  import {useTheme} from "vuetify";
  import { useAuthStore } from "./services/Users/auth";
  import router from "./router";
  const authStore = useAuthStore();

  const darkTheme = ref(true);
  const theme = useTheme();

  function changeTheme(){
    darkTheme.value = ! darkTheme.value;
    theme.global.name.value = darkTheme.value ? "dark" : "light";
  }

  const logout = ()=>{
    authStore.authUser= null;
    authStore.username= null;
    authStore.password= null;
    router.push('/');
  }

</script>


<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
