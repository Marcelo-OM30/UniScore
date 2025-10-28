"use client";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [avatar, setAvatar] = useState("/avatar-default.png");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso("");
        setLoading(true);
        try {
            // Cria usuário no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            // Atualiza displayName e avatar
            await updateProfile(user, { displayName: nome, photoURL: avatar });
            // Salva dados no Firestore
            await setDoc(doc(db, "usuarios", user.uid), {
                nome,
                avatar,
                email,
            });
            setSucesso("Cadastro realizado com sucesso!");
            setNome("");
            setEmail("");
            setSenha("");
            setAvatar("/avatar-default.png");
        } catch (err) {
            setErro("Erro ao cadastrar: " + err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-mackenzie-light">
            <form className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-mackenzie-red mb-4 text-center">Cadastro</h2>
                <div className="flex justify-center gap-4 mb-2">
                    <button
                        type="button"
                        className={`border-2 rounded-full p-1 ${avatar === "/avatar-default.png" ? "border-mackenzie-red" : "border-gray-200"}`}
                        onClick={() => setAvatar("/avatar-default.png")}
                        title="Avatar masculino"
                    >
                        <img src="/avatar-default.png" alt="Avatar masculino" className="w-12 h-12 rounded-full object-cover" />
                    </button>
                    <button
                        type="button"
                        className={`border-2 rounded-full p-1 ${avatar === "/avatar-feminino-default.jpg" ? "border-mackenzie-red" : "border-gray-200"}`}
                        onClick={() => setAvatar("/avatar-feminino-default.jpg")}
                        title="Avatar feminino"
                    >
                        <img src="/avatar-feminino-default.jpg" alt="Avatar feminino" className="w-12 h-12 rounded-full object-cover" />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
                {sucesso && <div className="text-green-600 text-center mt-2">{sucesso}</div>}
                {erro && <div className="text-red-600 text-center mt-2">{erro}</div>}
            </form>
        </div>
    );
}
