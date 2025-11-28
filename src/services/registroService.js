import axios from "axios";

const API_URL = "http://localhost:8080/api/ocorrencias";

export const salvarOcorrencia = async (dados, foto) => {
    const formData = new FormData();
    formData.append("dados", JSON.stringify(dados));

    if (foto) {
        formData.append("foto", foto);
    }

    const response = await axios.post(`${API_URL}/salvar`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};
