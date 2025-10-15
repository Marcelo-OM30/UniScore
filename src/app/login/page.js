"use client";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            window.location.href = "/";
        } catch (err) {
            setErro("Usuário ou senha inválidos.");
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setErro("");
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            window.location.href = "/";
        } catch (err) {
            setErro("Falha ao autenticar com Google.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <img src="/uniscore-logo.png" alt="UniScore Logo" className="h-16 mb-2" />
                    <h2 className="text-2xl font-bold text-blue-700">Entrar no UniScore</h2>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <div className="flex flex-col gap-2 mt-6">
                    <button
                        className="bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        Entrar com Google
                    </button>
                    <a href="#" className="text-blue-600 text-sm text-center hover:underline">
                        Não tem conta? Cadastre-se
                    </a>
                </div>
                {erro && <div className="text-red-500 text-center mt-4">{erro}</div>}
            </div>
        </div>
    );
}