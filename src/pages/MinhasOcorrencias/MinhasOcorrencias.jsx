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
        return "badge badge-pending";
      case "EM ANÁLISE":
        return "badge badge-analysis";
      case "RESOLVIDO":
        return "badge badge-resolved";
      default:
        return "badge";
    }
  };

  // --- TELA DE DETALHES ---
  if (telaAtual === "detalhes" && ocorrenciaSelecionada) {
    return (
      <div className="container">
        <header className="header">
          <div className="logo-section">
            <svg viewBox="0 0 24 24" fill="none" className="logo-svg">
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

          <nav className="nav-buttons" aria-label="Navegação principal">
          <Link className="nav-btn" to="/home">
            HOME
          </Link>
          <Link className="nav-btn" to="/perfil">
            MEU PERFIL
          </Link>
          <Link className="nav-btn nav-btn--active" to="/minhas-ocorrencias">
            MINHAS OCORRÊNCIAS
          </Link>
          <Link className="nav-btn nav-btn--danger" to="/Pagina-Login">
            SAIR
          </Link>
        </nav>
        </header>

        <main className="details-page">
          <h2 className="section-title">Detalhes da Ocorrência</h2>

          <div className="details-grid">
            {/* Coluna Esquerda */}
            <div className="details-left">
              <div className="details-block">
                <h3>Título da Ocorrência</h3>
                <div className="details-field">{ocorrenciaSelecionada.titulo}</div>
              </div>

              <div className="details-block">
                <h3>Descrição</h3>
                <div className="details-field">{ocorrenciaSelecionada.descricao}</div>
              </div>

              <div className="details-block">
                <h3>Endereço</h3>
                <div className="details-field"><strong>Bairro:</strong> {ocorrenciaSelecionada.endereco.bairro}</div>
                <div className="details-field"><strong>Rua:</strong> {ocorrenciaSelecionada.endereco.rua}</div>
                <div className="details-field"><strong>Número:</strong> {ocorrenciaSelecionada.endereco.numero}</div>
                <div className="details-field"><strong>Complemento:</strong> {ocorrenciaSelecionada.endereco.complemento || "-"}</div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="details-right">
              <div className="details-block">
                <h3>Foto</h3>
                <div className="details-img">
                  <img src={ocorrenciaSelecionada.foto} alt={ocorrenciaSelecionada.titulo} />
                </div>
              </div>

              <div className="details-block">
                <h3>Nível de Urgência</h3>
                <div className="urgency-list">
                  {["CRÍTICA", "ALTA", "MÉDIA", "BAIXA"].map((nivel) => (
                    <div key={nivel} className="urgency-item">
                      <div
                        className={`urgency-circle ${
                          ocorrenciaSelecionada.urgencia === nivel ? "checked" : ""
                        }`}
                      ></div>
                      <span>{nivel}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleVoltar}>
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
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <svg viewBox="0 0 24 24" fill="none" className="logo-svg">
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

                  <nav className="nav-buttons" aria-label="Navegação principal">
          <Link className="nav-btn" to="/home">
            HOME
          </Link>
          <Link className="nav-btn" to="/perfil">
            MEU PERFIL
          </Link>
          <Link className="nav-btn nav-btn--active" to="/minhas-ocorrencias">
            MINHAS OCORRÊNCIAS
          </Link>
          <Link className="nav-btn nav-btn--danger" to="/Pagina-Login">
            SAIR
          </Link>
        </nav>
      </header>

      <main className="occurrences-section">
        <h2 className="section-title">Minhas Ocorrências</h2>

        <div className="occurrences-list">
          {ocorrencias.map((ocorrencia) => (
            <div
              key={ocorrencia.id}
              className="occurrence-card"
              onClick={() => handleOcorrenciaClick(ocorrencia)}
            >
              <div className="occurrence-top">
                <div className="occurrence-info">
                  <h3>{ocorrencia.titulo}</h3>
                  <p>{ocorrencia.data}</p>
                </div>
                <span className={getStatusClass(ocorrencia.status)}>
                  {ocorrencia.status}
                </span>
              </div>

              <div className="occurrence-details">
                <div className="details-text">
                  <h4>Endereço</h4>
                  <p><strong>Bairro:</strong> {ocorrencia.endereco.bairro}</p>
                  <p><strong>Rua:</strong> {ocorrencia.endereco.rua}</p>
                  <p><strong>Número:</strong> {ocorrencia.endereco.numero}</p>
                  <p><strong>Complemento:</strong> {ocorrencia.endereco.complemento || "-"}</p>

                  <h4>Nível de Urgência</h4>
                  <p>{ocorrencia.urgencia}</p>
                </div>

                <div className="details-img">
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
