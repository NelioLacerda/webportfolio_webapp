import React, { useMemo, useState } from "react";
import { Particles } from "../components/Particles.jsx";
import Navbar from "./home_sections/Navbar.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Footer from "./home_sections/Footer.jsx";

const MOCK_POSTS = [
    {
        id: "1",
        title: "Como estruturei meu portfólio com React + Vite",
        excerpt:
            "Um passo a passo das decisões de arquitetura, padrões de componentes e otimizações que usei para construir este site.",
        date: "2025-07-14",
        readTime: "6 min",
        tags: ["React", "Frontend", "Vite"],
        cover: "/assets/coding-pov.png",
    },
    {
        id: "2",
        title: "Animações performáticas com Framer Motion",
        excerpt:
            "Técnicas práticas para criar microinterações suaves sem comprometer FPS, incluindo orquestração e lazy mounting.",
        date: "2025-05-28",
        readTime: "8 min",
        tags: ["Animação", "Framer Motion", "UX"],
        cover: "/assets/mountain-1.png",
    },
    {
        id: "3",
        title: "3D na web com Three.js e React Three Fiber",
        excerpt:
            "Do zero ao primeiro modelo interativo: conceitos de cena, câmera e materiais aplicados em um setup React.",
        date: "2025-03-10",
        readTime: "9 min",
        tags: ["Three.js", "R3F", "3D"],
        cover: "/assets/planets.png",
    },
    {
        id: "4",
        title: "Melhores práticas de acessibilidade em SPAs",
        excerpt:
            "Foco visível, navegação por teclado, ARIA e dicas rápidas para elevar a experiência de todos os usuários.",
        date: "2025-01-22",
        readTime: "7 min",
        tags: ["A11y", "Frontend"],
        cover: "/assets/sky.jpg",
    },
];

const ALL_TAGS = ["All", ...Array.from(new Set(MOCK_POSTS.flatMap((p) => p.tags)))];

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

const Blog = () => {
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState("Todos");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return MOCK_POSTS.filter((p) => {
            const matchesTag = activeTag === "Todos" || p.tags.includes(activeTag);
            const matchesQuery =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q));
            return matchesTag && matchesQuery;
        });
    }, [query, activeTag]);

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

            <header className="pt-16 md:pt-18 pb-2 flex flex-col items-start gap-4">
                <h1 className="text-heading">Blog</h1>
                <p className="subtext max-w-2xl">
                    Your blog projects.
                </p>

                <div className="mt-6 w-full flex flex-col gap-4 md:flex-row md:items-center">
                    <label htmlFor="search" className="sr-only">
                        Buscar posts
                    </label>
                    <div className="relative flex-1">
                        <input
                            id="search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by title, tag..."
                            className="field-input field-input-focus pr-10"
                            aria-label="Search"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              ⌕
            </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {ALL_TAGS.map((tag) => {
                            const active = activeTag === tag;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`px-4 py-2 rounded-full text-sm transition-colors border cursor-pointer ${
                                        active
                                            ? "bg-white/20 border-white/20"
                                            : "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
                                    }`}
                                    aria-pressed={active}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            <main className="mt-6 pb-16">
                {filtered.length === 0 ? (
                    <div className="text-neutral-400">Nenhum post encontrado.</div>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((post) => (
                            <li key={post.id}>
                                <BlogCard
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    date={post.date}
                                    readTime={post.readTime}
                                    tags={post.tags}
                                    cover={post.cover}
                                    onClick={() => alert(`Abrir post: ${post.title}`)}
                                    ctaLabel="Read More →"
                                />
                            </li>
                        ))}
                    </ul>
                )}

                <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Paginação de posts">
                    <button className="px-4 py-2 rounded-full bg-white/10 text-sm text-neutral-300 border border-white/10 hover:bg-white/15">
                        ← Previous
                    </button>
                    <span className="text-neutral-500 text-sm">Page 1 of 1</span>
                    <button className="px-4 py-2 rounded-full bg-white/10 text-sm text-neutral-300 border border-white/10 hover:bg-white/15">
                        Next →
                    </button>
                </nav>
            </main>
            <Footer />
        </section>
    );
};

export default Blog;