"use client";
import { useRouter, useParams } from "next/navigation";

export default function DetalhesEvento() {
    // Exemplo de dados estáticos
    const evento = {
        titulo: "Congresso de Inovação",
        data: "20/10/2025",
        descricao: "Evento sobre inovação e tecnologia nas universidades.",
        imagem: "/evento1.png",
        notaMedia: 4.5,
        comentarios: [
            { usuario: "Ana", texto: "Ótimo evento!" },
            { usuario: "Carlos", texto: "Muito conteúdo relevante." },
        ],
        debate: [
            { usuario: "João", texto: "Como foi a acessibilidade?" },
            { usuario: "Maria", texto: "Achei o ambiente confortável." },
        ],
    };

    const router = useRouter();
    const params = useParams();
    const eventoId = params?.id || "1";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
                    <img src={evento.imagem} alt={evento.titulo} className="w-48 h-48 rounded object-cover border border-gray-200" />
                    <div>
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">{evento.titulo}</h2>
                        <div className="text-gray-500 mb-2">Data: {evento.data}</div>
                        <div className="mb-2">{evento.descricao}</div>
                        <div className="font-semibold text-yellow-500 mb-2">Nota média: {evento.notaMedia} ★</div>
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="font-bold mb-2">Comentários</h3>
                    <ul className="list-disc pl-5">
                        {evento.comentarios.map((c, i) => (
                            <li key={i}><span className="font-semibold">{c.usuario}:</span> {c.texto}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Debate / Discussão</h3>
                    <ul className="list-disc pl-5">
                        {evento.debate.map((d, i) => (
                            <li key={i}><span className="font-semibold">{d.usuario}:</span> {d.texto}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6 flex gap-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => router.push('/avaliar')}
                    >
                        Avaliar
                    </button>
                </div>
            </div>
        </div>
    );
}
