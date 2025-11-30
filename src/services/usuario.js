import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

const api = axios.create({
    baseURL: API_URL
});

export async function salvarUsuario(usuario) {
    const response = await api.post("/salvar", usuario);
    return response.data;
}

export async function buscarUsuario(id) {
    const response = await api.get(`/buscar/${id}`);
    return response.data;
}

export async function atualizarUsuario(id, dados) {
    console.log("Atualizando usuário:", id);
    console.log("Payload:", dados);

    const response = await api.put(`/atualizar/${id}`, dados);
    return response.data;
}
