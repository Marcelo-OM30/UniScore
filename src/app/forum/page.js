"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    doc,
    arrayUnion,
    arrayRemove,
    deleteDoc
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Forum() {
    const [user, setUser] = useState(undefined);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [mediaType, setMediaType] = useState("none");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "forumPosts"), orderBy("criadoEm", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = [];
            snapshot.forEach((doc) => {
                postsData.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsData);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (!user || !newPost.trim()) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "forumPosts"), {
                conteudo: newPost.trim(),
                autor: {
                    uid: user.uid,
                    nome: user.displayName || user.email,
                    email: user.email,
                    foto: user.photoURL || null
                },
                mediaUrl: mediaUrl || null,
                mediaType: mediaType !== "none" ? mediaType : null,
                curtidas: [],
                comentarios: [],
                criadoEm: serverTimestamp(),
                moderado: false
            });
            setNewPost("");
            setMediaUrl("");
            setMediaType("none");
        } catch (error) {
            alert("Erro ao publicar: " + error.message);
        }
        setLoading(false);
    };

    const handleLike = async (postId, curtidas) => {
        if (!user) return;

        const postRef = doc(db, "forumPosts", postId);
        const userLiked = curtidas.includes(user.uid);

        try {
            if (userLiked) {
                await updateDoc(postRef, {
                    curtidas: arrayRemove(user.uid)
                });
            } else {
                await updateDoc(postRef, {
                    curtidas: arrayUnion(user.uid)
                });
            }
        } catch (error) {
            console.error("Erro ao curtir:", error);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "Agora";
        const now = new Date();
        const postTime = timestamp.toDate();
        const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));

        if (diffInMinutes < 1) return "Agora";
        if (diffInMinutes < 60) return `${diffInMinutes}min`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}d`;
    };

    const PostCard = ({ post }) => (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {post.autor.foto ? (
                        <img src={post.autor.foto} alt={post.autor.nome} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        post.autor.nome?.charAt(0)?.toUpperCase() || "A"
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900 truncate">{post.autor.nome}</span>
                        <span className="text-gray-500 text-sm">@{post.autor.email?.split('@')[0]}</span>
                        <span className="text-gray-400 text-sm">·</span>
                        <span className="text-gray-500 text-sm">{formatTimestamp(post.criadoEm)}</span>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed mb-4 whitespace-pre-wrap">
                        {post.conteudo}
                    </p>

                    {post.mediaUrl && (
                        <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                            {post.mediaType === "image" ? (
                                <img
                                    src={post.mediaUrl}
                                    alt="Imagem do post"
                                    className="w-full max-h-96 object-cover"
                                />
                            ) : post.mediaType === "video" ? (
                                <video
                                    src={post.mediaUrl}
                                    controls
                                    className="w-full max-h-96"
                                />
                            ) : null}
                        </div>
                    )}

                    <div className="flex items-center gap-6 pt-3 border-t border-gray-200">
                        <button
                            onClick={() => handleLike(post.id, post.curtidas || [])}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${user && post.curtidas?.includes(user.uid)
                                    ? 'text-red-500 bg-red-50'
                                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                                }`}
                        >
                            <svg className="w-5 h-5" fill={user && post.curtidas?.includes(user.uid) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-sm font-medium">{post.curtidas?.length || 0}</span>
                        </button>

                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-sm font-medium">{post.comentarios?.length || 0}</span>
                        </button>

                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const CreatePostForm = () => (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <form onSubmit={handleSubmitPost}>
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user?.displayName?.charAt(0)?.toUpperCase() || "U"
                        )}
                    </div>

                    <div className="flex-1">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="O que você está pensando sobre os eventos universitários?"
                            className="w-full bg-transparent border-none outline-none text-gray-900 text-lg placeholder-gray-500 resize-none min-h-[120px] p-0"
                            maxLength={280}
                        />

                        {mediaType !== "none" && (
                            <div className="mt-4">
                                <input
                                    type="url"
                                    value={mediaUrl}
                                    onChange={(e) => setMediaUrl(e.target.value)}
                                    placeholder={mediaType === "image" ? "URL da imagem" : "URL do vídeo"}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setMediaType(mediaType === "image" ? "none" : "image")}
                                    className={`p-2 rounded-lg transition-all duration-200 ${mediaType === "image"
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMediaType(mediaType === "video" ? "none" : "video")}
                                    className={`p-2 rounded-lg transition-all duration-200 ${mediaType === "video"
                                            ? 'bg-green-100 text-green-600'
                                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                <span className="text-gray-500 text-sm ml-4">
                                    {newPost.length}/280
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={!newPost.trim() || loading || newPost.length > 280}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                {loading ? "Publicando..." : "Publicar"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        <span className="font-bold text-lg">Voltar</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        Fórum Universitário
                    </h1>

                    <div className="w-20"></div>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {user === undefined ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <div className="text-gray-600 text-lg">Carregando...</div>
                    </div>
                ) : !user ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Entre na conversa</h3>
                            <p className="text-gray-600 mb-8 text-base leading-relaxed">
                                Faça login para participar das discussões sobre eventos universitários e conectar-se com outros estudantes.
                            </p>
                            <Link href="/login">
                                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg">
                                    Fazer login
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Conecte-se com <span className="text-green-600">estudantes</span>
                            </h2>
                            <p className="text-xl text-gray-600">
                                Compartilhe experiências, fotos e vídeos de eventos universitários
                            </p>
                        </div>

                        <CreatePostForm />

                        <div className="space-y-4">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}

                            {posts.length === 0 && (
                                <div className="text-center py-12 bg-white rounded-2xl shadow-md border border-gray-200">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-lg">
                                        Nenhuma discussão ainda. Seja o primeiro a compartilhar!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}