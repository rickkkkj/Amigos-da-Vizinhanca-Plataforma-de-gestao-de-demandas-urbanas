package com.projeto.amigosvizinhanca.dto;

import com.projeto.amigosvizinhanca.model.Endereco;
import com.projeto.amigosvizinhanca.model.Perfil;
import lombok.Data;

@Data
public class UsuarioResponseDTO {

    private Long id;

    private String nome;
    
    private String cpf;
    
    private String telefone;
    
    private String email;
    
    private Endereco endereco;
    
    private Perfil perfil;
    
}
