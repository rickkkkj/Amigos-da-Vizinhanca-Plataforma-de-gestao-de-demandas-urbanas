import React from "react";
import "./PerfilUsuario.css";
import { Link } from "react-router-dom";

export default function PerfilUsuario() {

  const registros = [
    { titulo: "FALTA DE ILUMINAÇÃO", id: "0023", data: "23/04/2025", status: "EM ANÁLISE" },
    { titulo: "FALTA DE ILUMINAÇÃO", id: "0023", data: "23/04/2025", status: "PENDENTE" },
    { titulo: "FALTA DE ILUMINAÇÃO", id: "0023", data: "23/04/2025", status: "RESOLVIDO" },
  ];

  return (
    <div className="perfil-page">

      {/* CABEÇALHO (igual da Home) */}
      <header className="perfil-header">
        <div className="header-left">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4ade80" />
            </svg>
          </div>
          <h1>AMIGOS DO<br />BAIRRO</h1>
        </div>

        <nav className="cabecalho__navegacao">
          <Link className="cabecalho__link" to="/home"> HOME </Link>
          <Link className="cabecalho__link cabecalho__link--ativo" to="/perfil-usuario"> MEU PERFIL </Link>
          <Link className="cabecalho__link" to="/minhas-ocorrencias"> MINHAS OCORRÊNCIAS </Link>
          <Link className="cabecalho__link cabecalho__link--perigo" to="/Pagina-Login"> SAIR </Link>
        </nav>
      </header>

      {/* CONTAINER */}
      <main className="perfil-container">
        <div className="perfil-card">

          {/* ESQUERDA */}
          <section className="perfil-left">
            <div className="perfil-user">
              <div className="perfil-avatar">
                {/* Ícone SVG de usuário */}
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#22c55e" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                </svg>
              </div>
              <div>
                <h2></h2>
                <p>Cidadão</p>
              </div>
            </div>

            <div className="perfil-info">
              <label>Nome completo*:</label>
              <input type="text" defaultValue="" />

              <label>CPF*:</label>
              <input type="text" defaultValue="" />

              <label>Telefone:</label>
              <input type="text" defaultValue="" />

              <label>Email:</label>
              <input type="text" defaultValue="" />

              <label>Endereço*:</label>
              <input type="text" defaultValue="" />
            </div>

            <div className="perfil-buttons">
              <button className="btn-cancelar">Desfazer alterações</button>
              <button className="btn-salvar">Salvar alterações</button>
            </div>
          </section>

          {/* DIREITA */}
          <section className="perfil-right">
            <div className="registros-header">
              {/* Ícone SVG de nota/registro */}
              <svg width="26" height="26" fill="#22c55e" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
                7.04c.39-.39.39-1.02 0-1.41L18.37 
                3.29c-.39-.39-1.02-.39-1.41 
                0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              <h3>Seus Registros</h3>
            </div>

            <p className="registros-count">Número de registros: <span>{registros.length}</span></p>

            <div className="registros-list">
              {registros.map((r, index) => (
                <div key={index} className="registro-item">
                  <div className="registro-info">
                    <strong>{r.titulo}</strong> <span>ID: {r.id}</span>
                    <p>Data: {r.data}</p>
                  </div>
                  <span className={`status-badge ${r.status.replace(" ", "-")}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <footer className="perfil-footer">
        <button className="sair-btn">
          Sair
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{marginLeft: '6px'}} xmlns="http://www.w3.org/2000/svg">
            <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-6v2h6v14h-6v2h6a2 2 0 002-2V5a2 2 0 00-2-2z"/>
          </svg>
        </button>
      </footer>
    </div>
  );
}
