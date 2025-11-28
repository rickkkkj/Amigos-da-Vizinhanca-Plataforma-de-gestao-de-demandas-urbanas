import React, { useState, useEffect } from "react";
import "./minhasOcorrencias.css";
import { Link } from "react-router-dom";

import { listarPorUsuario } from "../../services/ocorrenciaService";
import { getUserId } from "../../services/auth";

export default function MinhasOcorrencias() {
  const [telaAtual, setTelaAtual] = useState("lista");
  const [ocorrencias, setOcorrencias] = useState([]);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);

  const usuarioId = getUserId();

  console.log("ID do usuário logado:", usuarioId);

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await listarPorUsuario(usuarioId);

        console.log("Ocorrências recebidas:", lista);

        const formatado = lista.map((item) => ({
          id: item.id,
          titulo: item.titulo,
          descricao: item.descricao,
          endereco: item.endereco,
          urgencia: item.urgencia,
          status: item.status,
          data: new Date(item.dataCriacao).toLocaleDateString("pt-BR"),
          foto: item.foto ? `data:image/jpeg;base64,${item.foto}` : "",
        }));

        setOcorrencias(formatado);

      } catch (e) {
        console.error("Erro ao carregar ocorrências:", e);
      }
    }

    if (usuarioId) carregar();
  }, [usuarioId]);

  const handleOcorrenciaClick = (ocorrencia) => {
    setOcorrenciaSelecionada(ocorrencia);
    setTelaAtual("detalhes");
  };

  const handleVoltar = () => {
    setTelaAtual("lista");
    setOcorrenciaSelecionada(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDENTE":
        return "selo-de-status selo-pendente";
      case "EM_ANALISE":
      case "EM ANÁLISE":
        return "selo-de-status selo-em-analise";
      case "RESOLVIDO":
        return "selo-de-status selo-resolvido";
      default:
        return "selo-de-status";
    }
  };

  if (telaAtual === "detalhes" && ocorrenciaSelecionada) {
    const o = ocorrenciaSelecionada;

    return (
      <div className="container-principal">
        <cabecalho-principal className="cabecalho-principal">
          <div className="secao-logo">
            <svg viewBox="0 0 24 24" fill="none" className="icone-logo">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#4a8a5c"
              />
              <circle cx="12" cy="9" r="2.5" fill="white" />
              <circle cx="9" cy="11" r="1.2" fill="#4a8a5c" />
              <circle cx="15" cy="11" r="1.2" fill="#4a8a5c" />
              <circle cx="12" cy="13" r="1.2" fill="#4a8a5c" />
            </svg>
            <h1>
              AMIGOS DO <br /> BAIRRO
            </h1>
          </div>

          <nav className="botoes-de-navegacao">
            <Link to="/home" className="botao-de-navegacao">HOME</Link>
            <Link to="/perfil-usuario" className="botao-de-navegacao">MEU PERFIL</Link>
            <Link to="/minhas-ocorrencias" className="botao-de-navegacao botao-de-navegacao--ativo">MINHAS OCORRÊNCIAS</Link>
            <Link to="/Pagina-Login" className="botao-de-navegacao botao-de-navegacao--perigo">SAIR</Link>
          </nav>
        </cabecalho-principal>

        <main className="pagina-de-detalhes">
          <h2 className="titulo-da-secao">Detalhes da Ocorrência</h2>

          <div className="grade-de-detalhes">
            <div className="coluna-esquerda">
              <div className="bloco-de-detalhes">
                <h3>Título da Ocorrência</h3>
                <div className="campo-de-detalhe">{o.titulo}</div>
              </div>

              <div className="bloco-de-detalhes">
                <h3>Descrição</h3>
                <div className="campo-de-detalhe">{o.descricao}</div>
              </div>

              <div className="bloco-de-detalhes">
                <h3>Endereço</h3>
                <div className="campo-de-detalhe"><strong>Bairro:</strong> {o.endereco.bairro}</div>
                <div className="campo-de-detalhe"><strong>Rua:</strong> {o.endereco.rua}</div>
                <div className="campo-de-detalhe"><strong>Número:</strong> {o.endereco.numero}</div>
                <div className="campo-de-detalhe"><strong>Complemento:</strong> {o.endereco.complemento || "-"}</div>
              </div>
            </div>

            <div className="coluna-direita">
              <div className="bloco-de-detalhes">
                <h3>Foto</h3>
                <div className="imagem-dos-detalhes">
                  {o.foto ? <img src={o.foto} alt={o.titulo} /> : <p>Sem foto</p>}
                </div>
              </div>

              <div className="bloco-de-detalhes">
                <h3>Nível de Urgência</h3>
                <p>{o.urgencia}</p>
              </div>

              <button className="botao botao-primario" onClick={handleVoltar}>
                Voltar
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container-principal">
      <cabecalho-principal className="cabecalho-principal">
        <div className="secao-logo">
          <svg viewBox="0 0 24 24" fill="none" className="icone-logo">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4a8a5c" />
            <circle cx="12" cy="9" r="2.5" fill="white" />
            <circle cx="9" cy="11" r="1.2" fill="#4a8a5c" />
            <circle cx="15" cy="11" r="1.2" fill="#4a8a5c" />
            <circle cx="12" cy="13" r="1.2" fill="#4a8a5c" />
          </svg>
          <h1>AMIGOS DO <br /> BAIRRO</h1>
        </div>

        <nav className="botoes-de-navegacao">
          <Link to="/home" className="botao-de-navegacao">HOME</Link>
          <Link to="/perfil-usuario" className="botao-de-navegacao">MEU PERFIL</Link>
          <Link to="/minhas-ocorrencias" className="botao-de-navegacao botao-de-navegacao--ativo">MINHAS OCORRÊNCIAS</Link>
          <Link to="/Pagina-Login" className="botao-de-navegacao botao-de-navegacao--perigo">SAIR</Link>
        </nav>
      </cabecalho-principal>

      <main className="secao-de-ocorrencias">
        <h2 className="titulo-da-secao">Minhas Ocorrências</h2>

        <div className="lista-de-ocorrencias">
          {ocorrencias.length === 0 ? (
            <p>Nenhuma ocorrência encontrada.</p>
          ) : (
            ocorrencias.map((o) => (
              <div key={o.id} className="cartao-de-ocorrencia" onClick={() => handleOcorrenciaClick(o)}>
                <div className="topo-da-ocorrencia">
                  <div className="informacoes-da-ocorrencia">
                    <h3>{o.titulo}</h3>
                    <p>{o.data}</p>
                  </div>
                  <span className={getStatusClass(o.status)}>{o.status}</span>
                </div>

                <div className="detalhes-da-ocorrencia">
                  <div className="texto-dos-detalhes">
                    <h4>Endereço</h4>
                    <p><strong>Bairro:</strong> {o.endereco.bairro}</p>
                    <p><strong>Rua:</strong> {o.endereco.rua}</p>
                    <p><strong>Número:</strong> {o.endereco.numero}</p>
                    <p><strong>Complemento:</strong> {o.endereco.complemento || "-"}</p>

                    <h4>Nível de Urgência</h4>
                    <p>{o.urgencia}</p>
                  </div>

                  <div className="imagem-dos-detalhes">
                    {o.foto ? <img src={o.foto} alt={o.titulo} /> : <p>Sem foto</p>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
