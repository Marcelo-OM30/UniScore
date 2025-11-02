"use client";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginUniversidades() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Redirecionar para dashboard específico de universidades
                router.push("/dashboard-universidade");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Validação de email institucional será feita pelo Firebase Security Rules
            // Aqui fazemos apenas o login básico

            await signInWithEmailAndPassword(auth, email, senha);
            router.push("/dashboard-universidade");
        } catch (err) {
            console.error("Erro no login:", err);
            if (err.code === 'auth/user-not-found') {
                setError("Usuário não encontrado. Verifique se sua universidade está cadastrada.");
            } else if (err.code === 'auth/wrong-password') {
                setError("Senha incorreta. Tente novamente.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Email inválido. Verifique o formato do email.");
            } else {
                setError(err.message || "Erro ao fazer login. Verifique suas credenciais.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-[#ff6b6b]/20 rounded-full blur-lg animate-bounce"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#4ecdc4]/15 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-[#ffe066]/20 rounded-full blur-xl animate-bounce"></div>

            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
                <Link href="/para-universidades" className="flex items-center gap-4 text-white hover:text-white/80 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    <span className="font-bold text-lg">Voltar</span>
                </Link>
                <h1 className="text-2xl font-bold text-white">UniScore for Universities</h1>
                <div className="w-20"></div>
            </header>

            {/* Conteúdo principal */}
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
                            Acesso <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">Institucional</span>
                        </h2>
                        <p className="text-xl text-white/90 font-medium">
                            Login exclusivo para universidades parceiras
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-4 py-3 rounded-2xl text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-lg font-bold text-white mb-3">
                                    Email Institucional
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                    placeholder="reitor@universidade.edu.br"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <div className="text-sm text-white/70 mt-2">
                                    Use seu email oficial da instituição
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-white mb-3">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                    placeholder="••••••••"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] text-gray-900 px-8 py-4 rounded-full font-bold text-xl hover:from-[#ffd93d] hover:to-[#ff5252] transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                                        Entrando...
                                    </div>
                                ) : (
                                    "Acessar Dashboard"
                                )}
                            </button>

                            <div className="text-center space-y-4">
                                <button
                                    type="button"
                                    className="text-white/80 hover:text-white underline transition-colors"
                                >
                                    Esqueceu sua senha?
                                </button>

                                <div className="border-t border-white/20 pt-4">
                                    <p className="text-white/80 text-sm mb-3">
                                        Sua universidade ainda não é parceira?
                                    </p>
                                    <Link href="/cadastro-universidades">
                                        <button
                                            type="button"
                                            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                                        >
                                            Solicitar Parceria
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-white/70 text-sm">
                            Precisa de ajuda? Entre em contato com nosso suporte especializado para instituições de ensino.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}