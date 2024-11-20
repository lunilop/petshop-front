<template>
  <div class="home">
    <!-- <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="pa-6">
            <v-card-title>Bienvenido a Pet-Shop</v-card-title>
            <v-card-text>
              Explora los mejores productos para tus mascotas.
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" to="/login">Iniciar Sesión</v-btn>
              <v-btn color="secondary" to="/register">Registrarse</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>

    <CardProduct v-for="(product,index) in products" :key="index" :product="product"> </CardProduct>
  </div>
</template>

<script setup lang="ts">
  import CardProduct from '@/components/CardProduct.vue';
  import axios from 'axios';
  import {useAuthStore} from "@/services/Users/auth"
  import { urlApiServer } from '@/helpers/constApi';
  import { onMounted, computed, onUpdated, ref } from 'vue';

  const authStore= useAuthStore();
  const products= ref([])
  const items= ref([])

  onMounted(async()=>{
    if(authStore.authUser != null){
      const res= await axios.get(`${urlApiServer}/api/products/`, authStore.authUser)
      products.value = res.data
      console.log(products.value)
    }
  })
  onUpdated(async()=>{
    if(authStore.authUser != null){
      const res= await axios.get(`${urlApiServer}/api/products/`, authStore.authUser)
      products.value = res.data
    }
  })

</script>

<style scoped>
.home {
  text-align: center;
}
</style>
