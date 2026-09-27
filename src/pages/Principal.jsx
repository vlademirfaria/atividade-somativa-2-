import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";

function Principal() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const documento = await getDoc(doc(db, "usuarios", currentUser.uid));

        if (documento.exists()) {
          setUsuario(documento.data());
        } else {
          setErro("Dados do usuário não encontrados.");
        }
      } catch {
        setErro("Não foi possível carregar os dados do usuário.");
      }
    });

    return unsubscribe;
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  if (!usuario && !erro) {
    return <p className="loading">Carregando dados...</p>;
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Página Principal</h1>

        {erro ? (
          <p className="error">{erro}</p>
        ) : (
          <div className="user-data">
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
            <p>
              <strong>Data de nascimento:</strong>{" "}
              {new Date(`${usuario.dataNascimento}T00:00:00`).toLocaleDateString("pt-BR")}
            </p>
          </div>
        )}

        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </section>
    </main>
  );
}

export default Principal;