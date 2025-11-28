import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./registro.css";

import { listarTipos } from "../../services/tipoService";
import { salvarOcorrencia } from "../../services/registroService";
import { getUser } from "../../services/auth";

export default function RegistroPage() {
  const [tipos, setTipos] = useState([]);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [fotoArquivo, setFotoArquivo] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    urgencia: "",
    tipoId: "",
    endereco: {
      bairro: "",
      rua: "",
      numero: "",
      complemento: "",
      cep: "",
      cidade: "Paulista"
    }
  });

  const usuario = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function carregar() {
      const lista = await listarTipos();
      setTipos(lista);
    }
    carregar();
  }, []);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoArquivo(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const cancelarFoto = () => {
    setFotoArquivo(null);
    setPreviewFoto(null);
  };

  const atualizar = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const atualizarEndereco = (campo, valor) => {
    setForm({
      ...form,
      endereco: { ...form.endereco, [campo]: valor },
    });
  };

  const registrar = async () => {
    const dados = {
      ...form,
      usuarioId: usuario.id,
      status: "PENDENTE"
    };

    try {
      await salvarOcorrencia(dados, fotoArquivo);
      setSucesso(true);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao registrar ocorrência!");
    }
  };

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
            </svg>
          </div>
          <div className="logo-text">
            <h1>AMIGOS DO <br /> BAIRRO</h1>
          </div>
        </div>

        <div className="nav-buttons">
          <Link to="/home" className="nav-btn"> HOME </Link>
          <Link className="nav-btn" to="/perfil-usuario"> MEU PERFIL </Link>
          <Link className="nav-btn" to="/minhas-ocorrencias"> MINHAS OCORRÊNCIAS</Link>
          <Link to="/Pagina-Login" className="nav-btn nav-btn--danger"> SAIR </Link>
        </div>
      </div>

      <div className="main-content">

        <div className="form-section">
          
          <div className="form-group">
            <h3>TÍTULO DA OCORRÊNCIA:</h3>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => atualizar("titulo", e.target.value)}
              placeholder="Digite aqui:"
            />
          </div>

          <div className="form-group">
            <h3>DESCRIÇÃO:</h3>
            <textarea
              value={form.descricao}
              onChange={(e) => atualizar("descricao", e.target.value)}
              placeholder="Digite aqui:"
            />
          </div>

          <div className="form-group">
            <h3>TIPO:</h3>
            <select
              value={form.tipoId}
              onChange={(e) => atualizar("tipoId", e.target.value)}
            >
              <option value="">Selecione</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="address-group">
            <h3>ENDEREÇO</h3>

            <div className="address-field">
              <label>BAIRRO:</label>
              <input
                type="text"
                value={form.endereco.bairro}
                onChange={(e) => atualizarEndereco("bairro", e.target.value)}
              />
            </div>

            <div className="address-field">
              <label>RUA:</label>
              <input
                type="text"
                value={form.endereco.rua}
                onChange={(e) => atualizarEndereco("rua", e.target.value)}
              />
            </div>

            <div className="address-field">
              <label>NÚMERO:</label>
              <input
                type="text"
                value={form.endereco.numero}
                onChange={(e) => atualizarEndereco("numero", e.target.value)}
              />
            </div>

            <div className="address-field">
              <label>COMPLEMENTO:</label>
              <input
                type="text"
                value={form.endereco.complemento}
                onChange={(e) => atualizarEndereco("complemento", e.target.value)}
              />
            </div>
          </div>

        </div>

        <div className="photo-section">

          <div className="photo-upload">
            <h3>FOTO</h3>
            <div className="photo-preview">
              {previewFoto ? (
                <img src={previewFoto} />
              ) : (
                <div className="placeholder-text">Nenhuma foto selecionada</div>
              )}
            </div>

            <label htmlFor="file-upload" className="upload-btn">Escolher Foto</label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFoto}
              className="file-input-hidden"
            />

            {previewFoto && (
              <button className="cancelar-foto-btn" onClick={cancelarFoto}>
                Remover foto
              </button>
            )}
          </div>

          <div className="urgency-section">
            <h3>NÍVEL DE URGÊNCIA</h3>

            {["CRITICA", "ALTA", "MEDIA", "BAIXA"].map((u) => (
              <label key={u} className="urgency-option">
                <input
                  type="radio"
                  name="urgencia"
                  value={u}
                  checked={form.urgencia === u}
                  onChange={(e) => atualizar("urgencia", e.target.value)}
                />
                {u}
              </label>
            ))}
          </div>
        </div>

        <div className="submit-section">
          <button className="submit-btn" onClick={registrar}>
            Registrar Ocorrência
          </button>

          <Link to="/home" className="btn-voltar">
            Voltar
          </Link>
        </div>
      </div>

      {sucesso && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Ocorrência registrada com sucesso!</h2>

            <button className="modal-btn" onClick={() => navigate("/home")}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
