package com.projeto.amigosvizinhanca.service;

import com.projeto.amigosvizinhanca.model.Usuario;
import com.projeto.amigosvizinhanca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

	private final UsuarioRepository repository;

	public UsuarioService(UsuarioRepository repository) {
		this.repository = repository;
	}

	public Usuario salvar(Usuario usuario) {

	    if (repository.existsByCpf(usuario.getCpf())) {
	        throw new RuntimeException("Já existe um usuário com este CPF.");
	    }

	    if (repository.existsByEmail(usuario.getEmail())) {
	        throw new RuntimeException("Já existe um usuário com este e-mail.");
	    }

	    return repository.save(usuario);
	}

	public List<Usuario> listarTodos() {
		return repository.findAll();
	}

	public Usuario buscarPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
	}

	public Usuario atualizar(Long id, Usuario dados) {
		Usuario usuario = buscarPorId(id);

		usuario.setNome(dados.getNome());
		usuario.setCpf(dados.getCpf());
		usuario.setTelefone(dados.getTelefone());
		usuario.setEmail(dados.getEmail());
		usuario.setEndereco(dados.getEndereco());
		usuario.setPerfil(dados.getPerfil());

		return repository.save(usuario);
	}

	public void deletar(Long id) {
		repository.deleteById(id);
	}

	public Usuario login(String email, String senha) {

		if (email == null || email.isBlank()) {
			throw new RuntimeException("O e-mail é obrigatório.");
		}

		if (senha == null || senha.isBlank()) {
			throw new RuntimeException("A senha é obrigatória.");
		}

		Usuario usuario = repository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

		if (!usuario.getSenha().equals(senha)) {
			throw new RuntimeException("Senha incorreta.");
		}

		return usuario;
	}

}
