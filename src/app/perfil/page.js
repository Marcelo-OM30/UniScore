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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
    );
}
