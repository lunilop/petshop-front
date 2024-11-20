import { defineStore } from "pinia";
import axios from "axios";
import { urlApiServer } from "@/helpers/constApi";
import { ref } from "vue";

export const useAuthStore = defineStore("auth",()=>{
    const authUser = ref(null)        // mantiene nuestro token
    const username = ref()
    const password = ref()
    const user = ()=>{
        return authUser.value
    }

    const getUser = async ()=>{
        const params = {
            "username": username.value,
            "password": password.value
        }
        const res = await axios.post(`${urlApiServer}/auth/login`,params)  
        authUser.value = res.data.access_token
    }
    return {getUser, user, authUser, username, password}
})