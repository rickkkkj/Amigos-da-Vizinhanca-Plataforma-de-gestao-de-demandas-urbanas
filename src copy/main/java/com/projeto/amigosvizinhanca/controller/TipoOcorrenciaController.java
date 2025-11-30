package com.projeto.amigosvizinhanca.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.amigosvizinhanca.model.TipoOcorrencia;
import com.projeto.amigosvizinhanca.service.TipoOcorrenciaService;

@RestController
@RequestMapping("/api/tipos")
public class TipoOcorrenciaController {

    private final TipoOcorrenciaService service;

    public TipoOcorrenciaController(TipoOcorrenciaService service) {
        this.service = service;
    }

    @GetMapping
    public List<TipoOcorrencia> listar() {
        return service.listar();
    }
}
