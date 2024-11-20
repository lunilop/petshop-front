<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Registrarse</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submit">
                <v-text-field
                  v-model="username.value.value"
                  :error-messages="username.errorMessages.value"
                  label="Username"
                ></v-text-field>
                <v-text-field
                  v-model="email.value.value"
                  :error-messages="email.errorMessages.value"
                  label="E-mail"
                ></v-text-field>
                <v-select
                  v-model="selectRole.value.value"
                  :error-messages="selectRole.errorMessages.value"
                  :items="items"
                  label="Select"
                ></v-select>
                <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessages.value"
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-btn type="submit" color="primary">Registrarse</v-btn>
                <v-btn @click="handleReset" color="primary">Clear</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script setup>
  import { ref } from 'vue';
  import {userField, useForm, useField} from 'vee-validate';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import {useAuthStore} from "@/services/Users/auth"
  import { urlApiServer } from '@/helpers/constApi';

  const router = useRouter();
  const {handleSubmit, handleReset} = useForm({
    validationSchema:{    //objeto donde van todos los campos que quiero validar
      username(value){
        if(value?.lenght >=2)return true
        return 'Username needs to be at least 2 characters.'
      },
      // image(value){
      //   if(value)return true
      //   return 'The image is requireds.'
      // }
      email(value){
        const pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;      
        return pattern.test(value) || "Invalid e-mail.";
      },
      selectRole(value){
        if(value)return true
        return 'Select an item.'
      },
      password(value){
        if(value)return true
        return 'The password is required.'
      }
    }
  })

  const username =useField('username')
  const email =useField('email')
  const selectRole =useField('selectRole')
  const password =useField('password')
  
  const items = ref([
    'customer',
    'employee',
  ])

  const submit = handleSubmit(async(values) =>{
    const params={
      "username": username.value.value,
      "email": email.value.value,
      "image": "string",
      "role": selectRole.value.value,
      "password": password.value.value,
    }
    const resultRegister= await axios.post(`${urlApiServer}/api/Users/`, params)
    if(resultRegister.status ==200){
      router.push('/login')
    }else{
      alert('error User')
    }
  })

</script>
  