

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function EventosDaUniversidade({ uni }) {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEventos(data.filter(ev => uni.eventos.includes(ev.id)));
      });
  }, [uni]);
  if (!eventos.length) {
    return (<div className="text-gray-400">Nenhum evento cadastrado para esta universidade.</div>);
  }
  return (
    <div className="space-y-6">
      {eventos.map(ev => (
        <div key={ev.id} className="bg-gradient-to-r from-[#ffe600] via-[#00e676] to-[#00b0ff] rounded-2xl shadow-2xl border border-gray-100 p-1">
          <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center hover:shadow-xl transition group">
            <Link href={`/evento/${ev.id}/detalhes`} className="shrink-0">
              <img src={ev.imagem} alt={ev.nome} className="w-32 h-32 rounded-xl object-cover border-4 border-[#00b0ff] bg-gray-100 cursor-pointer group-hover:scale-105 transition-transform duration-200" />
            </Link>
            <div className="flex-1 ml-0 md:ml-6 mt-4 md:mt-0 w-full">
              <div className="text-xl font-bold text-gray-800 drop-shadow">{ev.nome}</div>
              <div className="flex items-center gap-1 text-[#ffe600] text-lg" aria-label={`${ev.avaliacao} estrelas`}>
                {Array(ev.avaliacao).fill().map((_, i) => <span key={i}>★</span>)}
                {ev.avaliacao < 5 && Array(5 - ev.avaliacao).fill().map((_, i) => <span key={i} className="text-gray-300">★</span>)}
              </div>
              <div className="text-sm text-gray-500 mt-1">Data: {ev.data}</div>
              <div className="mt-4 flex gap-2">
                <Link href={`/evento/${ev.id}`}>
                  <button className="bg-[#ff5c00] hover:bg-[#ff9100] text-white px-4 py-2 rounded-lg font-bold shadow transition">Avaliar</button>
                </Link>
                <button className="bg-[#00e676] hover:bg-[#00c853] text-white px-4 py-2 rounded-lg font-bold shadow transition">Comentários</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [universidades, setUniversidades] = useState([]);
    const searchParams = useSearchParams();
  const sucesso = searchParams.get("sucesso") === "1";
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUni, setSelectedUni] = useState(null);
  const [user, setUser] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "avaliacoes"), orderBy("criadoEm", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvaliacoes(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("/universidades.json")
      .then((res) => res.json())
      .then((data) => setUniversidades(data));
  }, []);

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      universidades.filter((uni) =>
        uni.nome.toLowerCase().includes(search.toLowerCase()) ||
        uni.sigla.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, universidades]);

  return (
    <div className="min-h-screen bg-[#fffbe6] font-sans relative overflow-x-hidden">
      {/* Header - Trustpilot style */}
      <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
        <div className="flex items-center gap-4">
          <img src="/uniscore-logo.png" alt="UniScore Logo" className="h-8 w-auto max-w-[120px]" />
          <span className="text-xl font-bold tracking-tight">UniScore</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#" className="hover:underline">Escreva uma avaliação</a>
          <a href="#" className="hover:underline">Categorias</a>
          <a href="#" className="hover:underline">Blog</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/perfil" className="rounded-full bg-gray-800 w-8 h-8 flex items-center justify-center shadow-sm border border-gray-700 cursor-pointer" title="Perfil">
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <span role="img" aria-label="Perfil">👤</span>
            )}
          </a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full font-semibold text-sm">Para universidades</button>
          {user && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full font-semibold text-sm ml-2"
              onClick={async () => {
                await signOut(auth);
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 text-center">
        {/* Decorative shapes - more vibrant */}
        <div className="absolute left-0 top-0 w-1/3 h-48 bg-[#ffe600] rounded-br-full -z-10" style={{ clipPath: 'ellipse(100% 100% at 0% 0%)' }}></div>
        <div className="absolute right-0 top-0 w-1/2 h-40 bg-[#ff5c00] rounded-bl-full -z-10" style={{ clipPath: 'ellipse(100% 100% at 100% 0%)' }}></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-32 bg-[#00e676] rounded-tl-full -z-10" style={{ clipPath: 'ellipse(100% 100% at 100% 100%)' }}></div>
        <div className="absolute left-0 bottom-0 w-1/4 h-24 bg-[#00b0ff] rounded-tr-full -z-10" style={{ clipPath: 'ellipse(100% 100% at 0% 100%)' }}></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight drop-shadow-lg">Encontre uma universidade</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 drop-shadow">Encontre eventos da sua universidade e avalie seu impacto</p>
        <div className="w-full max-w-xl mx-auto relative">
          <input
            className="w-full border-none outline-none bg-white rounded-full shadow-2xl px-4 py-2 border-2 border-[#00e676] text-gray-700 text-base"
            placeholder="Buscar universidade"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              {suggestions.map(uni => (
                <li
                  key={uni.id}
                  className="px-4 py-2 cursor-pointer hover:bg-[#e3fcec]"
                  onClick={() => {
                    window.location.href = `/universidade/${uni.id}`;
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img src={uni.imagem} alt={uni.nome} className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                    <span className="font-semibold">{uni.nome}</span>
                    <span className="text-xs text-gray-400 ml-2">{uni.sigla}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <main className="px-4 py-8 max-w-5xl mx-auto">
        {/* Universidade selecionada */}
        {selectedUni ? (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-8">
            <div className="flex items-center gap-6 mb-4">
              <img src={selectedUni.imagem} alt={selectedUni.nome} className="w-20 h-20 rounded-full object-cover border-4 border-[#00b0ff]" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{selectedUni.nome} <span className="text-xs text-gray-400 ml-2">{selectedUni.sigla}</span></div>
                <div className="text-gray-600 mt-2">{selectedUni.descricao}</div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Eventos da universidade</h3>
            <EventosDaUniversidade uni={selectedUni} />
          </div>
        ) : null}

        {/* Avaliações Recentes - Trustpilot style */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center mt-12">Avaliações recentes</h2>
        {avaliacoes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Nenhuma avaliação encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avaliacoes.map(av => (
              <div key={av.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
                 <div className="flex items-center gap-3 mb-2">
                   {av.photoURL ? (
                     <img src={av.photoURL} alt="Avatar" className="rounded-full w-10 h-10 object-cover border border-gray-300" />
                   ) : (
                     <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center text-xl font-bold text-gray-600">
                       {av.usuario?.charAt(0)?.toUpperCase() || "U"}
                     </div>
                   )}
                   <div className="font-semibold text-gray-800">{av.usuario || "Usuário"}</div>
                 </div>
                <div className="flex items-center gap-1 text-[#ffe600] text-lg mb-2" aria-label={`${av.nota} estrelas`}>
                  {Array(av.nota).fill().map((_, i) => <span key={i}>★</span>)}
                  {av.nota < 5 && Array(5 - av.nota).fill().map((_, i) => <span key={i} className="text-gray-300">★</span>)}
                </div>
                <div className="text-gray-700 mb-2 line-clamp-3">{av.comentario}</div>
                {av.imagem && typeof av.imagem === "string" && (
                  <img src={av.imagem} alt="Imagem avaliação" className="w-full h-32 object-cover rounded-lg mb-2" />
                )}
                <div className="text-sm text-gray-500 mt-auto">Evento: {av.eventoId}</div>
                <div className="text-xs text-gray-400 mt-1">{av.criadoEm?.toDate ? av.criadoEm.toDate().toLocaleDateString() : ""}</div>
              </div>
            ))}
          </div>
        )}
        {sucesso && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-lg mx-auto mt-6 mb-2 text-center">
            Avaliação enviada com sucesso!
          </div>
        )}
      </main>
    </div>
  );
}
