<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import MercadoLivreService from '@/service/integration/MercadoLivreService';
import { useConfirm } from "primevue/useconfirm";

const mercadoLivreService = new MercadoLivreService();
const toast = useToast();
const confirm = useConfirm();

const loading = ref(false);
const accounts = ref([]);
const message = ref([]);
const count = ref(0);

onBeforeMount(() => {
    //initFilters();
});
onMounted(() => {
    try {
        checkQueryParam();
        const response = mercadoLivreService.getAccounts();
        accounts = response.data;
    } catch (e) {
        addErrorMsg();
        console.log(e);
    }
});

const addErrorMsg = () => {
    message.value = [{ severity: 'error', detail: 'Error Message', content: 'Algo deu errado!! Tente novamente. Caso erro persistir, entre em contato.', id: count.value++ }];
};

const checkQueryParam = () => {
    const msgType = useRouter().currentRoute.value.query.ret;
    const msg = useRouter().currentRoute.value.query.msg;
    if (msgType === 'success') {
        message.value = [{ severity: 'success', detail: 'Success Message', content: 'Conta adicionada', id: count.value++ }];
    } else if (msgType === 'error') {
        message.value = [{ severity: 'error', detail: 'Error Message', content: `Erro ao adicionar a conta. Detalhe [${msg}]`, id: count.value++ }];
    }
};

const addAccount = () => {

    confirm.require({
        message: 'Você será redirecionado para o site do Mercado Livre, Ok?',
        header: 'Confirmação',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptLabel: 'Ok',
        rejectLabel: 'Cancelar',
        accept: () => {
            try {
                const response = mercadoLivreService.getMercadoLivreSingleSignOnSetup();
                const appId = response.data.appId;
                const redirectUrl = response.data.redirectUrl;
                const urlMercadoLivre = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${appId}&redirect_uri=${redirectUrl}`;
                window.location.href = urlMercadoLivre;
            } catch (e) {
                addErrorMsg();
                console.log(e);
            }
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Adicionar Conta', detail: 'Operação cancelada', life: 5000 });
        }
    });


    
};
</script>
<template>
    <transition-group name="p-message" tag="div">
        <Message v-for="msg of message" :severity="msg.severity" :key="msg.content">{{ msg.content }}</Message>
    </transition-group>
    <DataTable :value="accounts" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading" responsiveLayout="scroll">
        <template #header>
            <div class="text-right">
                <Toast />
                <ConfirmDialog></ConfirmDialog>
                <Button type="button" icon="pi pi-plus" label="Adicionar Conta" class="p-button-outlined right" @click="addAccount()" />
            </div>
        </template>
        <template #empty> Nenhuma conta encontrada. </template>
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
</template>
