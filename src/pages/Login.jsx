import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch {
      setErro("Usuário não está cadastrado ou e-mail/senha estão incorretos.");
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Login</h1>
        <p className="subtitle">Acesse sua conta</p>

        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        {erro && <p className="error">{erro}</p>}

        <p className="link-text">
          Ainda não possui cadastro? <Link to="/cadastro">Cadastrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;