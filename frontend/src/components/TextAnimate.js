import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const TextAnimate = ({ child }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const textElement = textRef.current;
        const letters = textElement.querySelectorAll('.letter');

        gsap.set(letters, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: textElement,
            start: "top 80%",
            onEnter: () => {
                gsap.to(letters, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: "power3.out",
                    duration: 0.6,
                    repeat: 0, // Lặp lại nhiều lần
                    yoyo: true // Đảo ngược animation
                });
            }
        });
    }, [child]);

    return (
        <ScrollContainer>
            <AnimatedText ref={textRef} style={{ color: 'white' }}>
                {child.split("").map((char, index) => (
                    <Letter key={index} className="letter">
                        {char}
                    </Letter>
                ))}
            </AnimatedText>
        </ScrollContainer>
    );
};

const ScrollContainer = styled.div`
  
`;

const AnimatedText = styled.h1`
  display: flex;
`;

const Letter = styled.span`
  display: inline-block;
  font-size: 3rem;
  margin: 0 0.1rem;
`;

export default TextAnimate;
