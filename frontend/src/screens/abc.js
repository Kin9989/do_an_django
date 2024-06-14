import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        const letters = text.querySelectorAll('.letter');

        gsap.set(letters, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: text,
            start: "top 80%",
            onEnter: () => {
                gsap.to(letters, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: "power3.out",
                    duration: 0.6,
                    repeat: -1, // Lặp lại nhiều lần
                    yoyo: true // Đảo ngược animation
                });
            }
        });
    }, []);

    const text = "HELLO";
    return (
        <div className="scroll-animation">
            <h1 ref={textRef}>
                {text.split("").map((char, index) => (
                    <span key={index} className="letter">
                        {char}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default ScrollAnimation;
