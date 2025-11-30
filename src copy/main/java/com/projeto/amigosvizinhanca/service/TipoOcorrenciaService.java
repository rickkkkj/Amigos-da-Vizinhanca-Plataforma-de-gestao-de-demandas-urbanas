package com.projeto.amigosvizinhanca.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projeto.amigosvizinhanca.model.TipoOcorrencia;
import com.projeto.amigosvizinhanca.repository.TipoOcorrenciaRepository;

@Service
public class TipoOcorrenciaService {

	private final TipoOcorrenciaRepository repository;

	public TipoOcorrenciaService(TipoOcorrenciaRepository repository) {
		this.repository = repository;
	}

	public List<TipoOcorrencia> listar() {
		return repository.findAll();
	}

}
