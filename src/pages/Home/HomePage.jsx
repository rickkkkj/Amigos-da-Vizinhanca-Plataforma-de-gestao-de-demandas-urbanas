import { Link } from "react-router-dom";
import "../Home/home.css";
import Logo from "../../assets/logo/logo_inversed.svg";
import { useState } from "react";

export default function HomePage() {
  const todasOcorrencias = [
    { t: "BURACO NA RUA", d: "16 DE ABRIL", s: "PENDENTE", bairro: "Centro", tipo: "Infraestrutura" },
    { t: "FALTA DE ILUMINAÇÃO", d: "14 DE ABRIL", s: "EM ANÁLISE", bairro: "Jardim América", tipo: "Iluminação" },
    { t: "LIXO ACUMULADO", d: "12 DE ABRIL", s: "RESOLVIDO", bairro: "Vila Nova", tipo: "Limpeza" },
    { t: "POSTE CAÍDO", d: "10 DE ABRIL", s: "EM ANÁLISE", bairro: "Centro", tipo: "Iluminação" },
    { t: "CALÇADA QUEBRADA", d: "08 DE ABRIL", s: "PENDENTE", bairro: "Centro", tipo: "Infraestrutura" },
  ];

  // Estados dos filtros
  const [bairro, setBairro] = useState("TODOS");
  const [tipo, setTipo] = useState("TODOS");
  const [status, setStatus] = useState({
    pendente: true,
    analise: true,
    resolvido: true
  });

  // Função para aplicar filtros
  const ocorrenciasFiltradas = todasOcorrencias.filter((o) => {
    if (bairro !== "TODOS" && o.bairro !== bairro) return false;
    if (tipo !== "TODOS" && o.tipo !== tipo) return false;

    if (!status.pendente && o.s === "PENDENTE") return false;
    if (!status.analise && o.s === "EM ANÁLISE") return false;
    if (!status.resolvido && o.s === "RESOLVIDO") return false;

    return true;
  });

  const badgeClass = (s) =>
    "badge " +
    (s === "PENDENTE"
      ? "badge-pending"
      : s === "RESOLVIDO"
      ? "badge-resolved"
      : "badge-analysis");

  return (
    <div className="container">
      <header className="header">

        <div className="logo-section">
          <img src={Logo} alt="Amigos do Bairro" className="logo-img" />
          <div className="logo-text">
            <h1>AMIGOS DO <br /> BAIRRO</h1>
          </div>
        </div>

        <nav className="nav-buttons">
          <Link className="nav-btn nav-btn--active" to="/home"> HOME </Link>
          <Link className="nav-btn" to="/perfil"> MEU PERFIL </Link>
          <Link className="nav-btn" to="/minhas-ocorrencias"> MINHAS OCORRÊNCIAS </Link>
          <Link className="nav-btn nav-btn--danger" to="/Pagina-Login"> SAIR </Link>
        </nav>
      </header>

      <main className="main-content">

        {/* LISTA DE OCORRÊNCIAS */}
        <section className="occurrences-section">
          <Link to="/registro" className="register-btn">
            REGISTRAR NOVA OCORRÊNCIA
          </Link>

          <h2 className="section-title">OCORRÊNCIAS RECENTES</h2>

          <div className="occurrences-list">
            {ocorrenciasFiltradas.length === 0 ? (
              <p className="nenhuma-ocorrencia">Nenhuma ocorrência encontrada.</p>
            ) : (
              ocorrenciasFiltradas.map((o, i) => (
                <article key={i} className="occurrence-card">
                  <div className="occurrence-info">
                    <h3>{o.t}</h3>
                    <p>{o.d}</p>
                  </div>
                  <span className={badgeClass(o.s)}>{o.s}</span>
                </article>
              ))
            )}
          </div>
        </section>

        {/* FILTROS */}
        <aside className="filter-section">
          <h3>FILTRAR</h3>

          <div className="filter-group">
            <label>BAIRRO</label>
            <select className="filter-select" onChange={(e) => setBairro(e.target.value)}>
              <option>TODOS</option>
              <option>Centro</option>
              <option>Jardim América</option>
              <option>Vila Nova</option>
            </select>
          </div>

          <div className="filter-group">
            <label>TIPO</label>
            <select className="filter-select" onChange={(e) => setTipo(e.target.value)}>
              <option>TODOS</option>
              <option>Infraestrutura</option>
              <option>Iluminação</option>
              <option>Limpeza</option>
            </select>
          </div>

          <fieldset className="filter-group">
            <legend>STATUS</legend>

            <div className="checkbox-group">

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={status.pendente}
                  onChange={() =>
                    setStatus({ ...status, pendente: !status.pendente })
                  }
                />
                PENDENTE
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={status.analise}
                  onChange={() =>
                    setStatus({ ...status, analise: !status.analise })
                  }
                />
                EM ANÁLISE
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={status.resolvido}
                  onChange={() =>
                    setStatus({ ...status, resolvido: !status.resolvido })
                  }
                />
                RESOLVIDO
              </label>

            </div>
          </fieldset>
        </aside>

      </main>
    </div>
  );
}
