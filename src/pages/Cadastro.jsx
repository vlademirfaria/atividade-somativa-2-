import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    dataNascimento: ""
  });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    try {
      const credencial = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );

      await setDoc(doc(db, "usuarios", credencial.user.uid), {
        uid: credencial.user.uid,
        email: form.email,
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento
      });

      setMensagem("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha deve possuir pelo menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        setErro("Informe um e-mail válido.");
      } else {
        setErro("Não foi possível realizar o cadastro.");
      }
    }
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Cadastro</h1>
        <p className="subtitle">Crie seu usuário</p>

        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            minLength="6"
            required
          />

          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>Sobrenome</label>
          <input
            type="text"
            name="sobrenome"
            value={form.sobrenome}
            onChange={handleChange}
            required
          />

          <label>Data de nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p className="success">{mensagem}</p>}
        {erro && <p className="error">{erro}</p>}

        <p className="link-text">
          Já possui cadastro? <Link to="/login">Fazer login</Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;