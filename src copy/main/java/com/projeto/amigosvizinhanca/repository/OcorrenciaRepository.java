package com.projeto.amigosvizinhanca.repository;

import com.projeto.amigosvizinhanca.model.Ocorrencia;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {

	@Query("""
			    SELECT o FROM Ocorrencia o
			    WHERE (:tipoId IS NULL OR o.tipo.id = :tipoId)
			    AND (:status IS NULL OR o.status IN :status)
			""")
	List<Ocorrencia> filtrar(@Param("tipoId") Long tipoId, @Param("status") List<String> status);

	List<Ocorrencia> findByUsuarioId(Long usuarioId);
}
