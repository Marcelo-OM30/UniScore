

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
                <Link href="/avaliar">
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const totalSlides = 8;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
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
          <Link href="/forum" className="hover:underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Fórum
          </Link>
          <Link href="/avaliar" className="hover:underline">Escreva uma avaliação</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/perfil" className="rounded-full bg-gray-800 w-8 h-8 flex items-center justify-center shadow-sm border border-gray-700 cursor-pointer" title="Perfil">
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <span role="img" aria-label="Perfil">👤</span>
            )}
          </a>
          <Link href="/para-universidades">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full font-semibold text-sm">Para universidades</button>
          </Link>
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
      <section className="relative bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] py-24 px-4 text-center overflow-hidden">
        {/* Elementos decorativos modernos */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-[#ff6b6b]/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#4ecdc4]/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-[#ffe066]/20 rounded-full blur-xl animate-bounce"></div>

        {/* Formas geométricas modernas */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-[#ff9a9e] to-[#fecfef] opacity-20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-[#a8edea] to-[#fed6e3] opacity-15 rounded-full transform translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Conectando
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffe066] bg-clip-text text-transparent"> culturas</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-medium">
            Avalie o impacto dos eventos universitários e promova intercâmbio cultural
          </p>

          <div className="w-full max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                className="w-full bg-white/95 backdrop-blur-sm border-0 outline-none rounded-full shadow-2xl px-8 py-5 text-gray-800 text-lg placeholder-gray-500 focus:ring-4 focus:ring-white/30 transition-all duration-300"
                placeholder="Buscar universidade..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-3 rounded-full shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            {search && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-4 bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-2xl z-20 overflow-hidden">
                {suggestions.map(uni => (
                  <li
                    key={uni.id}
                    className="px-6 py-4 cursor-pointer hover:bg-gradient-to-r hover:from-[#667eea]/10 hover:to-[#764ba2]/10 transition-all duration-200"
                    onClick={() => {
                      window.location.href = `/universidade/${uni.id}`;
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <img src={uni.imagem} alt={uni.nome} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg" />
                      <div className="flex-1 text-left">
                        <span className="font-bold text-gray-800 text-lg">{uni.nome}</span>
                        <span className="text-sm text-gray-500 ml-3 font-medium">{uni.sigla}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Banner modernizado - Avaliações */}
      <section className="w-full py-4 mb-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#a8edea] via-[#fed6e3] to-[#d299c2] rounded-3xl py-4 px-8 flex items-center justify-center shadow-xl relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/15 rounded-full blur-lg"></div>

            <div className="relative z-10 flex items-center">
              <span className="text-gray-800 font-semibold mr-3 text-lg">Participou de algum evento recentemente?</span>
              <Link href="/avaliar" className="bg-white/30 backdrop-blur-sm text-gray-800 hover:bg-white/50 font-bold px-6 py-2 rounded-full transition-all duration-300 border border-white/40 shadow-lg">
                Avaliar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner modernizado - Universidades */}
      <section className="w-full py-4 mb-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] rounded-3xl py-6 px-8 flex items-center justify-between shadow-xl relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/15 rounded-full blur-xl"></div>

            <div className="relative z-10 flex-1 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                  Fortaleça a reputação da sua universidade
                </h3>
                <p className="text-gray-800 text-base font-medium">
                  Promova eventos de qualidade e receba avaliações que destacam o impacto intercultural.
                </p>
              </div>
              <Link href="/para-universidades">
                <button className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-full font-bold text-base hover:from-[#5a6fd8] hover:to-[#6a4190] transition-all duration-300 shadow-xl ml-6">
                  Começar agora
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Imagens */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Descubra a UniScore</h2>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="carousel-container flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem1.webp" alt="Evento 1" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Avalie Eventos Universitários</h3>
                  <p className="text-white/90">Compartilhe sua experiência e ajude outros estudantes</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem2.avif" alt="Evento 2" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Descubra Novos Eventos</h3>
                  <p className="text-white/90">Encontre os melhores eventos da sua universidade</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem3.jpg" alt="Evento 3" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Conecte-se com a Comunidade</h3>
                  <p className="text-white/90">Participe e interaja com outros universitários</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem4.webp" alt="Evento 4" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Impacte a Universidade</h3>
                  <p className="text-white/90">Suas avaliações fazem a diferença</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem5.jpg" alt="Evento 5" className="w-full h-96 object-contain bg-gray-100" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Transparência e Confiança</h3>
                  <p className="text-white/90">Avaliações reais de estudantes reais</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem6.jpg" alt="Evento 6" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Gamificação e Recompensas</h3>
                  <p className="text-white/90">Ganhe estrelas e selos por participar</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem7.jpg" alt="Evento 7" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Melhore sua Experiência</h3>
                  <p className="text-white/90">Encontre eventos que realmente valem a pena</p>
                </div>
              </div>
              <div className="carousel-slide min-w-full relative">
                <img src="/imagens-carrosel/imagem8.png" alt="Evento 8" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">Junte-se à UniScore</h3>
                  <p className="text-white/90">Faça parte da transformação universitária</p>
                </div>
              </div>
            </div>

            {/* Botões de navegação */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
              onClick={previousSlide}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
              onClick={nextSlide}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
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

        {/* Bloco explicativo modernizado */}
        <section className="max-w-5xl mx-auto mb-8 relative overflow-hidden">
          <div className="bg-gradient-to-br from-[#f093fb] via-[#f5576c] to-[#4facfe] rounded-3xl p-8 shadow-2xl relative">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-4xl font-extrabold mb-4 text-white">
                  Somos a <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">UniScore</span>
                </h2>
                <p className="text-lg text-white/95 mb-4 leading-relaxed">
                  A UniScore é uma plataforma aberta para avaliação de eventos universitários. Nosso objetivo é promover transparência, confiança e engajamento entre estudantes, familiares e visitantes.
                </p>
                <p className="text-lg text-white/95 mb-6 leading-relaxed">
                  Avalie eventos, debata, ganhe selos e estrelas por participação. Junte-se à nossa comunidade e faça parte da transformação universitária!
                </p>
                <Link href="/o-que-fazemos" className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
                  O que fazemos
                </Link>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 w-full border border-white/20 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Nosso objetivo</h3>
                  <p className="text-white/95 text-center mb-6 leading-relaxed">
                    Capacitar pessoas a avaliar, debater e melhorar eventos universitários, promovendo confiança e transparência entre todos os participantes.
                  </p>
                  <div className="text-center">
                    <Link href="/relatorio" className="bg-white text-[#f5576c] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 inline-block">
                      Ver relatório de impacto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avaliações Recentes modernizado */}
        <div className="relative bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
              ⭐ Avaliações <span className="bg-gradient-to-r from-[#ffe066] to-[#ff6b6b] bg-clip-text text-transparent">Recentes</span>
            </h2>
            {avaliacoes.length === 0 ? (
              <div className="text-center text-white/70 py-12 text-lg">
                <div className="text-6xl mb-4">📝</div>
                Nenhuma avaliação encontrada ainda.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {avaliacoes.map(av => (
                  <div key={av.id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 flex flex-col shadow-xl hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      {av.photoURL ? (
                        <img src={av.photoURL} alt="Avatar" className="rounded-full w-12 h-12 object-cover border-2 border-white/30 shadow-lg" />
                      ) : (
                        <div className="rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ffe066] w-12 h-12 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                          {av.usuario?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                      <div className="font-bold text-white text-lg">{av.usuario || "Usuário"}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[#ffe066] text-xl mb-3" aria-label={`${av.nota} estrelas`}>
                      {Array(av.nota).fill().map((_, i) => <span key={i}>⭐</span>)}
                      {av.nota < 5 && Array(5 - av.nota).fill().map((_, i) => <span key={i} className="text-white/30">⭐</span>)}
                    </div>
                    <div className="text-white/95 mb-3 line-clamp-3 leading-relaxed">{av.comentario}</div>
                    {av.imagem && typeof av.imagem === "string" && (
                      <img src={av.imagem} alt="Imagem avaliação" className="w-full h-32 object-cover rounded-xl mb-3 border border-white/20" />
                    )}
                    <div className="text-sm text-white/70 mt-auto bg-white/10 rounded-lg p-2">
                      <div>📅 Evento: {av.eventoId}</div>
                      <div className="text-xs text-white/60 mt-1">
                        {av.criadoEm?.toDate ? av.criadoEm.toDate().toLocaleDateString() : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {sucesso && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-lg mx-auto mt-6 mb-2 text-center">
            Avaliação enviada com sucesso!
          </div>
        )}
      </main>

      {/* Botão Flutuante do Fórum */}
      <Link href="/forum" className="fixed bottom-6 right-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50 group">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <span className="absolute right-full top-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Participar do Fórum
        </span>
      </Link>
    </div>
  );
}
