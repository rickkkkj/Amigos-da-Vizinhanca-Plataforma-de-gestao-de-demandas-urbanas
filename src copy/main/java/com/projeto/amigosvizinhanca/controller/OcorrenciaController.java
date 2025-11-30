package com.projeto.amigosvizinhanca.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projeto.amigosvizinhanca.dto.OcorrenciaRequestDTO;
import com.projeto.amigosvizinhanca.dto.OcorrenciaResponseDTO;
import com.projeto.amigosvizinhanca.mapper.OcorrenciaMapper;
import com.projeto.amigosvizinhanca.model.Ocorrencia;
import com.projeto.amigosvizinhanca.service.OcorrenciaService;

@RestController
@RequestMapping("/api/ocorrencias")
public class OcorrenciaController {

	private final OcorrenciaService service;

	public OcorrenciaController(OcorrenciaService service) {
		this.service = service;
	}

	@PostMapping(value = "/salvar", consumes = "multipart/form-data")
	public ResponseEntity<OcorrenciaResponseDTO> salvar(@RequestPart("dados") String dadosJson,
			@RequestPart(value = "foto", required = false) MultipartFile foto) {

		ObjectMapper mapper = new ObjectMapper();
		OcorrenciaRequestDTO dto;

		try {
			dto = mapper.readValue(dadosJson, OcorrenciaRequestDTO.class);
		} catch (Exception e) {
			throw new RuntimeException("Erro ao converter JSON dos dados: " + e.getMessage());
		}

		Ocorrencia ocorrencia = OcorrenciaMapper.toOcorrencia(dto);

		Ocorrencia salvo = service.salvarComFoto(ocorrencia, foto);

		return ResponseEntity.ok(OcorrenciaMapper.toDTO(salvo));
	}

	@GetMapping("/listar")
	public ResponseEntity<List<OcorrenciaResponseDTO>> listar() {

		List<OcorrenciaResponseDTO> lista = service.listar().stream().map(OcorrenciaMapper::toDTO).toList();

		return ResponseEntity.ok(lista);
	}

	@GetMapping("/buscar/{id}")
	public ResponseEntity<OcorrenciaResponseDTO> buscar(@PathVariable Long id) {

		Ocorrencia o = service.buscar(id);
		return ResponseEntity.ok(OcorrenciaMapper.toDTO(o));
	}

	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {

		service.deletar(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/usuario/{usuarioId}")
	public ResponseEntity<List<OcorrenciaResponseDTO>> listarPorUsuario(@PathVariable Long usuarioId) {

		List<OcorrenciaResponseDTO> lista = service.listarPorUsuario(usuarioId).stream().map(OcorrenciaMapper::toDTO)
				.toList();

		return ResponseEntity.ok(lista);
	}

	@GetMapping("/filtrar")
	public ResponseEntity<List<OcorrenciaResponseDTO>> filtrar(@RequestParam(required = false) String tipoId,
			@RequestParam(required = false) List<String> status) {

		Long tipoIdConvertido = null;

		if (tipoId != null && !tipoId.equalsIgnoreCase("TODOS")) {
			try {
				tipoIdConvertido = Long.parseLong(tipoId);
			} catch (NumberFormatException e) {
				throw new RuntimeException("O valor de tipoId deve ser um número ou 'TODOS'");
			}
		}

		List<OcorrenciaResponseDTO> lista = service.filtrar(tipoIdConvertido, status).stream()
				.map(OcorrenciaMapper::toDTO).toList();

		return ResponseEntity.ok(lista);
	}

}
