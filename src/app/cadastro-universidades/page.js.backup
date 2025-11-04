"use client";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastroUniversidades() {
    const [formData, setFormData] = useState({
        nomeUniversidade: "",
        cnpj: "",
        emailInstitucional: "",
        telefone: "",
        endereco: "",
        responsavel: "",
        cargo: "",
        senha: "",
        confirmarSenha: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validações
        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não coincidem");
            setLoading(false);
            return;
        }

        // Validação básica - a validação de email institucional será feita pelo Firebase Security Rules

        try {
            // Criar conta no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.emailInstitucional,
                formData.senha
            );

            // Salvar dados da universidade no Firestore
            await setDoc(doc(db, "universidades", userCredential.user.uid), {
                nomeUniversidade: formData.nomeUniversidade,
                cnpj: formData.cnpj,
                emailInstitucional: formData.emailInstitucional,
                telefone: formData.telefone,
                endereco: formData.endereco,
                responsavel: formData.responsavel,
                cargo: formData.cargo,
                tipo: "universidade",
                status: "pendente", // Requer aprovação
                criadoEm: new Date().toISOString(),
                userId: userCredential.user.uid
            });

            router.push("/cadastro-sucesso-universidade");
        } catch (err) {
            console.error("Erro no cadastro:", err);
            setError(err.message || "Erro ao criar conta. Tente novamente.");
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
                <div className="w-full max-w-2xl relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
                            Cadastro <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">Institucional</span>
                        </h2>
                        <p className="text-xl text-white/90 font-medium">
                            Torne-se uma universidade parceira da UniScore
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 px-4 py-3 rounded-2xl text-center">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Nome da Universidade
                                    </label>
                                    <input
                                        type="text"
                                        name="nomeUniversidade"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="Universidade Federal do..."
                                        value={formData.nomeUniversidade}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        CNPJ
                                    </label>
                                    <input
                                        type="text"
                                        name="cnpj"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="00.000.000/0000-00"
                                        value={formData.cnpj}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-white mb-3">
                                    Email Institucional
                                </label>
                                <input
                                    type="email"
                                    name="emailInstitucional"
                                    className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                    placeholder="contato@universidade.edu.br"
                                    value={formData.emailInstitucional}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        name="telefone"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="(11) 99999-9999"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Endereço
                                    </label>
                                    <input
                                        type="text"
                                        name="endereco"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="Cidade, Estado"
                                        value={formData.endereco}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Responsável
                                    </label>
                                    <input
                                        type="text"
                                        name="responsavel"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="Nome completo"
                                        value={formData.responsavel}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Cargo
                                    </label>
                                    <input
                                        type="text"
                                        name="cargo"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="Reitor, Diretor, etc."
                                        value={formData.cargo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        name="senha"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="••••••••"
                                        value={formData.senha}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-white mb-3">
                                        Confirmar Senha
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmarSenha"
                                        className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-4 text-white placeholder-white/70 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                                        placeholder="••••••••"
                                        value={formData.confirmarSenha}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                <div className="text-sm text-white/90 leading-relaxed">
                                    <strong>Processo de Aprovação:</strong> Após o envio, nossa equipe irá revisar sua solicitação.
                                    O processo pode levar até 3 dias úteis. Você receberá um email com o resultado.
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] text-gray-900 px-8 py-4 rounded-full font-bold text-xl hover:from-[#ffd93d] hover:to-[#ff5252] transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                                        Enviando solicitação...
                                    </div>
                                ) : (
                                    "Solicitar Parceria"
                                )}
                            </button>

                            <div className="text-center">
                                <p className="text-white/80 text-sm mb-3">
                                    Já possui uma conta?
                                </p>
                                <Link href="/login-universidades">
                                    <button
                                        type="button"
                                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                                    >
                                        Fazer Login
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}