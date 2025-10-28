"use client";
import Link from "next/link";

export default function RelatorioImpacto() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] font-sans flex flex-col items-center justify-center p-8">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-8 mb-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4 text-[#c41230]">Relatório de Impacto</h1>
                <p className="text-lg text-[#0056b3] mb-6 text-center">Veja alguns dados sobre o impacto das avaliações e eventos na UniScore.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                    <div className="bg-[#0056b3] rounded-2xl p-6 shadow flex flex-col items-center border-2 border-[#c41230]">
                        <span className="text-5xl font-bold text-white mb-2">1.245</span>
                        <span className="text-lg text-white">Avaliações enviadas</span>
                    </div>
                    <div className="bg-[#0056b3] rounded-2xl p-6 shadow flex flex-col items-center border-2 border-[#c41230]">
                        <span className="text-5xl font-bold text-[#ffe600] mb-2">98%</span>
                        <span className="text-lg text-white">Usuários satisfeitos</span>
                    </div>
                    <div className="bg-[#0056b3] rounded-2xl p-6 shadow flex flex-col items-center border-2 border-[#c41230]">
                        <span className="text-5xl font-bold text-white mb-2">37</span>
                        <span className="text-lg text-white">Universidades participantes</span>
                    </div>
                    <div className="bg-[#0056b3] rounded-2xl p-6 shadow flex flex-col items-center border-2 border-[#c41230]">
                        <span className="text-5xl font-bold text-[#ffe600] mb-2">4.8</span>
                        <span className="text-lg text-white">Nota média dos eventos</span>
                    </div>
                </div>
                <div className="w-full mb-6">
                    <h2 className="text-xl font-bold text-[#c41230] mb-2">Resumo</h2>
                    <ul className="list-disc pl-6 text-mackenzie-dark">
                        <li>Mais de 1.200 avaliações enviadas em menos de 1 ano.</li>
                        <li>Quase 100% dos usuários recomendam a plataforma.</li>
                        <li>Participação ativa de dezenas de universidades.</li>
                        <li>Eventos universitários com alta média de satisfação.</li>
                    </ul>
                </div>
                <Link href="/" className="inline-block bg-[#0056b3] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#c41230] transition">Voltar à página inicial</Link>
            </div>
        </div>
    );
}
