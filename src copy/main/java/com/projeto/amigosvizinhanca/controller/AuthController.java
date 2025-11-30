package com.projeto.amigosvizinhanca.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.amigosvizinhanca.dto.LoginRequestDTO;
import com.projeto.amigosvizinhanca.dto.LoginResponseDTO;
import com.projeto.amigosvizinhanca.mapper.LoginMapper;
import com.projeto.amigosvizinhanca.model.Usuario;
import com.projeto.amigosvizinhanca.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final UsuarioService usuarioService;

	public AuthController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
		Usuario usuario = usuarioService.login(dto.getEmail(), dto.getSenha());
		return ResponseEntity.ok(LoginMapper.toDTO(usuario));
	}
}
