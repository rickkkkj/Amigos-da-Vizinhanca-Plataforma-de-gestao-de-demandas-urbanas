package com.projeto.amigosvizinhanca.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.projeto.amigosvizinhanca.model.Ocorrencia;
import com.projeto.amigosvizinhanca.model.TipoOcorrencia;
import com.projeto.amigosvizinhanca.model.Usuario;
import com.projeto.amigosvizinhanca.repository.OcorrenciaRepository;
import com.projeto.amigosvizinhanca.repository.TipoOcorrenciaRepository;
import com.projeto.amigosvizinhanca.repository.UsuarioRepository;

@Service
public class OcorrenciaService {

	private final OcorrenciaRepository repository;
	private final UsuarioRepository usuarioRepository;
	private final TipoOcorrenciaRepository tipoOcorrenciaRepository;

	public OcorrenciaService(OcorrenciaRepository repository, UsuarioRepository usuarioRepository,
			TipoOcorrenciaRepository tipoOcorrenciaRepository) {
		this.repository = repository;
		this.usuarioRepository = usuarioRepository;
		this.tipoOcorrenciaRepository = tipoOcorrenciaRepository;
	}

	private String normalizarNomeArquivo(String nome) {
		if (nome == null)
			return "arquivo.jpg";

		String normalizado = Normalizer.normalize(nome, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");

		normalizado = normalizado.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

		return normalizado;
	}

	public Ocorrencia salvarComFoto(Ocorrencia ocorrencia, MultipartFile foto) {

		if (ocorrencia.getUsuario() == null || ocorrencia.getUsuario().getId() == null) {
			throw new RuntimeException("É obrigatório informar o usuário.");
		}

		if (ocorrencia.getTipo() == null || ocorrencia.getTipo().getId() == null) {
			throw new RuntimeException("É obrigatório informar o tipo da ocorrência.");
		}

		Usuario usuario = usuarioRepository.findById(ocorrencia.getUsuario().getId())
				.orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
		ocorrencia.setUsuario(usuario);

		TipoOcorrencia tipo = tipoOcorrenciaRepository.findById(ocorrencia.getTipo().getId())
				.orElseThrow(() -> new RuntimeException("Tipo de ocorrência não encontrado."));
		ocorrencia.setTipo(tipo);

		if (foto != null && !foto.isEmpty()) {
			try {
				String nomeOriginal = foto.getOriginalFilename();
				String nomeSeguro = normalizarNomeArquivo(nomeOriginal);

				String nomeArquivoFinal = UUID.randomUUID().toString() + "_" + nomeSeguro;

				String pastaBase = System.getProperty("user.dir") + "/uploads/ocorrencias/";
				Path destino = Paths.get(pastaBase + nomeArquivoFinal);

				Files.createDirectories(destino.getParent());
				foto.transferTo(destino.toFile());

				ocorrencia.setFoto(nomeArquivoFinal);

			} catch (Exception e) {
				throw new RuntimeException("Erro ao salvar foto: " + e.getMessage());
			}
		}

		if (ocorrencia.getId() == null)
			ocorrencia.setDataCriacao(LocalDateTime.now());

		return repository.save(ocorrencia);
	}

	public List<Ocorrencia> listarPorUsuario(Long usuarioId) {
		return repository.findByUsuarioId(usuarioId);
	}

	public List<Ocorrencia> listar() {
		return repository.findAll();
	}

	public Ocorrencia buscar(Long id) {
		return repository.findById(id).orElseThrow(() -> new RuntimeException("Ocorrência não encontrada"));
	}

	public void deletar(Long id) {
		repository.deleteById(id);
	}

	public List<Ocorrencia> filtrar(Long tipoId, List<String> status) {
		return repository.filtrar(tipoId, status);
	}

}
