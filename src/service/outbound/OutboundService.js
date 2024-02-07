import axios from "axios";

export default class OutboundService {
    getAccounts() {
        return axios.get('/mercadoLivre/accounts')
    }
    getMercadoLivreSingleSignOnSetup() {
        return axios.get('/mercadoLivre/setup')
    }

}
