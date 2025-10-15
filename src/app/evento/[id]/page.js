
"use client";
import { useState } from "react";

export default function AvaliarEvento() {
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState("");
    const [imagem, setImagem] = useState(null);

    // Função para exibir estrelas
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => setNota(i + 1)}
                className={
                    "text-3xl mx-1 " + (i < nota ? "text-yellow-400" : "text-gray-300")
                }
                aria-label={`Nota ${i + 1}`}
            >
                ★
            </button>
        ));
    };

    // Perguntas de avaliação
    const perguntas = [
        {
            id: "organizacao",
            texto: "Como você avalia a organização do evento?",
            opcoes: ["Ótima", "Boa", "Regular", "Ruim"]
        },
        {
            id: "conteudo",
            texto: "Como você avalia o conteúdo apresentado?",
            opcoes: ["Excelente", "Bom", "Regular", "Fraco"]
        },
        {
            id: "infraestrutura",
            texto: "Como você avalia a infraestrutura do local?",
            opcoes: ["Ótima", "Boa", "Regular", "Ruim"]
        }
    ];

    const [respostas, setRespostas] = useState({});

    const handleResposta = (id, valor) => {
        setRespostas(prev => ({ ...prev, [id]: valor }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Avaliar Evento</h2>
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block font-semibold mb-2">Nota:</label>
                        <div>{renderStars()}</div>
                    </div>
                    {/* Perguntas de avaliação */}
                    {perguntas.map(q => (
                        <div key={q.id}>
                            <label className="block font-semibold mb-2">{q.texto}</label>
                            <div className="flex gap-2 flex-wrap">
                                {q.opcoes.map(op => (
                                    <label key={op} className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={q.id}
                                            value={op}
                                            checked={respostas[q.id] === op}
                                            onChange={() => handleResposta(q.id, op)}
                                            className="accent-blue-600"
                                        />
                                        <span className="text-sm">{op}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div>
                        <label className="block font-semibold mb-2">Comentário:</label>
                        <textarea
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Deixe seu comentário..."
                            value={comentario}
                            onChange={e => setComentario(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Upload de Imagem:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="border rounded px-3 py-2 w-full"
                            onChange={e => setImagem(e.target.files[0])}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
                    >
                        Enviar Avaliação
                    </button>
                </form>
            </div>
        </div>
    );
}
