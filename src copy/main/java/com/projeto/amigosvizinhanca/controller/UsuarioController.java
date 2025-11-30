package com.projeto.amigosvizinhanca.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.amigosvizinhanca.dto.UsuarioRequestDTO;
import com.projeto.amigosvizinhanca.dto.UsuarioResponseDTO;
import com.projeto.amigosvizinhanca.mapper.UsuarioMapper;
import com.projeto.amigosvizinhanca.model.Usuario;
import com.projeto.amigosvizinhanca.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	private final UsuarioService service;

	public UsuarioController(UsuarioService service) {
		this.service = service;
	}

	@PostMapping("/salvar")
	public ResponseEntity<UsuarioResponseDTO> salvar(@RequestBody UsuarioRequestDTO dto) {

		Usuario usuario = UsuarioMapper.toUsuario(dto);
		Usuario salvo = service.salvar(usuario);
		UsuarioResponseDTO response = UsuarioMapper.toDTO(salvo);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/listar")
	public ResponseEntity<List<UsuarioResponseDTO>> listar() {

		List<UsuarioResponseDTO> lista = service.listarTodos().stream().map(UsuarioMapper::toDTO).toList();

		return ResponseEntity.ok(lista);
	}

	@GetMapping("/buscar/{id}")
	public ResponseEntity<UsuarioResponseDTO> buscar(@PathVariable Long id) {

		Usuario usuario = service.buscarPorId(id);
		return ResponseEntity.ok(UsuarioMapper.toDTO(usuario));
	}

	@PutMapping("/atualizar/{id}")
	public ResponseEntity<UsuarioResponseDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioRequestDTO dto) {

		Usuario dados = UsuarioMapper.toUsuario(dto);
		Usuario atualizado = service.atualizar(id, dados);

		return ResponseEntity.ok(UsuarioMapper.toDTO(atualizado));
	}

	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {

		service.deletar(id);
		return ResponseEntity.noContent().build();
	}
}
