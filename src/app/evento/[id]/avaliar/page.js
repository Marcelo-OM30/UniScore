"use client";
import { useState } from "react";

export default function AvaliarEvento() {
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState("");
    const [imagem, setImagem] = useState(null);
    const [enviado, setEnviado] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        // Aqui você pode integrar com Firebase para salvar a avaliação
        setEnviado(true);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Escreva uma avaliação</h2>
                {enviado ? (
                    <div className="text-green-600 text-center font-semibold">Avaliação enviada com sucesso!</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-semibold mb-2">Nota:</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button
                                        type="button"
                                        key={n}
                                        className={
                                            `text-2xl ${nota >= n ? "text-yellow-400" : "text-gray-300"}`
                                        }
                                        onClick={() => setNota(n)}
                                        aria-label={`Dar nota ${n}`}
                                    >★</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Comentário:</label>
                            <textarea
                                className="w-full border rounded p-2"
                                rows={4}
                                value={comentario}
                                onChange={e => setComentario(e.target.value)}
                                required
                                placeholder="Conte sua experiência..."
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Imagem (opcional):</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setImagem(e.target.files[0])}
                                className="w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded font-bold w-full hover:bg-blue-700 transition"
                            disabled={nota === 0 || !comentario}
                        >Enviar avaliação</button>
                    </form>
                )}
            </div>
        </div>
    );
}
