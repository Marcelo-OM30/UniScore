"use client";
import Link from "next/link";
import { useState } from "react";

export default function AvaliarEvento() {
    const [avaliacao, setAvaliacao] = useState({
        nota: 0,
        titulo: '',
        comentario: '',
        impactoCultural: '',
        diversidadePromovida: 0,
        ampliacaoCosmivisao: 0,
        conexaoIntercultural: 0,
        identidadeCultural: '',
        mudancaPerspectiva: '',
        recomendaria: true,
        categoria: 'multicultural'
    });

    const [etapa, setEtapa] = useState(1);
    const totalEtapas = 3;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Avaliação submetida:', avaliacao);
        alert('Obrigado por sua avaliação transcultural! Sua perspectiva é valiosa para construir um ambiente universitário mais diverso e inclusivo.');
    };

    const proximaEtapa = () => {
        if (etapa < totalEtapas) setEtapa(etapa + 1);
    };

    const etapaAnterior = () => {
        if (etapa > 1) setEtapa(etapa - 1);
    };

    const renderStars = (current, setter) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(num => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => setter(num)}
                        className={`text-3xl transition-all duration-200 hover:scale-110 ${num <= current ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                            }`}
                    >
                        ⭐
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]">
            {/* Header Navigation */}
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
                <div className="relative z-10 container mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">Avaliação</span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Compartilhe como este evento impactou sua perspectiva cultural e visão de mundo
                        </p>
                    </div>

                    {/* Progresso */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {[1, 2, 3].map(num => (
                                <div key={num} className={`flex items-center ${num < totalEtapas ? 'flex-1' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${num <= etapa ? 'bg-white text-purple-600' : 'bg-white/20 text-white/60'
                                        }`}>
                                        {num}
                                    </div>
                                    {num < totalEtapas && (
                                        <div className={`flex-1 h-1 mx-2 ${num < etapa ? 'bg-white' : 'bg-white/20'
                                            }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center text-white/80">
                            Etapa {etapa} de {totalEtapas}
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulário */}
            <div className="container mx-auto px-6 -mt-8 relative z-20 pb-12">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">

                        {/* Etapa 1: Avaliação Geral */}
                        {etapa === 1 && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-white mb-4">📊 Avaliação Geral do Evento</h2>
                                    <p className="text-white/80">Como você avalia este evento de forma geral?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Nota Geral */}
                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                        <label className="block text-white font-bold mb-4">
                                            ⭐ Nota Geral do Evento
                                        </label>
                                        {renderStars(avaliacao.nota, (nota) => setAvaliacao({ ...avaliacao, nota }))}
                                        <div className="text-white/70 text-sm mt-2">
                                            {avaliacao.nota > 0 ? `${avaliacao.nota}/5 estrelas` : 'Selecione uma nota'}
                                        </div>
                                    </div>

                                    {/* Categoria do Evento */}
                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                        <label className="block text-white font-bold mb-4">
                                            🎭 Categoria Cultural
                                        </label>
                                        <select
                                            value={avaliacao.categoria}
                                            onChange={(e) => setAvaliacao({ ...avaliacao, categoria: e.target.value })}
                                            className="w-full bg-white/20 text-white rounded-xl p-3 border border-white/30 focus:border-white/60 focus:outline-none"
                                        >
                                            <option value="multicultural">🌍 Multicultural</option>
                                            <option value="indigena">🪶 Indígena</option>
                                            <option value="afro-brasileiro">👑 Afro-brasileiro</option>
                                            <option value="asiatico">🏮 Asiático</option>
                                            <option value="latino">💃 Latino-americano</option>
                                            <option value="inclusivo">🤝 Inclusivo</option>
                                            <option value="religioso">🕊️ Religioso/Espiritual</option>
                                            <option value="outro">🎨 Outro</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Título da Avaliação */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <label className="block text-white font-bold mb-4">
                                        📝 Título da sua avaliação
                                    </label>
                                    <input
                                        type="text"
                                        value={avaliacao.titulo}
                                        onChange={(e) => setAvaliacao({ ...avaliacao, titulo: e.target.value })}
                                        placeholder="Ex: Uma experiência transformadora que ampliou minha visão de mundo"
                                        className="w-full bg-white/20 text-white rounded-xl p-4 border border-white/30 focus:border-white/60 focus:outline-none placeholder-white/50"
                                    />
                                </div>

                                {/* Comentário Geral */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <label className="block text-white font-bold mb-4">
                                        💬 Seu comentário sobre o evento
                                    </label>
                                    <textarea
                                        value={avaliacao.comentario}
                                        onChange={(e) => setAvaliacao({ ...avaliacao, comentario: e.target.value })}
                                        placeholder="Descreva sua experiência geral no evento..."
                                        rows={4}
                                        className="w-full bg-white/20 text-white rounded-xl p-4 border border-white/30 focus:border-white/60 focus:outline-none placeholder-white/50 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Etapa 2: Impacto Cultural */}
                        {etapa === 2 && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-white mb-4">🌍 Impacto Intercultural</h2>
                                    <p className="text-white/80">Como este evento influenciou sua perspectiva cultural?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Diversidade Promovida */}
                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
                                        <div className="text-3xl mb-3"></div>
                                        <label className="block text-white font-bold mb-4">
                                            Diversidade Promovida
                                        </label>
                                        {renderStars(avaliacao.diversidadePromovida, (nota) => setAvaliacao({ ...avaliacao, diversidadePromovida: nota }))}
                                        <p className="text-white/70 text-sm mt-2">
                                            O evento valorizou diferentes culturas?
                                        </p>
                                    </div>

                                    {/* Ampliação da Cosmovisão */}
                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
                                        <div className="text-3xl mb-3"></div>
                                        <label className="block text-white font-bold mb-4">
                                            Ampliação da Cosmovisão
                                        </label>
                                        {renderStars(avaliacao.ampliacaoCosmivisao, (nota) => setAvaliacao({ ...avaliacao, ampliacaoCosmivisao: nota }))}
                                        <p className="text-white/70 text-sm mt-2">
                                            Expandiu sua visão de mundo?
                                        </p>
                                    </div>

                                    {/* Conexão Intercultural */}
                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
                                        <div className="text-3xl mb-3"></div>
                                        <label className="block text-white font-bold mb-4">
                                            Conexão Intercultural
                                        </label>
                                        {renderStars(avaliacao.conexaoIntercultural, (nota) => setAvaliacao({ ...avaliacao, conexaoIntercultural: nota }))}
                                        <p className="text-white/70 text-sm mt-2">
                                            Facilitou conexões entre culturas?
                                        </p>
                                    </div>
                                </div>

                                {/* Impacto na Identidade Cultural */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <label className="block text-white font-bold mb-4">
                                        🎭 Impacto na sua Identidade Cultural
                                    </label>
                                    <textarea
                                        value={avaliacao.identidadeCultural}
                                        onChange={(e) => setAvaliacao({ ...avaliacao, identidadeCultural: e.target.value })}
                                        placeholder="Como este evento influenciou ou reforçou sua identidade cultural? Descreva mudanças em sua autopercepção..."
                                        rows={4}
                                        className="w-full bg-white/20 text-white rounded-xl p-4 border border-white/30 focus:border-white/60 focus:outline-none placeholder-white/50 resize-none"
                                    />
                                </div>

                                {/* Mudança de Perspectiva */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <label className="block text-white font-bold mb-4">
                                        💡 Mudanças de Perspectiva
                                    </label>
                                    <textarea
                                        value={avaliacao.mudancaPerspectiva}
                                        onChange={(e) => setAvaliacao({ ...avaliacao, mudancaPerspectiva: e.target.value })}
                                        placeholder="Que preconceitos foram quebrados? Que novas perspectivas você adquiriu sobre outras culturas?"
                                        rows={4}
                                        className="w-full bg-white/20 text-white rounded-xl p-4 border border-white/30 focus:border-white/60 focus:outline-none placeholder-white/50 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Etapa 3: Confirmação */}
                        {etapa === 3 && (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-white mb-4">✅ Finalização</h2>
                                    <p className="text-white/80">Revise sua avaliação e confirme o envio</p>
                                </div>

                                {/* Resumo da Avaliação */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-xl font-bold text-white mb-4">📋 Resumo da sua avaliação</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="text-white/80 text-sm">Nota Geral</div>
                                            <div className="text-yellow-400 text-lg">
                                                {'⭐'.repeat(avaliacao.nota)} ({avaliacao.nota}/5)
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-white/80 text-sm">Categoria</div>
                                            <div className="text-white font-medium capitalize">{avaliacao.categoria.replace('-', ' ')}</div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="text-white/80 text-sm">Título</div>
                                            <div className="text-white font-medium">{avaliacao.titulo || 'Não informado'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recomendação */}
                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
                                    <label className="block text-white font-bold mb-4">
                                        🎯 Recomendaria este evento?
                                    </label>
                                    <div className="flex justify-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setAvaliacao({ ...avaliacao, recomendaria: true })}
                                            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${avaliacao.recomendaria
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white/20 text-white/70 hover:bg-white/30'
                                                }`}
                                        >
                                            👍 Sim, recomendo
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAvaliacao({ ...avaliacao, recomendaria: false })}
                                            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${!avaliacao.recomendaria
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white/20 text-white/70 hover:bg-white/30'
                                                }`}
                                        >
                                            👎 Não recomendo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Botões de Navegação */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
                            <div className="flex gap-4">
                                {etapa > 1 && (
                                    <button
                                        type="button"
                                        onClick={etapaAnterior}
                                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                                    >
                                        ← Anterior
                                    </button>
                                )}

                                <Link href="/">
                                    <button
                                        type="button"
                                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                                    >
                                        🏠 Início
                                    </button>
                                </Link>
                            </div>

                            {etapa < totalEtapas ? (
                                <button
                                    type="button"
                                    onClick={proximaEtapa}
                                    className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] text-gray-900 px-6 py-3 rounded-full font-bold hover:from-[#ffd93d] hover:to-[#ff5252] transition-all duration-300 shadow-xl"
                                >
                                    Próximo →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl"
                                >
                                    🚀 Enviar Avaliação
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}