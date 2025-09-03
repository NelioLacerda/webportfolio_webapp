import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../pages/home_sections/Navbar.jsx";
import Footer from "../pages/home_sections/Footer.jsx";
import { Particles } from "./Particles.jsx";

// Dados fictícios para exemplo
const POSTS = [
    {
        id: "como-estruturei-portfolio-react-vite",
        title: "Como estruturei meu portfólio com React + Vite",
        excerpt:
            "Decisões de arquitetura, padrões de componentes e otimizações que usei para construir este site.",
        date: "2025-07-14",
        readTime: "6 min",
        tags: ["React", "Frontend", "Vite"],
        cover: "/assets/coding-pov.png",
        content: [
            { type: "p", children: "Neste artigo compartilho a estrutura que usei para meu portfólio com React + Vite, pensando em performance, DX e escalabilidade." },
            { type: "h2", children: "Pilares da arquitetura" },
            {
                type: "ul",
                children: [
                    "Componentização semântica e reutilizável",
                    "Dados centralizados em módulos constants/",
                    "Animações leves com Motion",
                    "Imagens otimizadas e lazy loading",
                ],
            },
            { type: "blockquote", children: "Dica: defina tokens de design via utilitários do Tailwind (cores, espaçamentos) para consistência visual." },
            { type: "code", lang: "bash", children: "npm create vite@latest webportfolio_webapp -- --template react" },
            { type: "p", children: "Para estados locais, hooks simples; para compartilhamento leve, props drilling controlado. Sem overengineering." },
        ],
    },
    {
        id: "animacoes-performaticas-framer-motion",
        title: "Animações performáticas com Framer Motion",
        excerpt:
            "Crie microinterações suaves sem comprometer FPS, com orquestração e lazy mounting.",
        date: "2025-05-28",
        readTime: "8 min",
        tags: ["Animação", "Framer Motion", "UX"],
        cover: "/assets/mountain-1.png",
        content: [
            { type: "p", children: "Framer Motion permite animações fluidas com ótima DX. O segredo está em animar apenas o necessário e orquestrar entradas/saídas." },
            { type: "h2", children: "Boas práticas" },
            { type: "ul", children: ["Use layoutId para transições suaves", "Prefira spring para microinterações", "Evite re-renderizações com memoização"] },
            { type: "code", lang: "jsx", children: "import { motion, AnimatePresence } from 'motion/react'\n\n<AnimatePresence>\n  {isOpen && (\n    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} />\n  )}\n</AnimatePresence>" },
        ],
    },
    {
        id: "threejs-react-three-fiber-introducao",
        title: "3D na web com Three.js e React Three Fiber",
        excerpt:
            "Do zero ao primeiro modelo interativo: cena, câmera e materiais em um setup React.",
        date: "2025-03-10",
        readTime: "9 min",
        tags: ["Three.js", "R3F", "3D"],
        cover: "/assets/planets.png",
        content: [
            { type: "p", children: "R3F abstrai a API do Three.js em componentes React. Você monta cena, câmera e materiais declarativamente." },
            { type: "h2", children: "Conceitos básicos" },
            { type: "ul", children: ["Cena (Scene)", "Câmera (PerspectiveCamera)", "Renderer", "Mesh + Material + Geometry"] },
            { type: "blockquote", children: "Comece simples: um cubo girando com iluminação básica." },
        ],
    },
];

// Utilidades de formatação e renderização
const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const Code = ({ lang = "text", children }) => (
    <pre className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 overflow-auto">
    <code className={`language-${lang}`}>{children}</code>
  </pre>
);

const Prose = ({ node }) => {
    switch (node.type) {
        case "h2":
            return <h2 className="text-2xl font-semibold mt-6 mb-2">{node.children}</h2>;
        case "p":
            return <p className="mt-3 text-neutral-300">{node.children}</p>;
        case "blockquote":
            return (
                <blockquote className="mt-4 border-l-4 border-purple-600 pl-4 text-neutral-300">
                    {node.children}
                </blockquote>
            );
        case "ul":
            return (
                <ul className="mt-3 list-disc list-inside space-y-1 text-neutral-300">
                    {node.children.map((li, i) => (
                        <li key={i}>{li}</li>
                    ))}
                </ul>
            );
        case "code":
            return <Code lang={node.lang}>{node.children}</Code>;
        default:
            return null;
    }
};

const BlogInfo = () => {
    const { id } = useParams();
    const [copied, setCopied] = useState(false);

    const post = useMemo(() => {
        return (
            POSTS.find((p) => p.id === id) ?? {
                id: "draft",
                title: "Rascunho",
                excerpt: "Conteúdo não encontrado.",
                date: new Date().toISOString().slice(0, 10),
                readTime: "3 min",
                tags: ["Draft"],
                cover: "/assets/sky.jpg",
                content: [{ type: "p", children: "Este artigo ainda não está disponível." }],
            }
        );
    }, [id]);

    const index = useMemo(() => POSTS.findIndex((p) => p.id === post.id), [post.id]);
    const prev = index > 0 ? POSTS[index - 1] : null;
    const next = index >= 0 && index < POSTS.length - 1 ? POSTS[index + 1] : null;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {}
    };

    return (
        <section className="container mx-auto max-w-7xl relative c-space">
            <Navbar />
            <Particles
                className="absolute inset-0 -z-50"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />

            <article className="pt-20 md:pt-24 pb-16">
                <header className="mb-6">
                    <Link
                        to="/blog"
                        className="text-sm text-neutral-300 border border-neutral-700 px-3 py-1.5 rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition inline-flex items-center gap-1"
                    >
                        ← Voltar
                    </Link>

                    <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                        {post.title}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden="true">•</span>
                        <span>{post.readTime}</span>
                        <span aria-hidden="true">•</span>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-neutral-300 text-xs"
                                >
                  {t}
                </span>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-storm to-indigo">
                    <img
                        src={post.cover}
                        alt={`Capa do post: ${post.title}`}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                </div>

                <section className="mt-8 max-w-3xl">
                    {post.content.map((node, i) => (
                        <Prose key={i} node={node} />
                    ))}

                    <div className="mt-8 flex gap-2">
                        <button
                            onClick={handleCopyLink}
                            className="bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition text-neutral-200 px-3 py-2 rounded-lg"
                        >
                            {copied ? "✅ Link copiado!" : "🔗 Copiar link"}
                        </button>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 transition text-neutral-200 px-3 py-2 rounded-lg"
                        >
                            Ver repositório
                        </a>
                    </div>
                </section>

                <nav
                    className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between"
                    aria-label="Navegação do artigo"
                >
                    {prev ? (
                        <Link
                            to={`/blog/${prev.id}`}
                            className="text-neutral-300 hover:text-white transition"
                        >
                            ← {prev.title}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {next ? (
                        <Link
                            to={`/blog/${next.id}`}
                            className="text-neutral-300 hover:text-white transition"
                        >
                            {next.title} →
                        </Link>
                    ) : (
                        <span />
                    )}
                </nav>
            </article>

            <Footer />
        </section>
    );
};

export default BlogInfo;