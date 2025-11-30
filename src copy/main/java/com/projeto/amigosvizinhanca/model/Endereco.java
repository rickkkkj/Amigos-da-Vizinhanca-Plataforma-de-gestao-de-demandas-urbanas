package com.projeto.amigosvizinhanca.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Endereco {

    private String rua;
    
    private String numero;

    private String bairro;

    private String cidade;
	    
    private String complemento;
    
    private String cep;
}
