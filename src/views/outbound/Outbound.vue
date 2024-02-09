<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Divider from 'primevue/divider';
import Sidebar from 'primevue/sidebar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const visibleLeftFilters = ref(false);
</script>

<template>
    <div className="card">
        <h5>Expedição</h5>
        <transition-group name="p-message" tag="div">
            <Message v-for="msg of message" :severity="msg.severity" :key="msg.content">{{ msg.content }}</Message>
        </transition-group>
        <div class="text-right">
            <Button type="button" icon="pi pi-plus-circle" label="Criar Plano" class="p-button-outlined mr-2 mb-2" @click="toggleFilters" />
            <Button type="button" icon="pi pi-filter" label="Filtros" class="p-button-outlined mr-2 mb-2" @click="visibleLeftFilters = true" />
            <Sidebar v-model:visible="visibleLeftFilters" position="right" class="w-full md:w-20rem lg:w-30rem">
                <h3>Filtros</h3>
            </Sidebar>
        </div>
        <DataTable :value="accounts" :size="small" stripedRows showGridlines :rows="10" dataKey="id" :rowHover="true" :loading="loading" responsiveLayout="scroll">
            <template #empty> Nenhuma expedição encontrada. </template>
            <template #loading> Carregado... </template>
            <Column field="id" header="ID" style="min-width: 12rem"></Column>
            <Column field="sellerId" header="Código do Vendedor" style="min-width: 12rem"></Column>
            <Column field="insertId" header="Criado Por" style="min-width: 12rem"></Column>
            <Column field="insertDate" header="Criado Em" style="min-width: 12rem"></Column>

            <Column headerStyle="min-width:5rem;">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteAccount(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Divider align="left" type="solid"> <b>Detalhe da Expedição </b>(selecione uma linha acima) </Divider>
    </div>
</template>
