import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/login.css";
import { salvarUsuario } from "../../services/usuario";

export default function PaginaCadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function formatarCpf(valor) {
    valor = valor.replace(/\D/g, ""); // remove caracteres não numéricos

    if (valor.length > 3 && valor.length <= 6) {
      valor = valor.replace(/(\d{3})(\d+)/, "$1.$2");
    } else if (valor.length > 6 && valor.length <= 9) {
      valor = valor.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    } else if (valor.length > 9) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
    }

    return valor;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    const usuario = {
      nome,
      cpf,
      email,
      telefone: "",
      endereco: null,
      perfil: "CIDADAO",
      senha
    };

    try {
      setLoading(true);
      await salvarUsuario(usuario);

      alert("Usuário cadastrado com sucesso!");
      navigate("/login");

    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.mensagem || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        
        <aside className="left-hero">
          <div className="brand-chip">
            <span className="chip-icon"></span>
            <span>Amigos do Bairro</span>
          </div>

          <div className="hero-text">
            <h1>
              Crie sua conta <br /> e ajude seu bairro
            </h1>
            <p>Cadastre-se para registrar demandas e acompanhar as melhorias.</p>
          </div>

          <div className="hero-chart">
            <span className="bar b1" />
            <span className="bar b2" />
            <span className="bar b3" />
            <span className="bar b4" />
            <span className="bar b5" />
          </div>
        </aside>

        <main className="right-form">
          <header className="form-header">
            <h2>Criar conta</h2>
            <p>Preencha seus dados para acessar a plataforma</p>
          </header>

          <form onSubmit={onSubmit} className="form">

            <div className="input-group">
              <label className="label">Nome completo</label>
              <div className="field">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">CPF</label>
              <div className="field">
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={cpf}
                  onChange={(e) => setCpf(formatarCpf(e.target.value))}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">E-mail</label>
              <div className="field">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">Senha</label>
              <div className="field">
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">Confirmar senha</label>
              <div className="field">
                <input
                  type="password"
                  placeholder="Repita a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
            </div>

            {/* ERRO */}
            {erro && <p className="error">{erro}</p>}

            {/* BOTÃO */}
            <button className="cta" type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <div className="divider">
            <span>Já tem uma conta?</span>
          </div>

          <footer className="signup">
            <p>Voltar para login</p>
            <Link to="/login" className="ghost">
              Ir para o login
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
