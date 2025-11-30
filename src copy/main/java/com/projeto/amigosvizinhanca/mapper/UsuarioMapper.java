package com.projeto.amigosvizinhanca.mapper;

import com.projeto.amigosvizinhanca.dto.UsuarioRequestDTO;
import com.projeto.amigosvizinhanca.dto.UsuarioResponseDTO;
import com.projeto.amigosvizinhanca.model.Usuario;

public class UsuarioMapper {

    public static Usuario toUsuario(UsuarioRequestDTO dto) {
        if (dto == null) return null;

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setCpf(dto.getCpf());
        usuario.setTelefone(dto.getTelefone());
        usuario.setEmail(dto.getEmail());
        usuario.setEndereco(dto.getEndereco());
        usuario.setPerfil(dto.getPerfil());
        usuario.setSenha(dto.getSenha());

        return usuario;
    }

    public static UsuarioResponseDTO toDTO(Usuario usuario) {
        if (usuario == null) return null;

        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setCpf(usuario.getCpf());
        dto.setTelefone(usuario.getTelefone());
        dto.setEmail(usuario.getEmail());
        dto.setEndereco(usuario.getEndereco());
        dto.setPerfil(usuario.getPerfil());

        return dto;
    }
}
