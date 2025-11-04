"use client";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function Perfil() {
    const [user, setUser] = useState(null);
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [fotoFile, setFotoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState("");
    const [erro, setErro] = useState("");
    // Carregar dados do usuário autenticado
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
                // Buscar perfil no Firestore
                const docRef = doc(db, "usuarios", u.uid);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    const data = snap.data();
                    setNome(data.nome || "");
                    setFoto(data.avatar || "");
                } else {
                    setNome(u.displayName || "");
                    setFoto(u.photoURL || "");
                }
            }
        });
        return () => unsub();
    }, []);

    const handleFotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFotoFile(e.target.files[0]);
            setFoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Salvar perfil
    const handleSalvar = async () => {
        if (!user) return;
        setLoading(true);
        setSucesso("");
        setErro("");
        let avatarUrl = foto;
        try {
            // Upload da foto se houver novo arquivo
            if (fotoFile) {
                const storageRef = ref(storage, `avatars/${user.uid}`);
                await uploadBytes(storageRef, fotoFile);
                avatarUrl = await getDownloadURL(storageRef);
            }
            // Atualizar perfil no Auth
            await updateProfile(user, { displayName: nome, photoURL: avatarUrl });
            // Salvar no Firestore
            await setDoc(doc(db, "usuarios", user.uid), {
                nome,
                avatar: avatarUrl,
            });
            setSucesso("Perfil salvo com sucesso!");
        } catch (err) {
            setErro("Erro ao salvar perfil.");
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]">
            {/* Header */}
            <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <a href="/" className="flex items-center gap-4 text-white hover:text-white/80 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        <span className="font-bold text-lg">UniScore</span>
                    </a>

                    <nav className="hidden md:flex gap-8 text-sm">
                        <a href="/forum" className="hover:underline flex items-center gap-1 text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            Fórum
                        </a>
                        <a href="/relatorio" className="hover:underline text-white">Relatórios</a>
                    </nav>

                    <div className="w-20"></div>
                </div>
            </header>

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex justify-center gap-4 mb-2">
                            <button
                                type="button"
                                className={`border-2 rounded-full p-1 ${foto === "/avatar-default.png" ? "border-blue-500" : "border-gray-200"}`}
                                onClick={() => setFoto("/avatar-default.png")}
                                title="Avatar masculino"
                            >
                                <img src="/avatar-default.png" alt="Avatar masculino" className="w-24 h-24 rounded-full object-cover" />
                            </button>
                            <button
                                type="button"
                                className={`border-2 rounded-full p-1 ${foto === "/avatar-feminino-default.jpg" ? "border-blue-500" : "border-gray-200"}`}
                                onClick={() => setFoto("/avatar-feminino-default.jpg")}
                                title="Avatar feminino"
                            >
                                <img src="/avatar-feminino-default.jpg" alt="Avatar feminino" className="w-24 h-24 rounded-full object-cover" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            className="text-xl font-bold text-center border-b-2 border-blue-200 focus:outline-none focus:border-blue-500 mb-2"
                            placeholder="Seu nome"
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold mt-2 hover:bg-blue-700 transition"
                            onClick={handleSalvar}
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar perfil"}
                        </button>
                        {sucesso && <div className="text-green-600 mt-2">{sucesso}</div>}
                        {erro && <div className="text-red-600 mt-2">{erro}</div>}
                    </div>
                    {/* ...Histórico e outros campos podem ser implementados depois... */}
                </div>
            </div>
        </div>
    );
}
