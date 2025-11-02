"use client";
import Link from "next/link";

export default function ParaUniversidades() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#20b2aa] to-[#48d1cc] font-sans">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <img src="/uniscore-logo.png" alt="UniScore Logo" className="h-8 w-auto max-w-[120px] cursor-pointer" />
                    </Link>
                    <span className="text-xl font-bold tracking-tight">UniScore for Universities</span>
                </div>
                <nav className="hidden md:flex gap-8 text-sm">
                    <div className="relative group">
                        <button className="hover:underline flex items-center gap-1">
                            Soluções <span className="text-xs">▼</span>
                        </button>
                    </div>
                    <div className="relative group">
                        <button className="hover:underline flex items-center gap-1">
                            Recursos <span className="text-xs">▼</span>
                        </button>
                    </div>
                    <div className="relative group">
                        <button className="hover:underline flex items-center gap-1">
                            Preços <span className="text-xs">▼</span>
                        </button>
                    </div>
                    <div className="relative group">
                        <button className="hover:underline flex items-center gap-1">
                            Suporte <span className="text-xs">▼</span>
                        </button>
                    </div>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login-universidades" className="hover:underline">Iniciar sessão</Link>
                    <Link href="/cadastro-universidades">
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition border border-white">
                            Criar conta gratuita
                        </button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex items-center justify-between px-6 py-20 max-w-7xl mx-auto">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-5xl font-bold text-black mb-6 leading-tight">
                        A maior plataforma independente de avaliação de eventos universitários
                    </h1>
                    <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                        Atraia e mantenha estudantes com a plataforma de avaliação da UniScore e ferramentas poderosas de análise de eventos.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-900 transition">
                            Agendar uma demo
                        </button>
                        <button className="bg-[#1e90ff] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#4169e1] transition">
                            Iniciar teste gratuito de 14 dias
                        </button>
                    </div>
                </div>

                {/* Área para imagens */}
                <div className="flex-1 relative ml-12">
                    <div className="rounded-2xl shadow-2xl overflow-hidden">
                        <img src="/para_universidades.png" alt="UniScore para Universidades" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                        Por que universidades escolhem a UniScore?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-[#20b2aa] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Análises Detalhadas</h3>
                            <p className="text-gray-600">Obtenha insights valiosos sobre seus eventos com relatórios completos e métricas de satisfação.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-[#48d1cc] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Maior Engajamento</h3>
                            <p className="text-gray-600">Aumente a participação em eventos com avaliações transparentes e feedback construtivo.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-[#00ced1] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Reputação Fortalecida</h3>
                            <p className="text-gray-600">Construa uma reputação sólida com avaliações reais de estudantes e visitantes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-16">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">Pronto para transformar seus eventos?</h2>
                    <p className="text-xl mb-8">Junte-se às universidades que já usam a UniScore para melhorar seus eventos.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/cadastro-universidades">
                            <button className="bg-[#00ced1] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#20b2aa] transition">
                                Criar conta gratuita
                            </button>
                        </Link>
                        <button className="border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition">
                            Falar com especialista
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}