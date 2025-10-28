"use client";
import Link from "next/link";

export default function OQueFazemos() {
    return (
        <div className="min-h-screen bg-[#f4f4f4] font-sans flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full bg-white border-2 border-[#c41230] rounded-3xl shadow-lg p-8 mb-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4 text-[#c41230]">O que fazemos</h1>
                <p className="text-lg font-sans font-medium antialiased leading-relaxed text-[#222] mb-6 text-center">A UniScore é uma plataforma aberta para avaliação de eventos universitários. Nosso objetivo é promover transparência, confiança e engajamento entre estudantes, familiares e visitantes, permitindo que todos compartilhem opiniões, notas e experiências sobre eventos promovidos por universidades.</p>
                <p className="text-base font-sans font-normal antialiased leading-relaxed text-[#222] mb-6 text-center">Aqui você pode avaliar eventos, debater, ganhar selos e estrelas por participação, e ajudar universidades a aprimorar seus serviços. Junte-se à nossa comunidade e faça parte da transformação universitária!</p>
                <div className="w-full flex justify-center mb-4">
                    <video width="560" height="315" controls className="rounded-xl shadow-lg">
                        <source src="/Avalie_o_Impacto_dos_Eventos_Universitrios_com_Nos.mp4" type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                </div>
                <Link href="/" className="inline-block bg-[#c41230] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#222] transition">Voltar à página inicial</Link>
            </div>
        </div>
    );
}
