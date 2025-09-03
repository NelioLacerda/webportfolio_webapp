import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../pages/home_sections/Navbar.jsx";
import Footer from "../pages/home_sections/Footer.jsx";
import { myProjects } from "../constants/index.js";

const ProjectInfo = () => {
    const { id } = useParams();
    const numericId = Number.isNaN(Number(id)) ? null : Number(id);

    const fallbackProject = useMemo(
        () => ({
            id: 999,
            title: "🍳 Kitchen Chaos",
            description:
                "Meu primeiro jogo feito em Unity: um jogo de cozinha frenético onde você precisa preparar e servir pratos rapidamente. Pense rápido, mova-se mais rápido — e não deixe a cozinha pegar fogo!",
            subDescription: [
                "Este foi um projeto de aprendizado prático, onde explorei mecânicas simples de jogo, UI, e fluxo básico de níveis.",
                "Agradecimentos especiais ao Code Monkey pelos assets e tutoriais de alta qualidade.",
            ],
            href: "https://github.com/seu-usuario/kitchen-chaos",
            image: "/assets/coding-pov.png",
            tags: [
                { id: 1, name: "Unity", path: "/assets/logos/react.svg" },
                { id: 2, name: "C#", path: "/assets/logos/csharp.svg" },
                { id: 3, name: "Game Dev", path: "/assets/logos/microsoft.svg" },
            ],
            gallery: [
                "/assets/coding-pov.png",
                "/assets/coding-pov.png",
                "/assets/coding-pov.png",
            ],
            createdAt: "Jul 19, 2025",
            updatedAt: "Jul 19, 2025",
        }),
        []
    );

    const project = useMemo(() => {
        const found = myProjects.find((p) => p.id === numericId);
        if (!found) return fallbackProject;
        return {
            ...found,
            gallery: [found.image, found.image, found.image],
            createdAt: "Jan 10, 2025",
            updatedAt: "Feb 22, 2025",
        };
    }, [numericId, fallbackProject]);

    const [copied, setCopied] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        document.title = `${project.title} • Project`;
    }, [project.title]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Erro ao copiar link:", e);
        }
    };

    return (
        <section className="container mx-auto max-w-7xl relative c-space">
            <Navbar />

            <header className="pt-24 md:pt-28">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {project.title}
                    </h1>
                    <Link
                        to="/projects"
                        className="text-sm text-neutral-300 border border-neutral-700 px-3 py-1.5 rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition"
                        aria-label="Voltar para projetos"
                    >
                        ← Voltar
                    </Link>
                </div>
                <p className="mt-3 text-neutral-400 max-w-3xl">{project.description}</p>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                    {(project.tags || []).map((tag) => (
                        <span
                            key={tag.id ?? tag.name}
                            className="inline-flex items-center gap-2 text-sm text-neutral-300 border border-neutral-700 rounded-full px-3 py-1"
                        >
              {tag.path ? (
                  <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-5 h-5 rounded"
                  />
              ) : null}
                            {tag.name}
            </span>
                    ))}
                </div>
            </header>

            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className="rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy p-5">
                        <h2 className="text-xl font-semibold mb-2">Sobre o Projeto</h2>
                        <div className="space-y-3 text-neutral-300">
                            {project.subDescription?.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                            {!project.subDescription?.length && (
                                <p className="text-neutral-500">
                                    Sem detalhes adicionais no momento.
                                </p>
                            )}
                            <blockquote className="border-l-4 border-purple-600 pl-4 text-neutral-400">
                                🎨 Assets por{" "}
                                <a
                                    href="https://www.youtube.com/@CodeMonkeyUnity"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 underline underline-offset-2"
                                >
                                    Code Monkey
                                </a>
                            </blockquote>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy p-5">
                        <h2 className="text-xl font-semibold mb-2">Imagens do Projeto</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(project.gallery || [project.image])
                                .filter(Boolean)
                                .map((src, idx) => (
                                    <button
                                        key={`${src}-${idx}`}
                                        onClick={() => {
                                            setSelectedImage(src);
                                            setLightboxOpen(true);
                                        }}
                                        className="group relative rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition"
                                        aria-label={`Abrir imagem ${idx + 1}`}
                                    >
                                        <img
                                            src={src}
                                            alt={`${project.title} screenshot ${idx + 1}`}
                                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </button>
                                ))}
                        </div>
                        {lightboxOpen && selectedImage && (
                            <div
                                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
                                role="dialog"
                                aria-modal="true"
                                onClick={() => setLightboxOpen(false)}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxOpen(false);
                                    }}
                                    className="absolute top-5 right-6 text-white text-2xl"
                                    aria-label="Fechar"
                                >
                                    ×
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Visualização da imagem"
                                    className="max-w-[90vw] max-h-[80vh] rounded-xl object-contain border border-neutral-700"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}
                    </section>
                </div>

                <aside className="space-y-6">
                    <section className="rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy p-5">
                        <h2 className="text-lg font-semibold mb-3">Download</h2>
                        <p className="text-neutral-400 mb-3">
                            Baixe a última versão:
                        </p>
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 transition rounded-lg px-4 py-2"
                            aria-disabled="true"
                            title="Em breve"
                        >
                            Download para Windows
                            <img src="/assets/arrow-right.svg" className="w-4 h-4" />
                        </a>
                        <p className="mt-2 text-sm text-neutral-500">
                            Outras plataformas em breve.
                        </p>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy p-5">
                        <h2 className="text-lg font-semibold mb-3">Compartilhar</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopyLink}
                                className="flex-1 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition text-neutral-200 px-3 py-2 rounded-lg"
                            >
                                {copied ? "✅ Copiado!" : "🔗 Copiar link"}
                            </button>
                            {project.href ? (
                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition text-neutral-200 px-3 py-2 rounded-lg"
                                >
                                    Ver no GitHub
                                </a>
                            ) : null}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy p-5">
                        <h2 className="text-lg font-semibold mb-3">Informações</h2>
                        <div className="text-neutral-300 space-y-1">
                            <p>
                                <strong>Criado em:</strong> {project.createdAt}
                            </p>
                            <p>
                                <strong>Atualizado em:</strong> {project.updatedAt}
                            </p>
                        </div>
                    </section>
                </aside>
            </main>

            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <Footer />
        </section>
    );
};

export default ProjectInfo;