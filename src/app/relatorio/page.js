"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function RelatorioPublico() {
    const [animatedStats, setAnimatedStats] = useState({
        avaliacoes: 0,
        universidades: 0,
        usuarios: 0,
        eventos: 0
    });

    // Animação dos números
    useEffect(() => {
        const targets = {
            avaliacoes: 12847,
            universidades: 67,
            usuarios: 28394,
            eventos: 1205
        };

        const duration = 2000; // 2 segundos
        const steps = 60;
        const stepDuration = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats({
                avaliacoes: Math.floor(targets.avaliacoes * easeOut),
                universidades: Math.floor(targets.universidades * easeOut),
                usuarios: Math.floor(targets.usuarios * easeOut),
                eventos: Math.floor(targets.eventos * easeOut)
            });

            if (step >= steps) {
                clearInterval(timer);
                setAnimatedStats(targets);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

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
                        <Link href="/o-que-fazemos" className="hover:underline text-white">O que fazemos</Link>
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
                            Relatório <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">Público</span>
                        </h1>
                        <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Impacto intercultural no ensino superior brasileiro
                        </p>
                        <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white font-bold">Dados atualizados em tempo real</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-8 relative z-20">
                {/* Principais Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 backdrop-blur-sm rounded-3xl p-8 border border-green-400/30 text-center group hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="text-3xl">⭐</div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">{animatedStats.avaliacoes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <div className="text-white/80 text-lg">Avaliações Coletadas</div>
                        <div className="text-green-300 text-sm mt-2">+847 este mês</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-400/30 text-center group hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="text-3xl">🏛️</div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">{animatedStats.universidades}</div>
                        <div className="text-white/80 text-lg">Universidades Ativas</div>
                        <div className="text-blue-300 text-sm mt-2">+12 este trimestre</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-400/30 text-center group hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="text-3xl">👥</div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">{animatedStats.usuarios.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <div className="text-white/80 text-lg">Usuários Registrados</div>
                        <div className="text-purple-300 text-sm mt-2">+1.2k esta semana</div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm rounded-3xl p-8 border border-yellow-400/30 text-center group hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="text-3xl">🎪</div>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">{animatedStats.eventos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <div className="text-white/80 text-lg">Eventos Avaliados</div>
                        <div className="text-yellow-300 text-sm mt-2">+89 hoje</div>
                    </div>
                </div>

                {/* Gráficos de Crescimento */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Crescimento Mensal */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-8">📈 Crescimento de Usuários</h3>
                        <div className="h-80">
                            <div className="flex items-end justify-between h-full gap-3">
                                {[
                                    { mes: 'Jan', usuarios: 2100, crescimento: 15 },
                                    { mes: 'Fev', usuarios: 2850, crescimento: 35 },
                                    { mes: 'Mar', usuarios: 4200, crescimento: 47 },
                                    { mes: 'Abr', usuarios: 6100, crescimento: 45 },
                                    { mes: 'Mai', usuarios: 8900, crescimento: 46 },
                                    { mes: 'Jun', usuarios: 12400, crescimento: 39 },
                                    { mes: 'Jul', usuarios: 16800, crescimento: 35 },
                                    { mes: 'Ago', usuarios: 21200, crescimento: 26 },
                                    { mes: 'Set', usuarios: 25100, crescimento: 18 },
                                    { mes: 'Out', usuarios: 28394, crescimento: 13 }
                                ].map((item, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center group">
                                        <div className="w-full bg-gradient-to-t from-[#667eea] to-[#764ba2] rounded-t-xl flex flex-col items-center justify-end pb-3 text-white font-bold relative hover:from-[#5a6fd8] hover:to-[#6a4190] transition-all duration-300"
                                            style={{ height: `${(item.usuarios / 30000) * 100}%`, minHeight: '40px' }}>

                                            {/* Tooltip com número de usuários */}
                                            <div className="absolute -top-12 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 whitespace-nowrap shadow-xl">
                                                <div className="text-center">
                                                    <div className="text-lg text-green-300">
                                                        {item.usuarios.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </div>
                                                    <div className="text-xs text-white/80">usuários</div>
                                                </div>
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
                                            </div>

                                            {/* Percentual de crescimento */}
                                            <div className="absolute -top-3 bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-bold border border-green-400/30 backdrop-blur-sm">
                                                +{item.crescimento}%
                                            </div>

                                            {/* Valor dentro da barra para barras maiores */}
                                            {item.usuarios > 10000 && (
                                                <div className="text-white/90 text-xs font-bold mb-2">
                                                    {Math.round(item.usuarios / 1000)}k
                                                </div>
                                            )}
                                        </div>

                                        {/* Mês */}
                                        <div className="text-white font-bold text-sm mt-3 group-hover:text-white/90 transition-colors duration-300">
                                            {item.mes}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Eixo Y com referências */}
                            <div className="flex justify-between text-white/60 text-xs mt-4 px-2">
                                <span>0</span>
                                <span>10k</span>
                                <span>20k</span>
                                <span>30k usuários</span>
                            </div>
                        </div>

                        {/* Legenda */}
                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full">
                                <div className="w-3 h-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
                                <span className="text-white/80 text-sm">Usuários Totais</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-white/80 text-sm">% Crescimento</span>
                            </div>
                        </div>
                    </div>

                    {/* Distribuição por Região */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-8">🌎 Distribuição Regional</h3>
                        <div className="space-y-6">
                            {[
                                { regiao: 'Sudeste', porcentagem: 45, universidades: 28, cor: 'from-blue-400 to-blue-600' },
                                { regiao: 'Sul', porcentagem: 22, universidades: 15, cor: 'from-green-400 to-green-600' },
                                { regiao: 'Nordeste', porcentagem: 18, universidades: 12, cor: 'from-yellow-400 to-yellow-600' },
                                { regiao: 'Centro-Oeste', porcentagem: 10, universidades: 8, cor: 'from-purple-400 to-purple-600' },
                                { regiao: 'Norte', porcentagem: 5, universidades: 4, cor: 'from-red-400 to-red-600' }
                            ].map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-bold text-lg">{item.regiao}</span>
                                        <div className="text-right">
                                            <div className="text-white font-bold">{item.porcentagem}%</div>
                                            <div className="text-white/60 text-sm">{item.universidades} unis</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                                        <div className={`bg-gradient-to-r ${item.cor} h-4 rounded-full transition-all duration-1000 ease-out`}
                                            style={{ width: `${item.porcentagem}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Diversidade Cultural */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
                    <h3 className="text-4xl font-bold text-white text-center mb-12">Interculturalidade</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Impacto Cultural */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-2xl font-bold text-white mb-6">🌍 Impacto Intercultural dos Eventos</h4>
                            <div className="space-y-4">
                                {[
                                    { aspecto: 'Ampliação da cosmovisão', impacto: 92, icon: '🔭' },
                                    { aspecto: 'Conexão intercultural', impacto: 87, icon: '🤝' },
                                    { aspecto: 'Valorização da interculturalidade', impacto: 95, icon: '🌺' },
                                    { aspecto: 'Quebra de preconceitos', impacto: 89, icon: '💡' },
                                    { aspecto: 'Consciência global', impacto: 91, icon: '🌎' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="text-2xl">{item.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-white font-medium">{item.aspecto}</span>
                                                <span className="text-white font-bold">{item.impacto}%</span>
                                            </div>
                                            <div className="w-full bg-white/20 rounded-full h-3">
                                                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${item.impacto}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Diversidade dos Participantes */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h4 className="text-2xl font-bold text-white mb-6">👥 Diversidade dos Participantes</h4>
                            <div className="space-y-6">
                                {[
                                    {
                                        categoria: 'Origem Cultural',
                                        dados: [
                                            { nome: 'Brasileira', valor: 68, cor: 'from-green-400 to-green-600' },
                                            { nome: 'Latino-americana', valor: 15, cor: 'from-yellow-400 to-yellow-600' },
                                            { nome: 'Africana/Afro-brasileira', valor: 8, cor: 'from-red-400 to-red-600' },
                                            { nome: 'Asiática', valor: 5, cor: 'from-blue-400 to-blue-600' },
                                            { nome: 'Europeia/Outras', valor: 4, cor: 'from-purple-400 to-purple-600' }
                                        ]
                                    }
                                ].map((grupo, groupIndex) => (
                                    <div key={groupIndex}>
                                        <h5 className="text-lg font-bold text-white mb-3">{grupo.categoria}</h5>
                                        <div className="space-y-2">
                                            {grupo.dados.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <span className="text-white/90 text-sm">{item.nome}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-white/20 rounded-full h-2">
                                                            <div className={`bg-gradient-to-r ${item.cor} h-2 rounded-full transition-all duration-1000 ease-out`}
                                                                style={{ width: `${item.valor * 2}%` }}></div>
                                                        </div>
                                                        <span className="text-white font-bold text-sm w-8">{item.valor}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Eventos por Categoria Cultural */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h4 className="text-2xl font-bold text-white mb-6 text-center">🎭 Eventos por Categoria Cultural</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { tipo: 'Multiculturais', quantidade: 234, icon: '🌍', cor: 'from-blue-400 to-blue-600' },
                                { tipo: 'Indígenas', quantidade: 89, icon: '🪶', cor: 'from-green-400 to-green-600' },
                                { tipo: 'Afro-brasileiros', quantidade: 156, icon: '👑', cor: 'from-yellow-400 to-yellow-600' },
                                { tipo: 'Asiáticos', quantidade: 67, icon: '🏮', cor: 'from-red-400 to-red-600' },
                                { tipo: 'Latinos', quantidade: 123, icon: '💃', cor: 'from-purple-400 to-purple-600' },
                                { tipo: 'Religiosos', quantidade: 112, icon: '🕊️', cor: 'from-cyan-400 to-cyan-600' },
                                { tipo: 'Inclusivos', quantidade: 98, icon: '🤝', cor: 'from-pink-400 to-pink-600' }
                            ].map((evento, index) => (
                                <div key={index} className={`bg-gradient-to-br ${evento.cor}/20 rounded-2xl p-4 text-center border border-white/10 hover:scale-105 transition-all duration-300`}>
                                    <div className="text-3xl mb-2">{evento.icon}</div>
                                    <div className="text-xl font-bold text-white">{evento.quantidade}</div>
                                    <div className="text-white/80 text-xs">{evento.tipo}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Métricas de Qualidade */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
                    <h3 className="text-4xl font-bold text-white text-center mb-12">🏆 Métricas de Qualidade</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-4xl">🎯</div>
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">4.8/5</div>
                            <div className="text-white/80 text-xl">Nota Média Global</div>
                            <div className="text-green-300 mt-2">↗️ +0.3 este ano</div>
                        </div>

                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-4xl">💬</div>
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">94%</div>
                            <div className="text-white/80 text-xl">Taxa de Satisfação</div>
                            <div className="text-blue-300 mt-2">↗️ +2% este mês</div>
                        </div>

                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-4xl">🔄</div>
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">87%</div>
                            <div className="text-white/80 text-xl">Taxa de Retorno</div>
                            <div className="text-purple-300 mt-2">↗️ +5% este trimestre</div>
                        </div>
                    </div>

                    {/* Distribuição de Notas */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h4 className="text-2xl font-bold text-white mb-6 text-center">⭐ Distribuição de Avaliações</h4>
                        <div className="space-y-4">
                            {[
                                { estrelas: 5, quantidade: 6723, porcentagem: 52 },
                                { estrelas: 4, quantidade: 4111, porcentagem: 32 },
                                { estrelas: 3, quantidade: 1670, porcentagem: 13 },
                                { estrelas: 2, quantidade: 257, porcentagem: 2 },
                                { estrelas: 1, quantidade: 129, porcentagem: 1 }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 w-16">
                                        <span className="text-white font-bold text-lg">{item.estrelas}</span>
                                        <span className="text-yellow-300 text-lg">★</span>
                                    </div>
                                    <div className="flex-1 bg-white/20 rounded-full h-6 relative overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-6 rounded-full transition-all duration-1000 ease-out relative"
                                            style={{ width: `${item.porcentagem}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="text-white/90 text-sm w-20">{item.quantidade.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                    <div className="text-white font-bold text-lg w-16">{item.porcentagem}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rankings e Destaques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Top Universidades */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-8">🏅 Top Universidades</h3>
                        <div className="space-y-4">
                            {[
                                { nome: 'USP', nota: 4.9, avaliacoes: 1247, posicao: 1 },
                                { nome: 'UNICAMP', nota: 4.8, avaliacoes: 983, posicao: 2 },
                                { nome: 'UFRJ', nota: 4.7, avaliacoes: 856, posicao: 3 },
                                { nome: 'PUC-SP', nota: 4.7, avaliacoes: 734, posicao: 4 },
                                { nome: 'UFMG', nota: 4.6, avaliacoes: 692, posicao: 5 }
                            ].map((uni, index) => (
                                <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${uni.posicao === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900' :
                                        uni.posicao === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                                            uni.posicao === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                                                'bg-white/20 text-white'
                                        }`}>
                                        {uni.posicao}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white font-bold text-lg">{uni.nome}</div>
                                        <div className="text-white/70 text-sm">{uni.avaliacoes} avaliações</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-yellow-300">
                                            <span className="text-white font-bold text-xl">{uni.nota}</span>
                                            <span>★</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eventos em Destaque */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-8">🔥 Eventos em Destaque</h3>
                        <div className="space-y-4">
                            {[
                                { nome: 'TechWeek 2024', uni: 'USP', participantes: 2847, nota: 4.9 },
                                { nome: 'Startup Summit', uni: 'UNICAMP', participantes: 1923, nota: 4.8 },
                                { nome: 'Innovation Fair', uni: 'UFRJ', participantes: 1654, nota: 4.8 },
                                { nome: 'Career Day', uni: 'PUC-SP', participantes: 1432, nota: 4.7 },
                                { nome: 'Science Festival', uni: 'UFMG', participantes: 1287, nota: 4.7 }
                            ].map((evento, index) => (
                                <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-white font-bold text-lg">{evento.nome}</div>
                                        <div className="flex items-center gap-1 text-yellow-300">
                                            <span className="text-white font-bold">{evento.nota}</span>
                                            <span>★</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-white/70 text-sm">
                                        <span>{evento.uni}</span>
                                        <span>{evento.participantes} participantes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Impacto Social */}
                <div className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] rounded-3xl p-12 text-center shadow-2xl mb-12">
                    <h3 className="text-5xl font-bold text-gray-900 mb-8">💫 Nosso Impacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">15M+</div>
                            <div className="text-gray-800 text-lg">Visualizações de Eventos</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">89%</div>
                            <div className="text-gray-800 text-lg">Eventos Melhorados</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">R$ 2.3M</div>
                            <div className="text-gray-800 text-lg">Economia em Pesquisas</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
                            <div className="text-gray-800 text-lg">Recomendação NPS</div>
                        </div>
                    </div>
                    <p className="text-xl text-gray-800 max-w-4xl mx-auto mb-8">
                        Transformando a experiência universitária através de feedback transparente e dados confiáveis
                    </p>
                    <Link
                        href="/"
                        className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-xl inline-flex items-center gap-2"
                    >
                        <span>🏠</span>
                        Voltar ao Início
                    </Link>
                </div>
            </div>
        </div>
    );
}
