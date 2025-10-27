"use client";
import Link from "next/link";

export default function RelatorioImpacto() {
    return (
        <div className="min-h-screen bg-[#fffbe6] font-sans flex flex-col items-center justify-center p-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-8 mb-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Relatório de Impacto</h1>
                <p className="text-lg text-gray-800 mb-6 text-center">Veja alguns dados sobre o impacto das avaliações e eventos na UniScore.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                    <div className="bg-[#c6ffe0] rounded-2xl p-6 shadow flex flex-col items-center">
                        <span className="text-5xl font-bold text-[#00b0ff] mb-2">1.245</span>
                        <span className="text-lg text-gray-700">Avaliações enviadas</span>
                    </div>
                    <div className="bg-[#ffe600] rounded-2xl p-6 shadow flex flex-col items-center">
                        <span className="text-5xl font-bold text-[#ff5c00] mb-2">98%</span>
                        <span className="text-lg text-gray-700">Usuários satisfeitos</span>
                    </div>
                    <div className="bg-[#1de9b6] rounded-2xl p-6 shadow flex flex-col items-center">
                        <span className="text-5xl font-bold text-white mb-2">37</span>
                        <span className="text-lg text-gray-700">Universidades participantes</span>
                    </div>
                    <div className="bg-[#ff5c00] rounded-2xl p-6 shadow flex flex-col items-center">
                        <span className="text-5xl font-bold text-white mb-2">4.8</span>
                        <span className="text-lg text-gray-700">Nota média dos eventos</span>
                    </div>
                </div>
                <div className="w-full mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Resumo</h2>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Mais de 1.200 avaliações enviadas em menos de 1 ano.</li>
                        <li>Quase 100% dos usuários recomendam a plataforma.</li>
                        <li>Participação ativa de dezenas de universidades.</li>
                        <li>Eventos universitários com alta média de satisfação.</li>
                    </ul>
                </div>
                <Link href="/" className="inline-block bg-black text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-900 transition">Voltar à página inicial</Link>
            </div>
        </div>
    );
}
