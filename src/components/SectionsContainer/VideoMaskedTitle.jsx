// src/components/VideoMaskedTitle.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const TitleWrapper = styled.h1`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  margin: 0 0 0 3vw;
  text-transform: uppercase;
  line-height: 0.85;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;
  display: inline-block;
  overflow: hidden;

  span {
    display: inline-block;
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  span:hover {
    transform: translateY(-8px) scale(1.05);
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-mask-image: text;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: cover;
    -webkit-mask-position: center;
    mask-image: text;
    mask-repeat: no-repeat;
    mask-size: cover;
    mask-position: center;
    pointer-events: none;
  }
`;

export default function VideoMaskedTitle({ text, videoSrc }) {
  return (
    <TitleWrapper>
      <video src={videoSrc} autoPlay loop muted playsInline />
      {text.split("").map((letter, idx) => (
        <span key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
          {letter}
        </span>
      ))}
    </TitleWrapper>
  );
}

