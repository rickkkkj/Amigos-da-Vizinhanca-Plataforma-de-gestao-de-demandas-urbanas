package com.projeto.amigosvizinhanca.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.amigosvizinhanca.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByEmail(String email);

	boolean existsByCpf(String cpf);

	boolean existsByEmail(String email);

}
