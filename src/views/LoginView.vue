<template>
    <v-container fluid>
      <v-overlay :model-value="isLoading" class="align-center justify-center">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="white"
        ></v-progress-circular>
      </v-overlay>
      <v-row justify="center">
        <v-col md="4">
          <v-card class="pa-4">
            <v-card-title>Login</v-card-title>
            <v-card-item>
              <v-form @submit.prevent="submit">
                <v-text-field
                  prepend-inner-icon="mdi-email"
                  :rules="[rules.required]"
                  v-model="form.username"   
                  label="Username"
                ></v-text-field>
                
                <v-text-field
                  type="password"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-key"
                  v-model="form.password"
                  label="Password"
                ></v-text-field>

                <v-btn type="submit" color="red-darken-1"
                  block class="mt-2" variant="elevated">
                  Iniciar Sesión
                </v-btn>
              </v-form>
            </v-card-item>

            <v-card-actions>
              <div class="mx-4">
                <v-btn block to="/register"> Register</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {useAuthStore} from "@/services/Users/auth"

  const authStore = useAuthStore();
  const router = useRouter();
  
  const form = ref({
    username: "",
    password: "",
    remember: false,
  })

  const isLoading = ref(false);
  
  const submit = () => {
    
    if(form.value.username === ""){
      return;
    }
    isLoading.value = true;
    authStore.username = form.value.username;
    authStore.password = form.value.password;
    authStore.getUser();
    isLoading.value = false
    router.push('/')
  }
  
  const rules = {
    required: (value: any)=> !!value || "Required.",
    email: (value: any) => {
      const pattern=
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      ///^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\))
      return pattern.test(value) || "Invalid e-mail.";
    }
  }

  </script>