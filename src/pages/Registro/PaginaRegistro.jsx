import { Link } from "react-router-dom";
import "./registro.css";

export default function RegistroPage() {
  return (
    <div className="container">
      <div className="header">
        <div className="logo-section">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="#4a8a5c"
              />
              <circle cx="12" cy="9" r="2.5" fill="#fff" />
              <circle cx="9" cy="11" r="1.2" fill="#4a8a5c" />
              <circle cx="15" cy="11" r="1.2" fill="#4a8a5c" />
              <circle cx="12" cy="13" r="1.2" fill="#4a8a5c" />
            </svg>
          </div>
          <div className="logo-text">
            <h1>
              AMIGOS DO
              <br />
              BAIRRO
            </h1>
          </div>
        </div>

        <div className="nav-buttons">
          <Link to="/home" className="nav-btn"> HOME </Link>
          <button className="nav-btn" to="/"> MEU PERFIL</button>
          <Link className="nav-btn" to="/minhas-ocorrencias"> MINHAS OCORRÊNCIAS</Link>
          <Link to="/Pagina-Login" className="nav-btn nav-btn--danger"> SAIR </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="form-section">
          <div className="form-group">
            <h3>TÍTULO DA OCORRÊNCIA:</h3>
            <input type="text" placeholder="Digite aqui:" />
          </div>

          <div className="form-group">
            <h3>DESCRIÇÃO:</h3>
            <textarea placeholder="Digite aqui:" />
          </div>

          <div className="address-group">
            <h3>ENDEREÇO</h3>

            <div className="address-field">
              <label>BAIRRO:</label>
              <input type="text" placeholder="Digite aqui:" />
            </div>

            <div className="address-field">
              <label>RUA:</label>
              <input type="text" placeholder="Digite aqui:" />
            </div>

            <div className="address-field">
              <label>NÚMERO:</label>
              <input type="text" placeholder="Digite aqui:" />
            </div>

            <div className="address-field">
              <label>COMPLEMENTO:</label>
              <input type="text" placeholder="Digite aqui:" />
            </div>
          </div>
        </div>

        <div className="photo-section">
          <div className="photo-upload">
            <h3>FOTO</h3>
            <div className="photo-preview">
              <img
                src="https://images.unsplash.com/photo-1589895987857-689a7ea8cb14?w=800&h=450&fit=crop"
                alt="Pré-visualização"
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <input type="file" accept="image/*" />
            </div>
          </div>

          <div className="urgency-section">
            <h3>NÍVEL DE URGÊNCIA</h3>
            <div className="urgency-options">
              {["CRÍTICA", "ALTA", "MÉDIA", "BAIXA"].map((lvl, i) => (
                <div key={i} className="urgency-option">
                  <input type="radio" name="urgency" id={`urg-${i}`} />
                  <label htmlFor={`urg-${i}`}>{lvl}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="submit-section">
          <button className="submit-btn">Registrar Ocorrência</button>
        </div>
      </div>
    </div>
  );
}
