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
        return <div className="p-12 text-center text-gray-500">Carregando universidade...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 relative">
            <Link href="/" className="absolute top-4 right-4 p-2 rounded-full bg-transparent hover:bg-[#0056b3] hover:text-white transition flex items-center justify-center shadow-none" title="Página inicial">
                <span className="text-2xl">🏠</span>
            </Link>
            {/* Conteúdo principal */}
            <div className="flex flex-col items-center mb-8">
                {/* Logo e link institucional */}
                <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-[#00b0ff] bg-white flex items-center justify-center overflow-hidden mb-4">
                        <img src={universidade.imagem} alt={universidade.nome} className="w-full h-full object-cover" />
                    </div>
                    <a href="https://www.mackenzie.br/instituto" target="_blank" rel="noopener" className="inline-block bg-[#D5001F] hover:bg-[#005DAA] text-white font-bold text-lg px-6 py-2 rounded-full shadow mb-4 text-center transition-colors duration-200 border-2 border-[#555]">Instituto Presbiteriano Mackenzie</a>
                </div>
                {/* Linha com vídeo e card lado a lado */}
                <div className="flex flex-row gap-8 items-center">
                    <div className="w-[700px] flex justify-center">
                        <iframe width="1000" height="394" src="https://www.youtube.com/embed/j-QzD0tXQXc?si=AD9N5d4Wf_4af0QU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md border-2 border-[#555] p-4 min-w-[220px] max-w-[240px] h-[260px] text-center flex flex-col justify-between">
                        <div>
                            <div className="text-4xl font-bold text-[#00b0ff]">{avg}</div>
                            <div className="text-lg text-gray-700 mb-2">Excelente</div>
                        </div>
                        <div className="flex flex-col gap-1 mb-2">
                            {[5, 4, 3, 2, 1].map((star, i) => (
                                <div key={star} className="flex items-center gap-2 text-sm">
                                    <span>{star} estrelas</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                        <div className="h-2 bg-[#00e676] rounded-full" style={{ width: `${total ? (starDist[5 - star] / total) * 100 : 0}%` }}></div>
                                    </div>
                                    <span className="ml-2 text-gray-500">{starDist[5 - star]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-auto">{total} avaliações</div>
                    </div>
                </div>
            </div>


            <div className="flex gap-4 mb-8">
                <Link href={`/universidade/${id}/avaliar`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow">Escreva uma avaliação</Link>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h2>
            {/* TODO: Listar avaliações reais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exemplo de avaliação mock */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <img src="/avatar-default.png" alt="Avatar" className="rounded-full w-10 h-10 object-cover border border-gray-300" />
                        <div className="font-semibold text-gray-800">Kelson Carvalho</div>
                    </div>
                    <div className="flex items-center gap-1 text-[#ffe600] text-lg mb-2">
                        {Array(5).fill().map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <div className="text-gray-700 mb-2">Ótima estrutura e professores qualificados.</div>
                    <div className="text-sm text-gray-500 mt-auto">16 de set. de 2025</div>
                </div>
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <img src="/avatar-feminino-default.jpg" alt="Avatar" className="rounded-full w-10 h-10 object-cover border border-gray-300" />
                        <div className="font-semibold text-gray-800">Renato Elesbão Renson</div>
                    </div>
                    <div className="flex items-center gap-1 text-[#ffe600] text-lg mb-2">
                        {Array(4).fill().map((_, i) => <span key={i}>★</span>)}
                        {Array(1).fill().map((_, i) => <span key={i} className="text-gray-300">★</span>)}
                    </div>
                    <div className="text-gray-700 mb-2">Ambiente acolhedor e inovador.</div>
                    <div className="text-sm text-gray-500 mt-auto">24 de jul. de 2025</div>
                </div>
            </div>
        </div>
    );
};