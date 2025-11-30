package com.projeto.amigosvizinhanca.dto;

import com.projeto.amigosvizinhanca.model.Endereco;
import com.projeto.amigosvizinhanca.model.Perfil;
import lombok.Data;

@Data
public class UsuarioRequestDTO {
	
	private long id;

    private String nome;
    
    private String cpf;
    
    private String telefone;
    
    private String email;
    
    private Endereco endereco;
    
    private Perfil perfil;
    
    private String senha;
}
