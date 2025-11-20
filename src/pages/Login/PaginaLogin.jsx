import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { loginMock } from "../../services/authMock";

export default function PaginaLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      loginMock(email, password);
      if (remember) localStorage.setItem("rememberedEmail", email);
      navigate("/home");
    } catch (err) {
      setErro(err.message || "Falha no login");
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
              Transforme
              <br />
              sua cidade
            </h1>
            <p>
              A plataforma que conecta cidadãos e resolve problemas urbanos de
              forma colaborativa
            </p>
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
            <h2>Bem-vindo amigo do bairro!</h2>
            <p>Entre com suas credenciais e faça a diferença</p>
          </header>

          <form onSubmit={onSubmit} className="form">
            <div className="input-group">
              <label className="label">E-mail ou Usuário</label>
              <div className="field">
                <span className="icon icon--user" aria-hidden></span>
                <input
                  type="text"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">Senha</label>
              <div className="field">
                <span className="icon icon--lock" aria-hidden></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={`eye ${showPassword ? "eye--on" : "eye--off"}`}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Mostrar/ocultar senha"
                />
              </div>
            </div>

            <div className="row options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Lembrar-me
              </label>
              <a className="forgot" href="#">
                Esqueci minha senha
              </a>
            </div>

            {erro && <p className="error">{erro}</p>}

            <button className="cta" disabled={loading}>
              {loading ? "Entrando..." : "Entrar na plataforma"}
            </button>
          </form>

          <div className="divider">
            <span>Novo por aqui?</span>
          </div>

          <footer className="signup">
            <p>Crie sua conta gratuitamente</p>
            <Link to="/cadastro" className="ghost">
              Criar minha conta
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
