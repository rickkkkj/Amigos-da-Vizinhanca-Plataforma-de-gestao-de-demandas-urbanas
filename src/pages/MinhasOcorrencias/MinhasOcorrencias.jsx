import React, { useState } from "react";
import "./minhasOcorrencias.css";
import { Link } from "react-router-dom";

export default function MinhasOcorrencias() {
  const [telaAtual, setTelaAtual] = useState("lista");
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);

  const [ocorrencias] = useState([
    {
      id: 1,
      titulo: "BURACO NA RUA",
      data: "16 DE ABRIL",
      status: "PENDENTE",
      descricao:
        "Buraco grande na via principal causando problemas no trânsito",
      endereco: {
        bairro: "Centro",
        rua: "Rua Principal",
        numero: "123",
        complemento: "Próximo ao mercado",
      },
      urgencia: "CRÍTICA",
      foto: "",
    },
    {
      id: 2,
      titulo: "FALTA DE ILUMINAÇÃO",
      data: "16 DE ABRIL",
      status: "PENDENTE",
      descricao: "Poste de luz queimado deixando a rua escura",
      endereco: {
        bairro: "Jardim América",
        rua: "Rua das Flores",
        numero: "456",
        complemento: "",
      },
      urgencia: "ALTA",
      foto: "",
    },
    {
      id: 3,
      titulo: "LIXO ACUMULADO",
      data: "16 DE ABRIL",
      status: "EM ANÁLISE",
      descricao: "Acúmulo de lixo na calçada há vários dias",
      endereco: {
        bairro: "Vila Nova",
        rua: "Avenida Central",
        numero: "789",
        complemento: "Em frente à praça",
      },
      urgencia: "MÉDIA",
      foto: "",
    },
    {
      id: 4,
      titulo: "CALÇADA QUEBRADA",
      data: "16 DE ABRIL",
      status: "RESOLVIDO",
      descricao: "Calçada com buracos perigosos para pedestres",
      endereco: {
        bairro: "Centro",
        rua: "Rua Comercial",
        numero: "321",
        complemento: "",
      },
      urgencia: "BAIXA",
      foto: "",
    },
  ]);

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
      case "EM ANÁLISE":
        return "selo-de-status selo-em-analise";
      case "RESOLVIDO":
        return "selo-de-status selo-resolvido";
      default:
        return "selo-de-status";
    }
  };

  // --- TELA DE DETALHES ---
  if (telaAtual === "detalhes" && ocorrenciaSelecionada) {
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

          <nav className="botoes-de-navegacao" aria-label="Navegação principal">
          <Link className="botao-de-navegacao" to="/home">
            HOME
          </Link>
          <Link className="botao-de-navegacao" to="/perfil-usuario">
            MEU PERFIL
          </Link>
          <Link className="botao-de-navegacao botao-de-navegacao--ativo" to="/minhas-ocorrencias">
            MINHAS OCORRÊNCIAS
          </Link>
          <Link className="botao-de-navegacao botao-de-navegacao--perigo" to="/Pagina-Login">
            SAIR
          </Link>
        </nav>
        </cabecalho-principal>

        <main className="pagina-de-detalhes">
          <h2 className="titulo-da-secao">Detalhes da Ocorrência</h2>

          <div className="grade-de-detalhes">
            {/* Coluna Esquerda */}
            <div className="coluna-esquerda">
              <div className="bloco-de-detalhes">
                <h3>Título da Ocorrência</h3>
                <div className="campo-de-detalhe">{ocorrenciaSelecionada.titulo}</div>
              </div>

              <div className="bloco-de-detalhes">
                <h3>Descrição</h3>
                <div className="campo-de-detalhe">{ocorrenciaSelecionada.descricao}</div>
              </div>

              <div className="bloco-de-detalhes">
                <h3>Endereço</h3>
                <div className="campo-de-detalhe"><strong>Bairro:</strong> {ocorrenciaSelecionada.endereco.bairro}</div>
                <div className="campo-de-detalhe"><strong>Rua:</strong> {ocorrenciaSelecionada.endereco.rua}</div>
                <div className="campo-de-detalhe"><strong>Número:</strong> {ocorrenciaSelecionada.endereco.numero}</div>
                <div className="campo-de-detalhe"><strong>Complemento:</strong> {ocorrenciaSelecionada.endereco.complemento || "-"}</div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="coluna-direita">
              <div className="bloco-de-detalhes">
                <h3>Foto</h3>
                <div className="imagem-dos-detalhes">
                  <img src={ocorrenciaSelecionada.foto} alt={ocorrenciaSelecionada.titulo} />
                </div>
              </div>

              <div className="bloco-de-detalhes">
                <h3>Nível de Urgência</h3>
                <div className="lista-de-urgencia">
                  {["CRÍTICA", "ALTA", "MÉDIA", "BAIXA"].map((nivel) => (
                    <div key={nivel} className="item-de-urgencia">
                      <div
                        className={`indicador-de-urgencia ${
                          ocorrenciaSelecionada.urgencia === nivel ? "selecionado" : ""
                        }`}
                      ></div>
                      <span>{nivel}</span>
                    </div>
                  ))}
                </div>
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

  // --- TELA DE LISTA ---
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

                  <nav className="botoes-de-navegacao" aria-label="Navegação principal">
          <Link className="botao-de-navegacao" to="/home">
            HOME
          </Link>
          <Link className="botao-de-navegacao" to="/perfil-usuario">
            MEU PERFIL
          </Link>
          <Link className="botao-de-navegacao botao-de-navegacao--ativo" to="/minhas-ocorrencias">
            MINHAS OCORRÊNCIAS
          </Link>
          <Link className="botao-de-navegacao botao-de-navegacao--perigo" to="/Pagina-Login">
            SAIR
          </Link>
        </nav>
      </cabecalho-principal>

      <main className="secao-de-ocorrencias">
        <h2 className="titulo-da-secao">Minhas Ocorrências</h2>

        <div className="lista-de-ocorrencias">
          {ocorrencias.map((ocorrencia) => (
            <div
              key={ocorrencia.id}
              className="cartao-de-ocorrencia"
              onClick={() => handleOcorrenciaClick(ocorrencia)}
            >
              <div className="topo-da-ocorrencia">
                <div className="informacoes-da-ocorrencia">
                  <h3>{ocorrencia.titulo}</h3>
                  <p>{ocorrencia.data}</p>
                </div>
                <span className={getStatusClass(ocorrencia.status)}>
                  {ocorrencia.status}
                </span>
              </div>

              <div className="detalhes-da-ocorrencia">
                <div className="texto-dos-detalhes">
                  <h4>Endereço</h4>
                  <p><strong>Bairro:</strong> {ocorrencia.endereco.bairro}</p>
                  <p><strong>Rua:</strong> {ocorrencia.endereco.rua}</p>
                  <p><strong>Número:</strong> {ocorrencia.endereco.numero}</p>
                  <p><strong>Complemento:</strong> {ocorrencia.endereco.complemento || "-"}</p>

                  <h4>Nível de Urgência</h4>
                  <p>{ocorrencia.urgencia}</p>
                </div>

                <div className="imagem-dos-detalhes">
                  <img src={ocorrencia.foto} alt={ocorrencia.titulo} />
                </div>               
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
