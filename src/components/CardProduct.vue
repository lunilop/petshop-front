<template>
    <div>
        <v-row>
            <v-col cpls="3" md="4">
                <v-card
                    :subtitle="product.quantity"
                    :text="product.description"
                    :title="product.name"
                >
                    <v-img
                        height="200"
                        :src="product.image"
                        cover
                    ></v-img>
                </v-card>
                <div class="text-center text-caption">Using Props Only</div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue';
    defineProps(['product']);
</script>