import axios from "axios";

const API_URL = "http://localhost:8080/api/ocorrencias";

export async function listarOcorrenciasPorUsuario(usuarioId) {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return response.data;
}
