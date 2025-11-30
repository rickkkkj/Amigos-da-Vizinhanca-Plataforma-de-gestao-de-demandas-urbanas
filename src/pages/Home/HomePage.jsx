import { Link } from "react-router-dom";
import "../Home/home.css";
import Logo from "../../assets/logo/logo_inversed.svg";
import { useEffect, useState } from "react";

import { listarTodas, listarPorUsuario } from "../../services/ocorrenciaService";
import { listarTipos } from "../../services/tipoService";
import { getUser } from "../../services/auth";

export default function HomePage() {

  const [ocorrencias, setOcorrencias] = useState([]);

  const [tipos, setTipos] = useState([]);

  const [tipo, setTipo] = useState("TODOS");
  const [status, setStatus] = useState({
    pendente: true,
    analise: true,
    resolvido: true,
  });

  const [filtrosPendentes, setFiltrosPendentes] = useState({
    tipo: "TODOS",
    pendente: true,
    analise: true,
    resolvido: true,
  });

  // Usuário atual
  const usuario = getUser();
  const usuarioId = usuario?.id;
  const isAdmin = usuario?.perfil === "ADMIN";

  useEffect(() => {
    async function carregarOcorrencias() {
      try {
        const lista = isAdmin
          ? await listarTodas()
          : await listarPorUsuario(usuarioId);

        const formatado = lista.map((o) => ({
          id: o.id,
          titulo: o.titulo,
          data: new Date(o.dataCriacao).toLocaleDateString("pt-BR"),
          status: o.status,
          tipo: o.tipoNome,
        }));

        setOcorrencias(formatado);

      } catch (e) {
        console.error("Erro ao carregar ocorrências:", e);
      }
    }

    carregarOcorrencias();
  }, [usuarioId, isAdmin]);

  useEffect(() => {
    async function carregarTipos() {
      try {
        const lista = await listarTipos();
        setTipos(lista);
      } catch (e) {
        console.error("Erro ao carregar tipos:", e);
      }
    }

    carregarTipos();
  }, []);

  // ==========================================================
  // 🔍 3) APLICAR FILTRO SOMENTE AO CLICAR NO BOTÃO
  // ==========================================================
  const aplicarFiltros = () => {
    setTipo(filtrosPendentes.tipo);
    setStatus({
      pendente: filtrosPendentes.pendente,
      analise: filtrosPendentes.analise,
      resolvido: filtrosPendentes.resolvido,
    });
  };

  const limparFiltros = () => {
    setFiltrosPendentes({
      tipo: "TODOS",
      pendente: true,
      analise: true,
      resolvido: true,
    });

    setTipo("TODOS");
    setStatus({
      pendente: true,
      analise: true,
      resolvido: true,
    });
  };

  // ==========================================================
  // 🔍 4) FILTRAR RESULTADOS
  // ==========================================================
  const ocorrenciasFiltradas = ocorrencias.filter((o) => {
    if (tipo !== "TODOS" && o.tipo !== tipo) return false;
    if (!status.pendente && o.status === "PENDENTE") return false;
    if (!status.analise && o.status === "EM_ANALISE") return false;
    if (!status.resolvido && o.status === "RESOLVIDO") return false;

    return true;
  });

  const badgeClass = (s) =>
    "status " +
    (s === "PENDENTE"
      ? "status--pendente"
      : s === "RESOLVIDA"
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

          <h2 className="ocorrencias__titulo">
            {isAdmin ? "TODAS AS OCORRÊNCIAS" : "OCORRÊNCIAS RECENTES"}
          </h2>

          <div className="ocorrencias__lista">
            {ocorrenciasFiltradas.length === 0 ? (
              <p className="ocorrencias__vazio">Nenhuma ocorrência encontrada.</p>
            ) : (
              ocorrenciasFiltradas.map((o) => (
                <article key={o.id} className="ocorrencias__cartao">
                  <div className="ocorrencias__info">
                    <h3>{o.titulo}</h3>
                    <p>{o.data}</p>
                  </div>
                  <span className={badgeClass(o.status)}>{o.status}</span>
                </article>
              ))
            )}
          </div>
        </section>

        <aside className="filtros">
          <h3>FILTRAR</h3>

          <div className="filtros__grupo">
            <label>TIPO</label>
            <select
              className="filtros__select"
              value={filtrosPendentes.tipo}
              onChange={(e) =>
                setFiltrosPendentes((prev) => ({ ...prev, tipo: e.target.value }))
              }
            >
              <option value="TODOS">TODOS</option>

              {tipos.map((t) => (
                <option key={t.id} value={t.nome}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="filtros__grupo">
            <legend>STATUS</legend>

            <div className="filtros__checks">

              <label className="filtros__check">
                <input
                  type="checkbox"
                  checked={filtrosPendentes.pendente}
                  onChange={() =>
                    setFiltrosPendentes((prev) => ({
                      ...prev,
                      pendente: !prev.pendente,
                    }))
                  }
                />
                PENDENTE
              </label>

              <label className="filtros__check">
                <input
                  type="checkbox"
                  checked={filtrosPendentes.analise}
                  onChange={() =>
                    setFiltrosPendentes((prev) => ({
                      ...prev,
                      analise: !prev.analise,
                    }))
                  }
                />
                EM ANÁLISE
              </label>

              <label className="filtros__check">
                <input
                  type="checkbox"
                  checked={filtrosPendentes.resolvido}
                  onChange={() =>
                    setFiltrosPendentes((prev) => ({
                      ...prev,
                      resolvido: !prev.resolvido,
                    }))
                  }
                />
                RESOLVIDO
              </label>

            </div>
          </fieldset>

          <button className="botao-filtrar" onClick={aplicarFiltros}>
            FILTRAR
          </button>

          <button className="botao-limpar" onClick={limparFiltros}>
            LIMPAR FILTROS
          </button>

        </aside>

      </main>
    </div>
  );
}
