"use client";
import Link from "next/link";

export default function OQueFazemos() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]">
            {/* Header */}
            <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-4 text-white hover:text-white/80 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        <span className="font-bold text-lg">UniScore</span>
                    </Link>

                    <nav className="hidden md:flex gap-8 text-sm">
                        <Link href="/forum" className="hover:underline flex items-center gap-1 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            Fórum
                        </Link>
                        <Link href="/relatorio" className="hover:underline text-white">Relatórios</Link>
                    </nav>

                    <div className="w-20"></div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            O que <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">fazemos</span>
                        </h1>
                        <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Revolucionamos a forma como universidades e estudantes se conectam através de feedback valioso
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 -mt-8 relative z-20">
                {/* Video Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-white mb-4">Conheça Nossa Plataforma</h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto">
                            Descubra como o UniScore conecta culturas através de avaliações transparentes de eventos universitários
                        </p>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="relative group">
                            <video
                                width="800"
                                height="450"
                                controls
                                className="rounded-2xl shadow-2xl border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
                                poster="/video-poster.jpg"
                            >
                                <source src="/Avalie_o_Impacto_dos_Eventos_Universitrios_com_Nos.mp4" type="video/mp4" />
                                Seu navegador não suporta o elemento de vídeo.
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] rounded-2xl flex items-center justify-center">
                                <div className="text-3xl">🎯</div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">Nossa Missão</h3>
                                <p className="text-white/80">Conectando culturas através de eventos universitários</p>
                            </div>
                        </div>
                        <p className="text-lg text-white/90 leading-relaxed">
                            O UniScore é uma plataforma para avaliação de eventos universitários que promove
                            <strong className="text-white"> transparência e intercâmbio cultural</strong>. Conectamos estudantes de diferentes origens,
                            permitindo que compartilhem experiências e <strong className="text-white">avaliem o impacto dos eventos</strong> em suas vidas acadêmicas e pessoais.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-2xl flex items-center justify-center">
                                <div className="text-3xl">🚀</div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white">Impacto dos Eventos</h3>
                                <p className="text-white/80">Avalie e compartilhe experiências</p>
                            </div>
                        </div>
                        <p className="text-lg text-white/90 leading-relaxed">
                            Compartilhe como os eventos <strong className="text-white">impactaram sua formação acadêmica e pessoal</strong>.
                            Avalie aspectos como qualidade, organização, relevância e também
                            <strong className="text-white"> intercâmbio cultural e diversidade</strong> promovidos.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
                    <h3 className="text-4xl font-bold text-white text-center mb-12">O que oferecemos</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-3xl">⭐</div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Avaliações Transparentes</h4>
                            <p className="text-white/80">Sistema de notas e comentários para eventos universitários com total transparência</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#f093fb] to-[#f5576c] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-3xl">💬</div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Intercâmbio Cultural</h4>
                            <p className="text-white/80">Conecte-se com pessoas de diferentes origens e compartilhe experiências</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-3xl">⭐</div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Avaliação de Qualidade</h4>
                            <p className="text-white/80">Avalie aspectos como organização, conteúdo e impacto dos eventos</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#a8edea] to-[#fed6e3] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-3xl">📊</div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Analytics para Universidades</h4>
                            <p className="text-white/80">Relatórios detalhados sobre o impacto e qualidade dos eventos universitários</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-3xl">🛡️</div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Rede de Contatos</h4>
                            <p className="text-white/80">Conecte-se com outros participantes e amplie sua rede acadêmica e profissional</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-3xl">�</div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">Desenvolvimento Acadêmico</h4>
                            <p className="text-white/80">Acompanhe como os eventos contribuem para sua formação e crescimento pessoal</p>
                        </div>
                    </div>
                </div>

                {/* Impact Stats */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
                    <h3 className="text-4xl font-bold text-white text-center mb-12">Nosso Impacto</h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-white mb-2">25+</div>
                            <div className="text-white/80 text-lg">Universidades Parceiras</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-white mb-2">10k+</div>
                            <div className="text-white/80 text-lg">Eventos Avaliados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-white mb-2">50k+</div>
                            <div className="text-white/80 text-lg">Estudantes Ativos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-white mb-2">4.8★</div>
                            <div className="text-white/80 text-lg">Satisfação Geral</div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] rounded-3xl p-12 text-center shadow-2xl mb-12">
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Pronto para fazer a diferença?</h3>
                    <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                        Junte-se à revolução da transparência universitária e ajude a construir um futuro melhor para a educação superior
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            href="/cadastro"
                            className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl"
                        >
                            Começar Agora
                        </Link>
                        <Link
                            href="/"
                            className="bg-white/20 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-gray-900/20"
                        >
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
