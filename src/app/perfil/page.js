"use client";
import { useState } from "react";

export default function Perfil() {
    const [nome, setNome] = useState("Usuário Exemplo");
    const [foto, setFoto] = useState(null);
    const [estrelas] = useState(3);
    const [selos] = useState(["🏅", "🎓", "🌍"]);
    const [historico] = useState([
        { evento: "Congresso de Inovação", nota: 5 },
        { evento: "Semana da Diversidade", nota: 4 },
    ]);

    const handleFotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-2">
                        <img
                            src={foto || "/avatar-default.png"}
                            alt="Foto do usuário"
                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFotoChange}
                            />
                            <span className="text-xs">Editar</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className="text-xl font-bold text-center border-b-2 border-blue-200 focus:outline-none focus:border-blue-500 mb-2"
                    />
                    <div className="flex gap-2 mb-2">
                        <span className="text-yellow-500 text-lg">{"★".repeat(estrelas)}</span>
                        <span className="text-gray-400 text-lg">{"★".repeat(5 - estrelas)}</span>
                    </div>
                    <div className="flex gap-2 mb-2">
                        {selos.map((selo, i) => (
                            <span key={i} className="text-2xl">{selo}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Histórico de Avaliações</h3>
                    <ul className="list-disc pl-5">
                        {historico.map((h, i) => (
                            <li key={i}>{h.evento} — {h.nota} ★</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
