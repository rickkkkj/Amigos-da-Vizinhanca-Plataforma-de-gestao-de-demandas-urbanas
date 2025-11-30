package com.projeto.amigosvizinhanca.dto;

import java.time.LocalDateTime;

import com.projeto.amigosvizinhanca.model.Endereco;
import com.projeto.amigosvizinhanca.model.NivelUrgencia;
import com.projeto.amigosvizinhanca.model.StatusOcorrencia;

import lombok.Data;

@Data
public class OcorrenciaResponseDTO {

    private Long id;
    
    private String titulo;
    
    private String descricao;
    
    private Endereco endereco;
    
    private String foto;
    
    private NivelUrgencia urgencia;
    
    private StatusOcorrencia status;

    private Long usuarioId;
    
    private String nomeUsuario; 
    
    private Long tipoId;
    
    private String tipoNome;
    
    private LocalDateTime dataCriacao;

}
