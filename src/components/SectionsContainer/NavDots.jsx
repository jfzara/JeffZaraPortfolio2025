import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Color } from "../ProjectsSection.styles.js";
import textureVideo from "../../assets/texture_papier.mp4";

const TAG_COLORS = ["TechGold", "CaseGreen", "GlowTitle"];
const MOBILE_BREAKPOINT = "768px";

const BASE_SHAPES = [
    "25 0 75 4 95 18 70 34 30 36 5 20",
    "20 6 80 2 95 20 65 34 25 32 0 18",
    "15 3 85 8 90 24 70 34 25 30 5 20",
    "10 0 85 10 90 22 70 34 20 30 0 18"
];

const popUp = keyframes`
    0% { transform: scale(0.9); opacity: 0; }
    70% { transform: scale(1.02); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
`;

const getAccentColor = (key) => Color[key] || Color.TechGold;

const getDarkAccentColor = (key) => {
    switch (key) {
        case "TechGold": return Color.DarkTechGold || Color.TechGold;
        case "CaseGreen": return Color.DarkCaseGreen || Color.CaseGreen;
        case "GlowTitle": return Color.DarkGlowTitle || Color.GlowTitle;
        default: return getAccentColor(key);
    }
};

/* =============================
   Styled Components
============================= */

const NavWrapper = styled.div`
    position: fixed;
    top: 30%;
    right: 30px;
    transform: translateY(-50%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 10px;
    perspective: 1000px;
    opacity: 0;
    transition: opacity 4.5s ease-in;

    @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: none;
    }

    ${({ navDotsVisible }) =>
        navDotsVisible &&
        css`
            opacity: 1;
        `}
`;

const NavDotWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    transition: transform 0.15s ease-out, opacity 0.15s ease;
    &:hover {
        transform: translateX(-5px) rotateY(-5deg);
    }
`;

const TagWrapper = styled.div`
    position: relative;
    width: 140px;
    height: 50px;
    overflow: visible;
    cursor: pointer;
    z-index: 9999;
    transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

    &.pop-up {
        animation: ${popUp} 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    &:hover {
        transform: scale(1.05) translateY(-2px);
    }
`;

const TagSVG = styled.svg`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

const TagVideo = styled.video`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.45;
    z-index: 0;
    pointer-events: none;
    clip-path: url(#clip-navdot);
`;

const TagLabel = styled.div`
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.1rem;
    pointer-events: none;
    text-shadow: 0 0 4px ${Color.PrimaryAccent}, 0 0 10px ${Color.PrimaryAccent}90;
`;

const Label = styled.span`
    position: absolute;
    right: calc(140px + 2vw);
    white-space: nowrap;
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    z-index: 1;
    pointer-events: none;
    transition: opacity 0.15s ease-out, transform 0.15s ease-out;
    color: ${Color.TextOnLight};
    opacity: 0.5;
    transform: translateX(10px);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);

    ${NavDotWrapper}:hover & {
        transform: translateX(0);
        opacity: 1;
    }
`;

/* =============================
   NavTag Component
============================= */

function NavTag({ colorKey, active, onClick, index }) {
    const [currentShape, setCurrentShape] = useState(
        BASE_SHAPES[index % BASE_SHAPES.length]
    );

    const accentColor = getAccentColor(colorKey);
    const darkAccentColor = getDarkAccentColor(colorKey);
    const isGlowTitle = colorKey === "GlowTitle";

    const morphTag = () => {
        let newShape;
        do {
            newShape =
                BASE_SHAPES[Math.floor(Math.random() * BASE_SHAPES.length)];
        } while (newShape === currentShape);
        setCurrentShape(newShape);
    };

    const fillBaseColor = isGlowTitle ? accentColor : `${darkAccentColor}20`;
    const fillActiveColor = accentColor;
    const strokeColor = isGlowTitle
        ? darkAccentColor
        : active
        ? accentColor
        : darkAccentColor;
    const labelColor = isGlowTitle
        ? Color.TextOnLight
        : Color.TextOnBlack;

    return (
        <TagWrapper
            className={active ? "pop-up" : ""}
            onClick={onClick}
            onMouseEnter={morphTag}
        >
            <TagSVG viewBox="0 0 100 40" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <clipPath id="clip-navdot">
                        <polygon points={currentShape} />
                    </clipPath>
                </defs>

                <polygon
                    points={currentShape}
                    fill={active ? fillActiveColor : fillBaseColor}
                    stroke={strokeColor}
                    strokeWidth={active ? 4.5 : 3.5}
                    style={{
                        transition:
                            "all 0.36s cubic-bezier(0.22,1,0.36,1)",
                    }}
                />
            </TagSVG>

            {textureVideo && (
                <TagVideo
                    src={textureVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            )}

            <TagLabel style={{ color: labelColor }}>•</TagLabel>
        </TagWrapper>
    );
}

/* =============================
   NavDots Component
============================= */

export default function NavDots({
    sections,
    activeIndex,
    onDotClick,
    navDotsVisible
}) {
    const [hoveredDot, setHoveredDot] = useState(null);
    const [wrapperHover, setWrapperHover] = useState(false);

    const handleDotClick = (i) => {
        onDotClick(i);
    };

    return (
        <NavWrapper
            navDotsVisible={navDotsVisible}
            onMouseEnter={() => setWrapperHover(true)}
            onMouseLeave={() => {
                setWrapperHover(false);
                setHoveredDot(null);
            }}
        >
            {sections.map((s, i) => {
                const accentColorKey = TAG_COLORS[i % TAG_COLORS.length];

                let labelOpacity = 0;
                if (wrapperHover) {
                    if (hoveredDot === null) labelOpacity = 0.5;
                    else if (hoveredDot === i) labelOpacity = 1;
                    else labelOpacity = 0.2;
                }

                return (
                    <NavDotWrapper
                        key={i}
                        onMouseEnter={() => setHoveredDot(i)}
                        onMouseLeave={() => setHoveredDot(null)}
                    >
                        <NavTag
                            colorKey={accentColorKey}
                            active={i === activeIndex}
                            index={i}
                            onClick={() => handleDotClick(i)}
                        />

                        <Label
                            style={{
                                opacity: labelOpacity,
                                color: Color.TextOnBlack
                            }}
                        >
                            {s.title}
                        </Label>
                    </NavDotWrapper>
                );
            })}
        </NavWrapper>
    );
}

