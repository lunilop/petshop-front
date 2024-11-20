<template>
    <div class="about">
        <h1>Profile</h1>
        <div v-if="user !=null">
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.role }}</p>
            <p>Name: {{ user.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { urlApiServer } from '@/helpers/constApi';
    import { onMounted, onUpdated, ref } from 'vue';
    import { useAuthStore } from '@/services/Users/auth';
    import { useRouter } from 'vue-router';

    const router = useRouter();     // para la redireccion 
    const user = ref(null);
    const authStore = useAuthStore();

    onMounted(async()=>{
        if(!authStore.authUser) router.push('/')        // si no existe me redirecciona al home
        const params = {
            headers:{
                'Authorization':'Bearer'+authStore.authUser
            }
        }
        const res= await axios.get(`${urlApiServer}/auth/authenticated_user`, params)
        user.value = res.data
    })
    onUpdated(()=>{
        if(!authStore.authUser) router.push('/') 
    })
</script>