package com.projeto.amigosvizinhanca.mapper;

import com.projeto.amigosvizinhanca.dto.LoginResponseDTO;
import com.projeto.amigosvizinhanca.model.Usuario;

public class LoginMapper {

    public static LoginResponseDTO toDTO(Usuario u) {
        LoginResponseDTO dto = new LoginResponseDTO();
        dto.setId(u.getId());
        dto.setNome(u.getNome());
        dto.setEmail(u.getEmail());
        dto.setPerfil(u.getPerfil());
        dto.setEndereco(u.getEndereco());
        return dto;
    }
}
