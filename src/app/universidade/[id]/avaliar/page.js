
"use client";
import { useState, useEffect } from "react";
import { auth } from "../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AvaliarUniversidade() {
    const [nota, setNota] = useState(0);
    const [comentario, setComentario] = useState("");
    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");
    const [imagem, setImagem] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [user, setUser] = useState(undefined); // undefined = loading, null = não logado, objeto = logado
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Você precisa estar logado para enviar uma avaliação.");
            return;
        }
        try {
            await addDoc(collection(db, "avaliacoes"), {
                universidadeId: id,
                nota,
                comentario,
                titulo,
                data,
                imagem: imagem ? imagem : null,
                criadoEm: serverTimestamp(),
                usuario: user ? user.displayName || user.email : null,
                usuarioId: user ? user.uid : null,
                photoURL: user && user.photoURL ? user.photoURL : null,
            });
            setEnviado(true);
            router.push("/?sucesso=1");
        } catch (err) {
            alert("Erro ao salvar avaliação: " + err.message);
        }
    }
    // Renderização condicional
    let content;
    if (user === undefined) {
        content = <div className="text-center py-8 text-gray-500">Carregando...</div>;
    } else if (enviado) {
        // Após envio, o usuário será redirecionado para a página inicial, então não exibe mensagem aqui
    } else if (!user) {
        content = (
            <div className="text-center py-8">
                <div className="mb-4 text-gray-600">Você precisa estar logado para enviar uma avaliação.</div>
                <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold">Fazer login</a>
            </div>
        );
    } else {
        content = (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold mb-2">Avalie sua experiência:</label>
                    <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(n => (
                            <button
                                type="button"
                                key={n}
                                className={`text-3xl ${nota >= n ? "text-yellow-400" : "text-gray-300"}`}
                                onClick={() => setNota(n)}
                                aria-label={`Dar nota ${n}`}
                            >★</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block font-semibold mb-2">Conte-nos mais sobre a sua experiência</label>
                    <textarea
                        className="w-full border rounded p-2"
                        rows={4}
                        value={comentario}
                        onChange={e => setComentario(e.target.value)}
                        required
                        placeholder="O que você gostou ou não gostou? O que essa universidade faz bem ou o que pode melhorar? Seja honesto e forneça informações úteis!"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        <a href="#" className="underline">Como escrever uma avaliação útil</a>
                    </div>
                </div>
                <div>
                    <label className="block font-semibold mb-2">Qual evento você está avaliando?</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                        placeholder="Ex: Semana de Tecnologia, Congresso de Inovação..."
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Data do evento</label>
                    <input
                        type="date"
                        className="w-full border rounded p-2"
                        value={data}
                        onChange={e => setData(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Nome do arquivo da imagem (opcional):</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={imagem || ""}
                        onChange={e => setImagem(e.target.value)}
                        placeholder="Ex: evento1.jpg"
                    />
                    <div className="text-xs text-gray-500 mt-1">Coloque apenas o nome do arquivo presente na pasta public.</div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                    Ao enviar esta avaliação, você confirma que se baseia em uma experiência real e que não recebeu nenhum incentivo para escrevê-la.
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-bold w-full hover:bg-blue-700 transition"
                    disabled={nota === 0 || !comentario || !titulo || !data}
                >Enviar avaliação</button>
            </form>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Escreva uma avaliação</h2>
                {content}
            </div>
        </div>
    );
}
