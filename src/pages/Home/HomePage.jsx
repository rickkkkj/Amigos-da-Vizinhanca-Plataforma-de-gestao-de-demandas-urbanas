import { Link } from "react-router-dom";
import "../Home/home.css";
import Logo from "../../assets/logo/logo_inversed.svg";

export default function HomePage() {
  const ocorrencias = [
    { t: "BURACO NA RUA", d: "16 DE ABRIL", s: "PENDENTE" },
    { t: "FALTA DE ILUMINAÇÃO", d: "14 DE ABRIL", s: "EM ANÁLISE" },
    { t: "LIXO ACUMULADO", d: "12 DE ABRIL", s: "RESOLVIDO" },
    { t: "POSTE CAÍDO", d: "10 DE ABRIL", s: "EM ANÁLISE" },
    { t: "CALÇADA QUEBRADA", d: "08 DE ABRIL", s: "PENDENTE" },
  ];

  const badgeClass = (s) =>
    "badge " +
    (s === "PENDENTE"
      ? "badge-pending"
      : s === "RESOLVIDO"
        ? "badge-resolved"
        : "badge-analysis");

  return (
    <div className="container">
      <header className="header" aria-label="Topo do site">
        <div className="logo-section">
          <img src={Logo} alt="Amigos do Bairro" className="logo-img" />
          <div className="logo-text">
            <h1>
              AMIGOS DO
              <br />
              BAIRRO
            </h1>
          </div>
        </div>

        <nav className="nav-buttons" aria-label="Navegação principal">
          <Link className="nav-btn nav-btn--active" to="/home">
            HOME
          </Link>
          <Link className="nav-btn" to="/perfil">
            MEU PERFIL
          </Link>
          <Link className="nav-btn" to="/minhas-ocorrencias">
            MINHAS OCORRÊNCIAS
          </Link>
          <Link className="nav-btn nav-btn--danger" to="/Pagina-Login">
            SAIR
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <section
          className="occurrences-section"
          aria-labelledby="titulo-ocorrencias"
        >
          <Link to="/registro" className="register-btn">
            REGISTRAR NOVA OCORRÊNCIA
          </Link>

          <h2 id="titulo-ocorrencias" className="section-title">
            OCORRÊNCIAS RECENTES
          </h2>

          <div className="occurrences-list" role="list">
            {ocorrencias.map((o, i) => (
              <article key={i} className="occurrence-card" role="listitem">
                <div className="occurrence-info">
                  <h3>{o.t}</h3>
                  <p>{o.d}</p>
                </div>
                <span className={badgeClass(o.s)} aria-label={`status: ${o.s}`}>
                  {o.s}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Filtros */}
        <aside className="filter-section" aria-labelledby="titulo-filtros">
          <h3 id="titulo-filtros">FILTRAR</h3>

          <div className="filter-group">
            <label htmlFor="bairro">BAIRRO</label>
            <select id="bairro" className="filter-select" defaultValue="TODOS">
              <option>TODOS</option>
              <option>Centro</option>
              <option>Jardim América</option>
              <option>Vila Nova</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tipo">TIPO</label>
            <select id="tipo" className="filter-select" defaultValue="TODOS">
              <option>TODOS</option>
              <option>Infraestrutura</option>
              <option>Iluminação</option>
              <option>Limpeza</option>
            </select>
          </div>

          <fieldset className="filter-group">
            <legend>STATUS</legend>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input type="checkbox" defaultChecked id="pendente" />
                <label htmlFor="pendente">PENDENTE</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" defaultChecked id="analise" />
                <label htmlFor="analise">EM ANÁLISE</label>
              </div>
              <div className="checkbox-item">
                <input type="checkbox" defaultChecked id="resolvido" />
                <label htmlFor="resolvido">RESOLVIDO</label>
              </div>
            </div>
          </fieldset>
        </aside>
      </main>
    </div>
  );
}
