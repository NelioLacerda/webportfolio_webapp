import React, { useState } from "react";
import Project from "../../components/Project.jsx";
import { myProjects } from "../../constants/index.js";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { damping: 10, stiffness: 50 });
    const springY = useSpring(y, { damping: 10, stiffness: 50 });
    const handleMouseMove = (e) => {
        x.set(e.clientX + 20);
        y.set(e.clientY + 20);
    };
    const [preview, setPreview] = useState(null);

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative c-space section-spacing"
        >
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-heading">Projects</h2>
                    <button
                        className="mt-4 md:mt-0 inline-flex items-center gap-1 cursor-pointer hover-animation text-xl bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"                    >
                        See More
                        <img src="../../../public/assets/arrow-right.svg" className="w-5" />
                    </button>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
            {myProjects.map((project) => (
                <Project key={project.id} {...project} setPreview={setPreview} />
            ))}
            {preview && (
                <motion.img
                    className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
                    src={preview}
                    style={{ x: springX, y: springY }}
                />
            )}
        </section>
    );
};

export default Projects;