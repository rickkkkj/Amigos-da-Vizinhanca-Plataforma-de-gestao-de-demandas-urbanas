package com.projeto.amigosvizinhanca.dto;

import com.projeto.amigosvizinhanca.model.Endereco;
import com.projeto.amigosvizinhanca.model.Perfil;
import lombok.Data;

@Data
public class LoginResponseDTO {

    private Long id;
    
    private String nome;
    
    private String email;
    
    private Perfil perfil;
    
    private Endereco endereco;

}
