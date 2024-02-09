<script setup>
import { ref } from 'vue';

const nestedRouteItems = ref([
    {
        label: 'Mercado Livre',
        to: '/integration/marketplace'

    },
    {
        label: 'Shopee',
        to: '/integration/marketplace/shopee'
    }
]);

</script>

<template>
    <div>
        <div class = "card card w-title">
            <h5>Integração - Market Place</h5>
            <p>Adicione as suas contas</p>
            <TabMenu :model="nestedRouteItems" />
            <router-view />
        </div>
    </div>
</template>
