package com.projeto.amigosvizinhanca.dto;

import com.projeto.amigosvizinhanca.model.Endereco;
import com.projeto.amigosvizinhanca.model.NivelUrgencia;
import com.projeto.amigosvizinhanca.model.StatusOcorrencia;
import lombok.Data;

@Data
public class OcorrenciaRequestDTO {

    private String titulo;

    private String descricao;
    
    private Endereco endereco;
    
    private NivelUrgencia urgencia;
    
    private StatusOcorrencia status;
    
    private Long usuarioId;
    
    private Long tipoId; 

}
