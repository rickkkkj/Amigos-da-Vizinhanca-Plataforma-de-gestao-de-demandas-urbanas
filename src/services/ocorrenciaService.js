import axios from "axios";

const API_URL = "http://localhost:8080/api/ocorrencias";

export const listarTodas = async () => {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data;
};

export const listarPorUsuario = async (usuarioId) => {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return response.data;
};

export const atualizarStatus = async (id, novoStatus) => {
    const response = await axios.put(`${API_URL}/status/${id}?status=${novoStatus}`);
    return response.data;
};
