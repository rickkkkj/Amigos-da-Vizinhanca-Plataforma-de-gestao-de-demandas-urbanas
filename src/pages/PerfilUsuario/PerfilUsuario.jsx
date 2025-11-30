import { useEffect, useState } from "react";
import "./PerfilUsuario.css";
import { Link, useNavigate } from "react-router-dom";
import { buscarUsuario, atualizarUsuario } from "../../services/usuario";
import { listarOcorrenciasPorUsuario } from "../../services/ocorrencias";

function formatarCpf(cpf = "") {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarTelefone(tel = "") {
  tel = tel.replace(/\D/g, "");
  if (tel.length <= 2) return `(${tel}`;
  if (tel.length <= 6) return tel.replace(/(\d{2})(\d{1,4})/, "($1) $2");
  if (tel.length <= 10) return tel.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
  return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function formatarData(dataStr) {
  if (!dataStr) return "—";
  const data = new Date(dataStr);
  if (isNaN(data)) return "—";
  return data.toLocaleDateString("pt-BR");
}

export default function PerfilUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    cep: "",
  });

  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    async function carregarTudo() {
      try {
        const dados = await buscarUsuario(user.id);
        setUsuario(dados);

        setForm({
          nome: dados.nome,
          cpf: formatarCpf(dados.cpf),
          telefone: formatarTelefone(dados.telefone || ""),
          email: dados.email,
          rua: dados.endereco?.rua || "",
          numero: dados.endereco?.numero || "",
          bairro: dados.endereco?.bairro || "",
          cidade: dados.endereco?.cidade || "",
          complemento: dados.endereco?.complemento || "",
          cep: dados.endereco?.cep || "",
        });

        const lista = await listarOcorrenciasPorUsuario(user.id);
        setOcorrencias(lista);

      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarTudo();
  }, [navigate]);

  if (loading || !usuario) {
    return <div className="perfil-page">Carregando...</div>;
  }

  function atualizarCampo(campo, valor) {
    if (campo === "cpf") valor = formatarCpf(valor);
    if (campo === "telefone") valor = formatarTelefone(valor);

    setForm(prev => ({ ...prev, [campo]: valor }));
  }


  function desfazer() {
    setForm({
      nome: usuario.nome,
      cpf: formatarCpf(usuario.cpf),
      telefone: formatarTelefone(usuario.telefone || ""),
      email: usuario.email,
      rua: usuario.endereco?.rua || "",
      numero: usuario.endereco?.numero || "",
      bairro: usuario.endereco?.bairro || "",
      cidade: usuario.endereco?.cidade || "",
      complemento: usuario.endereco?.complemento || "",
      cep: usuario.endereco?.cep || "",
    });
  }

  async function salvar() {
    setSalvando(true);

    try {
      const body = {
        id: usuario.id,
        nome: form.nome,
        cpf: form.cpf.replace(/\D/g, ""),
        telefone: form.telefone.replace(/\D/g, ""),
        email: form.email,
        perfil: usuario.perfil, // ← ADICIONADO AQUI
        endereco: {
          rua: form.rua,
          numero: form.numero,
          bairro: form.bairro,
          cidade: form.cidade,
          complemento: form.complemento,
          cep: form.cep,
        },
      };

      const atualizado = await atualizarUsuario(usuario.id, body);
      setUsuario(atualizado);

      alert("Dados atualizados com sucesso!");

    } catch (err) {
      console.error(err);
      alert("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  }


  return (
    <div className="perfil-page">

      {/* CABEÇALHO */}
      <header className="perfil-header">
        <div className="header-left">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#4ade80"
              />
            </svg>
          </div>
          <h1>AMIGOS DO<br />BAIRRO</h1>
        </div>

        <nav className="cabecalho__navegacao">
          <Link className="cabecalho__link" to="/home">HOME</Link>
          <Link className="cabecalho__link cabecalho__link--ativo" to="/perfil-usuario">MEU PERFIL</Link>
          <Link className="cabecalho__link" to="/minhas-ocorrencias">MINHAS OCORRÊNCIAS</Link>
          <Link
            className="cabecalho__link cabecalho__link--perigo"
            to="/login"
            onClick={() => localStorage.removeItem("user")}
          >
            SAIR
          </Link>
        </nav>
      </header>

      <main className="perfil-container">
        <div className="perfil-card">

          <section className="perfil-left">

            <div className="perfil-user">
              <div className="perfil-avatar">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#22c55e">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              </div>
              <div>
                <h2>{usuario.nome}</h2>
                <p>{usuario.perfil}</p>
              </div>
            </div>

            <div className="perfil-info">

              <label>Nome completo*:</label>
              <input type="text" value={form.nome} onChange={(e) => atualizarCampo("nome", e.target.value)} />

              <label>CPF*:</label>
              <input type="text" value={form.cpf} onChange={(e) => atualizarCampo("cpf", e.target.value)} />

              <label>Telefone:</label>
              <input type="text" value={form.telefone} onChange={(e) => atualizarCampo("telefone", e.target.value)} />

              <label>Email:</label>
              <input type="text" value={form.email} onChange={(e) => atualizarCampo("email", e.target.value)} />

              <label>Rua:</label>
              <input type="text" value={form.rua} onChange={(e) => atualizarCampo("rua", e.target.value)} />

              <label>Número:</label>
              <input type="text" value={form.numero} onChange={(e) => atualizarCampo("numero", e.target.value)} />

              <label>Bairro:</label>
              <input type="text" value={form.bairro} onChange={(e) => atualizarCampo("bairro", e.target.value)} />

              <label>Cidade:</label>
              <input type="text" value={form.cidade} onChange={(e) => atualizarCampo("cidade", e.target.value)} />

              <label>Complemento:</label>
              <input type="text" value={form.complemento} onChange={(e) => atualizarCampo("complemento", e.target.value)} />

              <label>CEP:</label>
              <input type="text" value={form.cep} onChange={(e) => atualizarCampo("cep", e.target.value)} />

            </div>

            <div className="perfil-buttons">
              <button className="btn-cancelar" onClick={desfazer}>Desfazer alterações</button>
              <button className="btn-salvar" onClick={salvar} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </section>

          <section className="perfil-right">
            <div className="registros-header">
              <svg width="26" height="26" fill="#22c55e" viewBox="0 0 24 24" style={{ marginRight: "8px" }}>
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
              </svg>
              <h3>Seus Registros</h3>
            </div>

            <p className="registros-count">
              Número de registros: <span>{ocorrencias.length}</span>
            </p>

            <div className="registros-list">
              {ocorrencias.map((o) => (
                <div key={o.id} className="registro-item">
                  <div className="registro-info">
                    <strong>{o.titulo}</strong> <span>ID: {o.id}</span>
                    <p>Data: {formatarData(o.dataCriacao)}</p>
                  </div>

                  <span className={`status-badge ${o.status}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="perfil-footer">
        <Link to="/home" className="btn-sair">Sair</Link>
      </footer>

    </div>
  );
}
