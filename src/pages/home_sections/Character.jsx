import { Canvas, useFrame } from "@react-three/fiber";
import CharacterText from "../../components/CharacterText.jsx";
import ParallaxBackground from "../../components/ParallaxBackground.jsx";
import { Astronaut } from "../../components/Astronaut.jsx";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../../components/Loader.jsx";

const Character = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });
    return (
        <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
            <CharacterText />
            <ParallaxBackground />
            <figure
                className="absolute inset-0"
                style={{ width: "100vw", height: "100vh" }}
            >
                <Canvas camera={{ position: [0, 1, 3] }}>
                    <Suspense fallback={<Loader />}>
                        <Float>
                            <Astronaut
                                scale={isMobile && 0.23}
                                position={isMobile && [0, -1.5, 0]}
                            />
                        </Float>
                        <Rig />
                    </Suspense>
                </Canvas>
            </figure>
        </section>
    );
};

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [state.pointer.x / 10, 1 + state.pointer.y / 10, 3],
            0.5,
            delta
        );
    });
}

export default Character;