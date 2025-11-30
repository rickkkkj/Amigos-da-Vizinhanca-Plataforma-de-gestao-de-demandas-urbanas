package com.projeto.amigosvizinhanca.mapper;

import com.projeto.amigosvizinhanca.dto.OcorrenciaRequestDTO;
import com.projeto.amigosvizinhanca.dto.OcorrenciaResponseDTO;
import com.projeto.amigosvizinhanca.model.Ocorrencia;
import com.projeto.amigosvizinhanca.model.TipoOcorrencia;
import com.projeto.amigosvizinhanca.model.Usuario;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

public class OcorrenciaMapper {

    public static Ocorrencia toOcorrencia(OcorrenciaRequestDTO dto) {
        if (dto == null) return null;

        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setTitulo(dto.getTitulo());
        ocorrencia.setDescricao(dto.getDescricao());
        ocorrencia.setEndereco(dto.getEndereco());
        ocorrencia.setUrgencia(dto.getUrgencia());
        ocorrencia.setStatus(dto.getStatus());

        Usuario usuario = new Usuario();
        usuario.setId(dto.getUsuarioId());
        ocorrencia.setUsuario(usuario);

        TipoOcorrencia tipoOcorrencia = new TipoOcorrencia();
        tipoOcorrencia.setId(dto.getTipoId());
        ocorrencia.setTipo(tipoOcorrencia);

        return ocorrencia;
    }

    public static OcorrenciaResponseDTO toDTO(Ocorrencia ocorrencia) {
        if (ocorrencia == null) return null;

        OcorrenciaResponseDTO dto = new OcorrenciaResponseDTO();
        dto.setId(ocorrencia.getId());
        dto.setTitulo(ocorrencia.getTitulo());
        dto.setDescricao(ocorrencia.getDescricao());
        dto.setEndereco(ocorrencia.getEndereco());
        dto.setUrgencia(ocorrencia.getUrgencia());
        dto.setStatus(ocorrencia.getStatus());
        dto.setUsuarioId(ocorrencia.getUsuario().getId());
        dto.setNomeUsuario(ocorrencia.getUsuario().getNome());
        dto.setTipoId(ocorrencia.getTipo().getId());
        dto.setTipoNome(ocorrencia.getTipo().getNome());
        dto.setDataCriacao(ocorrencia.getDataCriacao());

        try {
            if (ocorrencia.getFoto() != null) {
                String caminho = System.getProperty("user.dir") 
                        + "/uploads/ocorrencias/" + ocorrencia.getFoto();

                Path path = Paths.get(caminho);

                if (Files.exists(path)) {
                    byte[] bytes = Files.readAllBytes(path);
                    String base64 = Base64.getEncoder().encodeToString(bytes);
                    dto.setFoto(base64);
                } else {
                    dto.setFoto(null);
                }
            }
        } catch (Exception e) {
            dto.setFoto(null);
        }

        return dto;
    }
}
