"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardUniversidade() {
    const [user, setUser] = useState(null);
    const [universidadeData, setUniversidadeData] = useState(null);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isUniversidade, setIsUniversidade] = useState(false);
    const [stats, setStats] = useState({
        totalAvaliacoes: 0,
        mediaGeral: 0,
        eventosAvaliados: 0,
        ultimaAvaliacao: null
    });
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);

                try {
                    // Tentar buscar dados da universidade - se o usuário não tiver permissão, será rejeitado pelo Firebase
                    const docRef = doc(db, "universidades", u.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setIsUniversidade(true);
                        setUniversidadeData(docSnap.data());
                    } else {
                        // Usuário logado mas não é uma universidade cadastrada
                        setError("Acesso negado: Esta área é exclusiva para universidades cadastradas.");
                        setTimeout(() => {
                            router.push("/");
                        }, 3000);
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados da universidade:", error);

                    // Se o erro for de permissão, significa que não é uma universidade
                    if (error.code === 'permission-denied') {
                        setError("Acesso negado: Esta área é exclusiva para universidades cadastradas.");
                    } else {
                        setError("Erro ao carregar dados da universidade. Tente novamente.");
                    }

                    setTimeout(() => {
                        router.push("/");
                    }, 3000);
                }
            } else {
                // Usuário não logado
                router.push("/login-universidades");
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        // Buscar avaliações apenas se for uma universidade válida
        if (user && universidadeData && isUniversidade && !error) {
            // Se o status for "pendente", mostrar dados de demonstração
            if (universidadeData.status === "pendente") {
                // Dados de demonstração para preview
                const demoAvaliacoes = [
                    {
                        id: "demo1",
                        usuario: "Ana Silva",
                        photoURL: null,
                        nota: 5,
                        comentario: "Excelente evento de tecnologia! A organização foi impecável e os palestrantes muito qualificados. Definitivamente participaria novamente.",
                        titulo: "Semana de Tecnologia 2024",
                        criadoEm: { toDate: () => new Date(Date.now() - 86400000) }
                    },
                    {
                        id: "demo2",
                        usuario: "Carlos Mendes",
                        photoURL: null,
                        nota: 4,
                        comentario: "Muito bom! O networking foi fantástico e aprendi bastante sobre as tendências do mercado. Única sugestão é melhorar o coffee break.",
                        titulo: "Feira de Profissões",
                        criadoEm: { toDate: () => new Date(Date.now() - 172800000) }
                    },
                    {
                        id: "demo3",
                        usuario: "Marina Santos",
                        photoURL: null,
                        nota: 5,
                        comentario: "Simplesmente incrível! As palestras sobre sustentabilidade abriram minha mente. Parabéns pela iniciativa da universidade.",
                        titulo: "Simpósio de Sustentabilidade",
                        criadoEm: { toDate: () => new Date(Date.now() - 259200000) }
                    },
                    {
                        id: "demo4",
                        usuario: "João Oliveira",
                        photoURL: null,
                        nota: 4,
                        comentario: "Workshop muito prático sobre empreendedorismo. Os casos apresentados foram relevantes e inspiradores.",
                        titulo: "Workshop de Empreendedorismo",
                        criadoEm: { toDate: () => new Date(Date.now() - 345600000) }
                    },
                    {
                        id: "demo5",
                        usuario: "Fernanda Costa",
                        photoURL: null,
                        nota: 5,
                        comentario: "Evento espetacular! A qualidade dos palestrantes e a infraestrutura estavam perfeitas. Já estou ansioso pelo próximo.",
                        titulo: "Congresso de Inovação",
                        criadoEm: { toDate: () => new Date(Date.now() - 432000000) }
                    },
                    {
                        id: "demo6",
                        usuario: "Rafael Lima",
                        photoURL: null,
                        nota: 4,
                        comentario: "Muito bem organizado! As atividades práticas complementaram perfeitamente a teoria apresentada nas palestras.",
                        título: "Semana Acadêmica",
                        criadoEm: { toDate: () => new Date(Date.now() - 518400000) }
                    }
                ];

                setAvaliacoes(demoAvaliacoes);
                setStats({
                    totalAvaliacoes: 1247,
                    mediaGeral: "4.7",
                    eventosAvaliados: 23,
                    ultimaAvaliacao: new Date()
                });
            } else {
                // Modo produção - buscar dados reais
                try {
                    const q = query(
                        collection(db, "avaliacoes"),
                        where("universidadeId", "==", user.uid)
                    );

                    const unsubscribe = onSnapshot(q, (snapshot) => {
                        const avaliacoesData = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        setAvaliacoes(avaliacoesData);

                        if (avaliacoesData.length > 0) {
                            const media = avaliacoesData.reduce((acc, av) => acc + av.nota, 0) / avaliacoesData.length;
                            const eventosUnicos = [...new Set(avaliacoesData.map(av => av.eventoId))];

                            setStats({
                                totalAvaliacoes: avaliacoesData.length,
                                mediaGeral: media.toFixed(1),
                                eventosAvaliados: eventosUnicos.length,
                                ultimaAvaliacao: avaliacoesData[0]?.criadoEm
                            });
                        } else {
                            setStats({
                                totalAvaliacoes: 0,
                                mediaGeral: 0,
                                eventosAvaliados: 0,
                                ultimaAvaliacao: null
                            });
                        }
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error("Erro ao buscar avaliações:", error);
                }
            }
        }
    }, [user, universidadeData, isUniversidade, error]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/para-universidades");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <div className="text-white/90 text-lg">Carregando dashboard...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl text-center max-w-md">
                    <div className="text-6xl mb-4">🚫</div>
                    <h2 className="text-3xl font-bold text-white mb-4">Acesso Negado</h2>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                        Esta área é exclusiva para universidades cadastradas. Você será redirecionado para a página inicial.
                    </p>
                    <div className="bg-white/20 rounded-2xl p-4 border border-white/30">
                        <div className="text-white/80 text-sm">
                            Redirecionando em alguns segundos...
                        </div>
                    </div>
                    <Link href="/" className="inline-block mt-4 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/30">
                        Ir para Home
                    </Link>
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

            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10 relative z-10">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-white hover:text-white/80 transition-colors">
                        <h1 className="text-2xl font-bold">UniScore</h1>
                    </Link>
                    <span className="text-white/80 text-lg">Dashboard Institucional</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-white/90 font-medium">
                        {universidadeData?.nomeUniversidade || "Universidade"}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="px-6 py-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Boas-vindas */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-extrabold text-white mb-4">
                            Bem-vinda, <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">
                                {universidadeData?.nomeUniversidade}
                            </span>
                        </h2>
                        <p className="text-xl text-white/90">
                            Gerencie suas avaliações e monitore o desempenho dos seus eventos
                        </p>
                    </div>

                    {/* Status da Conta */}
                    {universidadeData?.status === "pendente" && (
                        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] backdrop-blur-sm border border-white/30 text-white px-8 py-6 rounded-3xl mb-8 text-center shadow-2xl">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                    <div className="text-2xl">🔍</div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-2xl mb-1">Análise em Andamento</h3>
                                    <p className="text-white/90">Enquanto analisamos sua entrada na UniScore...</p>
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                <h4 className="font-bold text-xl mb-3 text-[#ffe066]">🎯 Explore uma prévia do seu futuro dashboard!</h4>
                                <p className="text-white/95 text-lg leading-relaxed">
                                    Descubra as poderosas ferramentas de análise que estarão disponíveis assim que sua parceria for aprovada.
                                    Este é apenas um vislumbre do potencial da plataforma UniScore para sua instituição.
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cards de Estatísticas Modernas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total de Avaliações */}
                        <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <div className="text-2xl">📊</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-white/70">Total</div>
                                    <div className="text-xs text-green-300">+15% este mês</div>
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">1,247</div>
                            <div className="text-white/80 font-medium">Avaliações Recebidas</div>
                            <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                                <div className="bg-white/60 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>

                        {/* Média Geral */}
                        <div className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <div className="text-2xl">⭐</div>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-lg ${i < 4 ? 'text-yellow-300' : 'text-white/30'}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">4.7</div>
                            <div className="text-white/80 font-medium">Rating Médio</div>
                            <div className="flex items-center gap-2 mt-3">
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                                <span className="text-xs text-white/70">94%</span>
                            </div>
                        </div>

                        {/* Eventos Ativos */}
                        <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <div className="text-2xl">🎯</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-white/70">Este semestre</div>
                                    <div className="text-xs text-green-300">8 ativos</div>
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">23</div>
                            <div className="text-white/80 font-medium">Eventos Avaliados</div>
                            <div className="grid grid-cols-3 gap-1 mt-3">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className={`h-2 rounded ${i < 6 ? 'bg-white/60' : 'bg-white/20'}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* Crescimento */}
                        <div className="bg-gradient-to-br from-[#a8edea] to-[#fed6e3] backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300 text-gray-800">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center">
                                    <div className="text-2xl">📈</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600">Tendência</div>
                                    <div className="text-xs text-green-600 font-bold">↗ Subindo</div>
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-gray-900 mb-1">+28%</div>
                            <div className="text-gray-700 font-medium">Engajamento</div>
                            <div className="flex items-end gap-1 mt-3 h-8">
                                {[12, 19, 15, 22, 28, 31, 35].map((height, i) => (
                                    <div key={i} className="bg-gradient-to-t from-green-400 to-green-500 rounded-sm flex-1" style={{ height: `${height}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Gráficos e Analytics Avançados */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Gráfico de Satisfação por Categoria */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6">📊 Satisfação por Categoria</h3>
                            <div className="space-y-4">
                                {[
                                    { categoria: 'Organização', valor: 92, cor: 'from-green-400 to-green-600' },
                                    { categoria: 'Conteúdo', valor: 88, cor: 'from-blue-400 to-blue-600' },
                                    { categoria: 'Infraestrutura', valor: 85, cor: 'from-purple-400 to-purple-600' },
                                    { categoria: 'Networking', valor: 78, cor: 'from-yellow-400 to-yellow-600' },
                                    { categoria: 'Alimentação', valor: 72, cor: 'from-red-400 to-red-600' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-24 text-white/80 text-sm font-medium">{item.categoria}</div>
                                        <div className="flex-1 bg-white/20 rounded-full h-3 relative overflow-hidden">
                                            <div
                                                className={`bg-gradient-to-r ${item.cor} h-3 rounded-full transition-all duration-1000 ease-out`}
                                                style={{ width: `${item.valor}%` }}
                                            ></div>
                                        </div>
                                        <div className="w-12 text-white font-bold text-sm">{item.valor}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Distribuição de Notas */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6">⭐ Distribuição de Notas</h3>
                            <div className="space-y-3">
                                {[
                                    { estrelas: 5, quantidade: 623, porcentagem: 52 },
                                    { estrelas: 4, quantidade: 389, porcentagem: 32 },
                                    { estrelas: 3, quantidade: 156, porcentagem: 13 },
                                    { estrelas: 2, quantidade: 48, porcentagem: 2 },
                                    { estrelas: 1, quantidade: 31, porcentagem: 1 }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 w-12">
                                            <span className="text-white font-bold">{item.estrelas}</span>
                                            <span className="text-yellow-300">★</span>
                                        </div>
                                        <div className="flex-1 bg-white/20 rounded-full h-4 relative overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${item.porcentagem}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-white/80 text-sm w-16">{item.quantidade}</div>
                                        <div className="text-white font-bold text-sm w-12">{item.porcentagem}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Métricas de Engajamento em Tempo Real */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
                        <h3 className="text-3xl font-bold text-white mb-6">🚀 Métricas de Engajamento - Últimos 30 dias</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Visualizações */}
                            <div className="bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-3xl font-bold text-white">12,847</div>
                                        <div className="text-white/80">Visualizações</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                        <div className="text-2xl">👁️</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-300">
                                    <span className="text-sm">↗ +23% vs mês anterior</span>
                                </div>
                            </div>

                            {/* Taxa de Conversão */}
                            <div className="bg-gradient-to-br from-[#f093fb]/20 to-[#f5576c]/20 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-3xl font-bold text-white">67.3%</div>
                                        <div className="text-white/80">Taxa de Avaliação</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                                        <div className="text-2xl">🎯</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-300">
                                    <span className="text-sm">↗ +5.2% vs mês anterior</span>
                                </div>
                            </div>

                            {/* NPS Score */}
                            <div className="bg-gradient-to-br from-[#4facfe]/20 to-[#00f2fe]/20 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-3xl font-bold text-white">+72</div>
                                        <div className="text-white/80">Net Promoter Score</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                                        <div className="text-2xl">💎</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-300">
                                    <span className="text-sm">↗ +12 pontos vs mês anterior</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Eventos por Performance */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
                        <h3 className="text-3xl font-bold text-white mb-6">🏆 Top 5 Eventos por Performance</h3>
                        <div className="space-y-4">
                            {[
                                { nome: 'Semana de Tecnologia 2024', rating: 4.9, participantes: 847, nps: '+85' },
                                { nome: 'Feira de Profissões', rating: 4.8, participantes: 623, nps: '+78' },
                                { nome: 'Congresso de Inovação', rating: 4.7, participantes: 512, nps: '+72' },
                                { nome: 'Workshop de Empreendedorismo', rating: 4.6, participantes: 389, nps: '+68' },
                                { nome: 'Simpósio de Sustentabilidade', rating: 4.5, participantes: 298, nps: '+64' }
                            ].map((evento, index) => (
                                <div key={index} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white font-bold text-lg">{evento.nome}</div>
                                        <div className="flex items-center gap-4 text-white/70 text-sm">
                                            <span>⭐ {evento.rating}</span>
                                            <span>👥 {evento.participantes} participantes</span>
                                            <span>💎 NPS {evento.nps}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                                                style={{ width: `${evento.rating * 20}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ferramentas de Gestão */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Gerenciamento de Eventos */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center">
                                    <div className="text-3xl">🎯</div>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white">Gerenciar Eventos</h3>
                                    <p className="text-white/80">Controle total sobre seus eventos</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Criar Novo Evento</h4>
                                            <p className="text-white/70 text-sm">Configure detalhes, datas e descrições</p>
                                        </div>
                                        <button className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] text-gray-900 px-4 py-2 rounded-full font-bold hover:from-[#ffd93d] hover:to-[#ff5252] transition-all duration-300">
                                            + Criar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Editar Eventos</h4>
                                            <p className="text-white/70 text-sm">Atualize informações em tempo real</p>
                                        </div>
                                        <button className="bg-white/20 text-white px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-all duration-300">
                                            ✏️ Editar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Monitorar Performance</h4>
                                            <p className="text-white/70 text-sm">Acompanhe métricas em tempo real</p>
                                        </div>
                                        <button className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white px-4 py-2 rounded-full font-bold hover:from-[#3d8bfe] hover:to-[#00d4ff] transition-all duration-300">
                                            📊 Monitor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Relatórios e Analytics */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#f093fb] to-[#f5576c] rounded-2xl flex items-center justify-center">
                                    <div className="text-3xl">📈</div>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white">Relatórios Avançados</h3>
                                    <p className="text-white/80">Analytics detalhados e insights</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Dashboard Executivo</h4>
                                            <p className="text-white/70 text-sm">Visão geral de todas as métricas</p>
                                        </div>
                                        <button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full font-bold hover:from-[#5a6fd8] hover:to-[#6a4190] transition-all duration-300">
                                            📊 Ver
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Análise de Satisfação</h4>
                                            <p className="text-white/70 text-sm">Feedback detalhado por evento</p>
                                        </div>
                                        <button className="bg-gradient-to-r from-[#a8edea] to-[#fed6e3] text-gray-800 px-4 py-2 rounded-full font-bold hover:from-[#96e6de] hover:to-[#fec7d7] transition-all duration-300">
                                            ⭐ Analisar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Exportar Dados</h4>
                                            <p className="text-white/70 text-sm">PDF, Excel e apresentações</p>
                                        </div>
                                        <button className="bg-white/20 text-white px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-all duration-300">
                                            📥 Export
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Demo - Gerenciamento de Eventos */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-4xl font-bold text-white">🎯 Demo: Gerenciamento de Eventos</h3>
                            <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold border border-green-400/30">
                                PREVIEW MODE
                            </div>
                        </div>

                        {/* Lista de Eventos */}
                        <div className="space-y-4">
                            {[
                                {
                                    nome: 'Semana de Tecnologia 2024',
                                    data: '15-19 Nov 2024',
                                    status: 'Ativo',
                                    participantes: 847,
                                    rating: 4.9,
                                    statusColor: 'green',
                                    categoria: 'Tecnologia'
                                },
                                {
                                    nome: 'Feira de Profissões',
                                    data: '22-23 Nov 2024',
                                    status: 'Planejado',
                                    participantes: 0,
                                    rating: 0,
                                    statusColor: 'blue',
                                    categoria: 'Carreira'
                                },
                                {
                                    nome: 'Congresso de Inovação',
                                    data: '08-10 Nov 2024',
                                    status: 'Finalizado',
                                    participantes: 512,
                                    rating: 4.7,
                                    statusColor: 'gray',
                                    categoria: 'Inovação'
                                },
                                {
                                    nome: 'Workshop de Empreendedorismo',
                                    data: '25 Nov 2024',
                                    status: 'Planejado',
                                    participantes: 0,
                                    rating: 0,
                                    statusColor: 'blue',
                                    categoria: 'Negócios'
                                }
                            ].map((evento, index) => (
                                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
                                                <div className="text-2xl">🎪</div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-1">{evento.nome}</h4>
                                                <div className="flex items-center gap-4 text-white/70 text-sm">
                                                    <span>📅 {evento.data}</span>
                                                    <span>🏷️ {evento.categoria}</span>
                                                    {evento.participantes > 0 && <span>👥 {evento.participantes} participantes</span>}
                                                    {evento.rating > 0 && <span>⭐ {evento.rating}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${evento.statusColor === 'green' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                                                    evento.statusColor === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                                                        'bg-gray-500/20 text-gray-300 border border-gray-400/30'
                                                }`}>
                                                {evento.status}
                                            </span>
                                            <div className="flex gap-2">
                                                <button className="bg-white/20 text-white px-3 py-2 rounded-full text-sm font-bold hover:bg-white/30 transition-all duration-300">
                                                    ✏️ Editar
                                                </button>
                                                <button className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white px-3 py-2 rounded-full text-sm font-bold hover:from-[#3d8bfe] hover:to-[#00d4ff] transition-all duration-300">
                                                    📊 Relatório
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Demo - Relatório Detalhado */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-4xl font-bold text-white">📈 Demo: Relatório Executivo</h3>
                            <div className="flex gap-2">
                                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold border border-green-400/30">
                                    PREVIEW MODE
                                </div>
                                <button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full font-bold hover:from-[#5a6fd8] hover:to-[#6a4190] transition-all duration-300">
                                    📥 Exportar PDF
                                </button>
                            </div>
                        </div>

                        {/* Métricas do Relatório */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl p-6 border border-green-400/30">
                                <div className="text-3xl mb-2">✅</div>
                                <div className="text-2xl font-bold text-white">94%</div>
                                <div className="text-white/80">Taxa de Satisfação</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30">
                                <div className="text-3xl mb-2">🎯</div>
                                <div className="text-2xl font-bold text-white">+72</div>
                                <div className="text-white/80">Net Promoter Score</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl p-6 border border-purple-400/30">
                                <div className="text-3xl mb-2">🔄</div>
                                <div className="text-2xl font-bold text-white">87%</div>
                                <div className="text-white/80">Taxa de Retorno</div>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl p-6 border border-yellow-400/30">
                                <div className="text-3xl mb-2">💎</div>
                                <div className="text-2xl font-bold text-white">4.7/5</div>
                                <div className="text-white/80">Média Global</div>
                            </div>
                        </div>

                        {/* Gráfico de Tendências */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                            <h4 className="text-2xl font-bold text-white mb-4">📊 Tendência de Satisfação (Últimos 6 meses)</h4>
                            <div className="flex items-end gap-4 h-40">
                                {[4.2, 4.4, 4.3, 4.6, 4.5, 4.7].map((valor, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full bg-gradient-to-t from-[#667eea] to-[#764ba2] rounded-t-lg flex items-end justify-center pb-2 text-white font-bold text-sm"
                                            style={{ height: `${(valor / 5) * 100}%` }}
                                        >
                                            {valor}
                                        </div>
                                        <div className="text-white/60 text-xs mt-2">
                                            {['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'][index]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Insights e Recomendações */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h4 className="text-xl font-bold text-white mb-4">💡 Principais Insights</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="text-xs">✓</div>
                                        </div>
                                        <p className="text-white/90 text-sm">Eventos de tecnologia têm 15% maior satisfação</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="text-xs">i</div>
                                        </div>
                                        <p className="text-white/90 text-sm">Participantes valorizam networking e conteúdo prático</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="text-xs">!</div>
                                        </div>
                                        <p className="text-white/90 text-sm">Infraestrutura pode ser melhorada em 23% dos eventos</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h4 className="text-xl font-bold text-white mb-4">🎯 Recomendações</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="text-xs">1</div>
                                        </div>
                                        <p className="text-white/90 text-sm">Expandir eventos de tecnologia e inovação</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="text-xs">2</div>
                                        </div>
                                        <p className="text-white/90 text-sm">Incluir mais atividades práticas e networking</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="text-xs">3</div>
                                        </div>
                                        <p className="text-white/90 text-sm">Investir em melhorias de infraestrutura</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    {/* Conecte-se e Experimente */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
                        <h3 className="text-4xl font-bold text-white mb-6">� Pronto para começar?</h3>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Conecte sua universidade ao UniScore e comece a coletar feedback valioso dos seus eventos.
                            Nosso sistema está pronto para gerenciar todas as suas necessidades de avaliação.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <button className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-[#ffd93d] hover:to-[#ff5252] transition-all duration-300 shadow-xl">
                                🎯 Solicitar Aprovação Completa
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
                                📞 Falar com Suporte
                            </button>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="text-2xl mb-2">⚡</div>
                                <h4 className="font-bold text-white">Implementação Rápida</h4>
                                <p className="text-white/70 text-sm">Configuração em menos de 24 horas</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="text-2xl mb-2">🛡️</div>
                                <h4 className="font-bold text-white">Segurança Total</h4>
                                <p className="text-white/70 text-sm">Dados protegidos e privacidade garantida</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <div className="text-2xl mb-2">📈</div>
                                <h4 className="font-bold text-white">Resultados Reais</h4>
                                <p className="text-white/70 text-sm">Insights que melhoram seus eventos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}