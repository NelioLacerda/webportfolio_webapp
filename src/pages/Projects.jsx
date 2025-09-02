import {motion, useMotionValue, useSpring} from "motion/react";
import React, {useMemo, useState} from "react";
import Navbar from "./home_sections/Navbar.jsx";
import Footer from "./home_sections/Footer.jsx";
import {myProjects} from "../constants/index.js";
import Project from "../components/Project.jsx";
import {Search} from "lucide-react";
import {Particles} from "../components/Particles.jsx";

const PAGE_SIZE = 9;

function Projects() {
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState("All");
    const [page, setPage] = useState(1);
    const [preview, setPreview] = useState(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { damping: 10, stiffness: 50 });
    const springY = useSpring(y, { damping: 10, stiffness: 50 });

    const handleMouseMove = (e) => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
    };

    const allTags = useMemo(() => {
        const set = new Set();
        myProjects.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
        //return ["All", ...Array.from(set)];
        return ["All"];
    }, []);

    const filtered = useMemo(() => {
        const byQuery = (p) =>
            !query ||
            p.name?.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase());
        const byTag = (p) =>
            activeTag === "All" || (p.tags || []).includes(activeTag);
        return myProjects.filter((p) => byQuery(p) && byTag(p));
    }, [query, activeTag]);

    const paged = useMemo(() => {
        const end = page * PAGE_SIZE;
        return filtered.slice(0, end);
    }, [filtered, page]);

    const canLoadMore = paged.length < filtered.length;

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
            <header className="pt-20 md:pt-24">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h1>
                <p className="mt-3 text-neutral-400 max-w-2xl">
                    See all my projects above.
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                    {filtered.length} result(s){query && ` para “${query}”`}
                </p>
            </header>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-3 md:pt-5">
                <div className="flex items-center gap-2 overflow-x-auto pt-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setActiveTag(tag);
                                setPage(1);
                            }}
                            className={[
                                "px-3 py-1 rounded-full text-sm whitespace-nowrap border hover-animation",
                                activeTag === tag
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "bg-transparent text-neutral-300 border-neutral-700 hover:bg-neutral-800"
                            ].join(" ")}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Buscar projetos..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(1);
                        }}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label="Buscar projetos"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                        <Search />
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            {/* Grid */}
            <section onMouseMove={handleMouseMove}>
                <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
                {myProjects.map((project) => (
                    <Project key={project.id} {...project} setPreview={setPreview} />
                ))}
                <div className="flex items-center justify-center mt-10">
                    {canLoadMore ? (
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="inline-flex items-center gap-2 cursor-pointer hover-animation text-lg bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                            See more
                            <img src="/assets/arrow-right.svg" className="w-5" />
                        </button>
                    ) : (
                        <span className="text-neutral-500 text-sm ">You reach the end :(</span>
                    )}
                </div>
                {preview && (
                    <motion.img
                        className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
                        src={preview}
                        style={{ x: springX, y: springY }}
                    />
                )}
            </section>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <Footer />
        </section>
    )
}

export default Projects;