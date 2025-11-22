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

  const [bairro, setBairro] = useState("TODOS");
  const [tipo, setTipo] = useState("TODOS");
  const [status, setStatus] = useState({
    pendente: true,
    analise: true,
    resolvido: true
  });

  const ocorrenciasFiltradas = todasOcorrencias.filter((o) => {
    if (bairro !== "TODOS" && o.bairro !== bairro) return false;
    if (tipo !== "TODOS" && o.tipo !== tipo) return false;

    if (!status.pendente && o.s === "PENDENTE") return false;
    if (!status.analise && o.s === "EM ANÁLISE") return false;
    if (!status.resolvido && o.s === "RESOLVIDO") return false;

    return true;
  });

  const badgeClass = (s) =>
    "status " +
    (s === "PENDENTE"
      ? "status--pendente"
      : s === "RESOLVIDO"
      ? "status--resolvido"
      : "status--analise");

  return (
    <div className="pagina">
      <header className="cabecalho">
        <div className="cabecalho__logo">
          <img src={Logo} alt="Amigos do Bairro" className="cabecalho__logo-imagem" />
          <div className="cabecalho__logo-texto">
            <h1>AMIGOS DO <br /> BAIRRO</h1>
          </div>
        </div>

        <nav className="cabecalho__navegacao">
          <Link className="cabecalho__link cabecalho__link--ativo" to="/home"> HOME </Link>
          <Link className="cabecalho__link" to="/perfil-usuario"> MEU PERFIL </Link>
          <Link className="cabecalho__link" to="/minhas-ocorrencias"> MINHAS OCORRÊNCIAS </Link>
          <Link className="cabecalho__link cabecalho__link--perigo" to="/Pagina-Login"> SAIR </Link>
        </nav>
      </header>

      <main className="conteudo">
        <section className="ocorrencias">
          <Link to="/registro" className="ocorrencias__registrar">
            REGISTRAR NOVA OCORRÊNCIA
          </Link>

          <h2 className="ocorrencias__titulo">OCORRÊNCIAS RECENTES</h2>

          <div className="ocorrencias__lista">
            {ocorrenciasFiltradas.length === 0 ? (
              <p className="ocorrencias__vazio">Nenhuma ocorrência encontrada.</p>
            ) : (
              ocorrenciasFiltradas.map((o, i) => (
                <article key={i} className="ocorrencias__cartao">
                  <div className="ocorrencias__info">
                    <h3>{o.t}</h3>
                    <p>{o.d}</p>
                  </div>
                  <span className={badgeClass(o.s)}>{o.s}</span>
                </article>
              ))
            )}
          </div>
        </section>

        <aside className="filtros">
          <h3>FILTRAR</h3>

          <div className="filtros__grupo">
            <label>BAIRRO</label>
            <select className="filtros__select" onChange={(e) => setBairro(e.target.value)}>
              <option>TODOS</option>
              <option>Centro</option>
              <option>Jardim América</option>
              <option>Vila Nova</option>
            </select>
          </div>

          <div className="filtros__grupo">
            <label>TIPO</label>
            <select className="filtros__select" onChange={(e) => setTipo(e.target.value)}>
              <option>TODOS</option>
              <option>Infraestrutura</option>
              <option>Iluminação</option>
              <option>Limpeza</option>
            </select>
          </div>

          <fieldset className="filtros__grupo">
            <legend>STATUS</legend>

            <div className="filtros__checks">
              <label className="filtros__check">
                <input
                  type="checkbox"
                  checked={status.pendente}
                  onChange={() =>
                    setStatus({ ...status, pendente: !status.pendente })
                  }
                />
                PENDENTE
              </label>

              <label className="filtros__check">
                <input
                  type="checkbox"
                  checked={status.analise}
                  onChange={() =>
                    setStatus({ ...status, analise: !status.analise })
                  }
                />
                EM ANÁLISE
              </label>

              <label className="filtros__check">
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
