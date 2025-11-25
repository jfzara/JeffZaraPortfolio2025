import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import QuadToggle from "./QuadToggle";

// Palette minimaliste
const Color = {
    PrimaryAccent: "#333333",
    TextDark: "#333333",
    TextSubtle: "#666666",
    BackgroundWhite: "#FFFFFF",
};

const CONTENT_PADDING = "4vw";
const MAX_CONTENT_WIDTH = "1400px";
const MOBILE_BREAKPOINT = "768px";

// ===== Styled Components =====

const Nav = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    height: 60px;
    z-index: 990;
    font-family: "Space Grotesk", sans-serif;
    background: ${Color.BackgroundWhite};
    border-bottom: ${({ $scrolled }) => ($scrolled ? "1px solid #EEEEEE" : "transparent")};
    box-shadow: ${({ $scrolled }) => ($scrolled ? "0 1px 10px rgba(0,0,0,0.05)" : "none")};
    transition: border-bottom 0.1s ease, box-shadow 0.3s ease;
`;

const InnerNav = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    max-width: ${MAX_CONTENT_WIDTH};
    width: 100%;
    margin: 0 auto;
    padding: 0 ${CONTENT_PADDING};

    @media (max-width: ${MOBILE_BREAKPOINT}) {
        padding: 0 4vw;
    }
`;

const Brand = styled.a`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.1rem;
    color: ${Color.TextDark};
    text-decoration: none;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: default;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
        font-size: 1rem;
    }
`;

const ButtonGroupWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: none;
    }
`;

const TagButtonBase = css`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: transparent;
    color: ${Color.TextSubtle};
    transition: color 0.2s ease, text-decoration 0.2s ease;

    &:hover {
        color: ${Color.TextDark};
        text-decoration: underline;
    }
`;

const ContactButton = styled.a`
    ${TagButtonBase}
`;

const PreferencesWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const PreferencesButton = styled.button`
    ${TagButtonBase}
    width: auto;

    ${({ $isActive }) =>
        $isActive &&
        `
        color: ${Color.TextDark};
        text-decoration: underline;
    `}
`;

// ===== Composant =====

export default function Navbar() {
    const [prefOpen, setPrefOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const buttonRef = useRef();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Nav $scrolled={scrolled}>
            <InnerNav>
                <Brand href="#home">JEFF ZARA</Brand>

                <ButtonGroupWrapper>
                    <ContactButton href="#contact">Contact</ContactButton>
                    <PreferencesWrapper>
                        <PreferencesButton
                            ref={buttonRef}
                            $isActive={prefOpen}
                            onClick={() => setPrefOpen((p) => !p)}
                        >
                            Préférences
                        </PreferencesButton>
                        <QuadToggle
                            isOpen={prefOpen}
                            onClose={() => setPrefOpen(false)}
                            parentRef={buttonRef}
                        />
                    </PreferencesWrapper>
                </ButtonGroupWrapper>
            </InnerNav>
        </Nav>
    );
}
