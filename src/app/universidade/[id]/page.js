"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function UniversidadePage() {
    const { id } = useParams();
    const [universidade, setUniversidade] = useState(null);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("/universidades.json")
            .then(res => res.json())
            .then(data => {
                const uni = data.find(u => String(u.id) === String(id));
                setUniversidade(uni);
            });
        // TODO: buscar avaliações da universidade (mock ou Firestore)
    }, [id]);

    // Mock para distribuição de estrelas
    const starDist = [15, 4, 1, 1, 0]; // 5, 4, 3, 2, 1 estrelas
    const total = starDist.reduce((a, b) => a + b, 0);
    const avg = total ? ((starDist[0] * 5 + starDist[1] * 4 + starDist[2] * 3 + starDist[3] * 2 + starDist[4] * 1) / total).toFixed(1) : "-";

    if (!universidade) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] flex items-center justify-center">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <div className="text-white/90 text-lg">Carregando universidade...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-[#ff6b6b]/20 rounded-full blur-lg animate-bounce"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#4ecdc4]/15 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 bg-[#ffe066]/20 rounded-full blur-xl animate-bounce"></div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-4 text-white hover:text-white/80 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        <span className="font-bold text-lg">Voltar</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-white">UniScore</h1>

                    <nav className="hidden md:flex gap-8 text-sm">
                        <Link href="/forum" className="hover:underline flex items-center gap-1 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            Fórum
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Conteúdo principal */}
            <div className="container mx-auto px-6 py-12 relative z-10">
                {/* Hero Section com logo e nome da universidade */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl border-4 border-white/20">
                            <img src={universidade.imagem} alt={universidade.nome} className="w-full h-full object-cover rounded-full" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {universidade.nome}
                    </h2>
                    <p className="text-xl text-white/90 mb-6">{universidade.sigla}</p>
                    <a
                        href="https://www.mackenzie.br/universidade/conheca-a-universidade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/40 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visitar site oficial
                    </a>
                </div>

                {/* Grid com vídeo e estatísticas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Vídeo */}
                    <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Conheça a Universidade</h3>
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/j-QzD0tXQXc?si=AD9N5d4Wf_4af0QU"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                    {/* Card de avaliações */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="text-6xl font-extrabold text-white mb-2">{avg}</div>
                            <div className="flex items-center justify-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-6 h-6 ${i < Math.round(parseFloat(avg)) ? 'text-yellow-400' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="text-lg font-medium text-white/90">Excelente</div>
                        </div>

                        <div className="space-y-3 mb-6">
                            {[5, 4, 3, 2, 1].map((star, i) => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="text-white/80 text-sm w-16">{star} estrelas</span>
                                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                                            style={{ width: `${total ? (starDist[5 - star] / total) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-white/70 text-sm w-8 text-right">{starDist[5 - star]}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-4 border-t border-white/20">
                            <div className="text-white/80 text-sm">{total} avaliações totais</div>
                        </div>
                    </div>
                </div>

                {/* Botão de avaliação */}
                <div className="text-center mb-12">
                    <Link
                        href="/avaliar"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-[#ffd93d] hover:to-[#ff5252] transition-all duration-300 shadow-2xl transform hover:scale-105"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Escreva uma avaliação
                    </Link>
                </div>

                {/* Seção de avaliações */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        Avaliações da Comunidade
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Avaliação 1 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] p-0.5">
                                    <img src="/avatar-default.png" alt="Avatar" className="w-full h-full rounded-full object-cover bg-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">Kelson Carvalho</div>
                                    <div className="text-sm text-white/60">16 de set. de 2025</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-white/90 leading-relaxed">
                                Ótima estrutura e professores qualificados. A universidade oferece excelentes oportunidades de aprendizado e desenvolvimento profissional.
                            </p>
                        </div>

                        {/* Avaliação 2 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f093fb] to-[#ff6b6b] p-0.5">
                                    <img src="/avatar-feminino-default.jpg" alt="Avatar" className="w-full h-full rounded-full object-cover bg-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-white">Renato Elesbão Renson</div>
                                    <div className="text-sm text-white/60">24 de jul. de 2025</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <svg className="w-5 h-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <p className="text-white/90 leading-relaxed">
                                Ambiente acolhedor e inovador. Os eventos e atividades extracurriculares são muito bem organizados e enriquecedores.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};