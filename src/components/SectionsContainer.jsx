import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

// 🔹 Animations
const flashColors = keyframes`
  0% { color: #FF0077; filter: brightness(1.8); }
  20% { color: #00FFF0; }
  50% { color: #FFB800; }
  80% { color: #00C2FF; }
  100% { color: inherit; filter: brightness(1); }
`;

const breathing = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 0% 55%; }
`;

// 🔹 Mouvements aléatoires pour étiquettes
const floatLabel = keyframes`
  0% { transform: translate(0,0); }
  20% { transform: translate(${Math.random()*6-3}px, ${Math.random()*6-3}px); }
  40% { transform: translate(${Math.random()*6-3}px, ${Math.random()*6-3}px); }
  60% { transform: translate(${Math.random()*6-3}px, ${Math.random()*6-3}px); }
  80% { transform: translate(${Math.random()*6-3}px, ${Math.random()*6-3}px); }
  100% { transform: translate(0,0); }
`;

// 🔹 Calcul contraste
const getContrastColor = (hexColor) => {
  if (!hexColor) return "#000";
  const c = hexColor.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const brightness = (r*299 + g*587 + b*114)/1000;
  return brightness>150 ? "#000" : "#fff";
};

// 🔹 Hook scroll
const useScrollY = () => {
  const [scrollY,setScrollY] = useState(0);
  useEffect(()=>{
    const handleScroll = ()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",handleScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",handleScroll);
  },[]);
  return scrollY;
};

// 🔹 Conteneur global
const Container = styled.div`
  scroll-behavior: smooth;
  overflow-x: hidden;
  font-family: "Space Grotesk", sans-serif;
  position: relative;
`;

// 🔹 Section
const Section = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 6vw;
  text-align: left;
  color: ${({ textColor })=>textColor};
  background: linear-gradient(170deg,#777 0%,#fff 50%,#00000000 100%);
  background-size:100% 200%;
  animation: ${breathing} 12s ease-in-out infinite;
  box-shadow:0 10px 25px rgba(10,10,10,0.08);

  @media (max-width:768px){
    padding:4vw;
  }
`;

// 🔹 Deco
const Deco = styled.div`
  position:absolute;
  top:${({top})=>top||"20%"};
  left:${({left})=>left||"auto"};
  right:${({right})=>right||"auto"};
  width:0.4rem;
  height:40vh;
  background:linear-gradient(to bottom,
    ${({topColor})=>topColor||"#000"},
    ${({midColor})=>midColor||"#bafff7"},
    ${({bottomColor})=>bottomColor||"#000"}
  );
  transform: ${({scrollOffset,waveX,waveY})=>`translateX(${waveX}px) translateY(${waveY+scrollOffset}px) skewX(-8deg)`};
  transition: all 0.25s ease;
  opacity:0.15;
`;

// 🔹 Titres
const Title = styled.h1`
  font-size: clamp(3rem,10vw,8rem);
  font-weight:800;
  margin:0 0 0 3vw;
  text-transform: uppercase;
  line-height:0.9;
  letter-spacing:0.04em;
  position: relative;
  z-index:2;

  span{
    display:inline-block;
    ${({firstPanel})=>firstPanel && css`
      animation: ${flashColors} 1.8s ease-in-out forwards;
    `}
    transition: transform 0.25s ease, color 0.4s ease;
  }

  span:hover{
    transform:translateY(-6px);
    color:#00eaff;
  }

  @media(max-width:768px){
    font-size: clamp(2rem,8vw,5rem);
    margin-left:1.5vw;
  }
`;

const Subtitle = styled.h2`
  margin-top:1.5rem;
  font-weight:500;
  font-size:1.5rem;
  opacity:0.9;
`;

const Body = styled.p`
  margin:1.5rem 0;
  font-size:1.1rem;
  line-height:1.6;
  opacity:0.9;
  max-width:700px;
`;

// 🔹 CTA
const CTA = styled.a`
  display:inline-block;
  padding:1rem 2rem;
  font-weight:800;
  text-transform:uppercase;
  border-radius:1px;
  text-decoration:none;
  color:#fff;
  background:#000;
  transition: all 0.6s ease;
  cursor:pointer;
  margin-top:2rem;
  position:relative;
  z-index:2;

  &:hover{
    background:#b0d2ff;
    color:#000;
  }
`;

// 🔹 Navigation wrapper
const NavWrapper = styled.div`
      position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 60px;
    height: 32%;
    padding: 2rem 1rem;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 1px;
    border-bottom-right-radius: 1px;
    background: rgb(187 255 58 / 76%);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 45px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

// 🔹 NavDot
const NavDot = styled.button`
 width: 3rem;
    height: 3rem;
  border-radius:50%;
  border:none;
  background: ${({active})=>active?"linear-gradient(145deg,#00eaff,#0077ff)":"#333"};
  cursor:pointer;
  position:relative;
  transition: all 0.3s ease;

  &:hover{
    transform:scale(1.6);
    background: linear-gradient(145deg,#00ffff,#00b3ff);
    box-shadow:0 0 18px #00eaff;
  }

  & > span {
    display:none;
  }

  &:hover > span {
    display:block;
    position:absolute;
    left:-150%;
    top:50%;
    transform:translateY(-50%);
    max-width: max-content;
    white-space: nowrap;
    padding: 0.5rem 0.9rem;
    border-radius:1px;
    background: rgba(0,0,0,0.85);
    color:#fff;
    font-weight:700;
    font-size:1.2rem;
    animation: ${floatLabel} 4s ease-in-out infinite;
  }
`;

// 🔹 Composant
export default function SectionsContainer({sections}){
  const scrollY = useScrollY();

  const handleScrollTo = (id)=>document.getElementById(`section-${id}`)?.scrollIntoView({behavior:"smooth"});

  const waveX = (i,t)=>Math.sin(t*0.003+i)*(30+i*10);
  const waveY = (i,t)=>Math.sin(t*0.004+i*1.3)*(20+i*10);

  const currentSection = Math.round(scrollY/window.innerHeight);

  return (
    <>
      <Container>
        {sections.map((s,i)=>{
          const textColor = getContrastColor("#bfbfbf");
          const scrollOffset = scrollY*0.15;
          return (
            <Section key={i} id={`section-${i}`} textColor={textColor}>
              <Deco
                {...s.deco}
                scrollOffset={scrollOffset}
                waveX={waveX(i,scrollY)}
                waveY={waveY(i,scrollY)}
                topColor={s.deco?.topColor}
                midColor={s.deco?.midColor}
                bottomColor={s.deco?.bottomColor}
                left={i%2!==0?"6vw":"auto"}
                right={i%2===0?"6vw":"6vw"}
              />
              <Title firstPanel={i===0}>
                {s.title.split("").map((letter,idx)=><span key={idx} style={{animationDelay:`${idx*0.05}s`}}>{letter}</span>)}
              </Title>
              <Subtitle>{s.subtitle}</Subtitle>
              <Body dangerouslySetInnerHTML={{__html:s.body}} />
              {s.ctaHref && <CTA href={s.ctaHref}>{s.ctaText}</CTA>}
            </Section>
          )
        })}
      </Container>

      <NavWrapper>
        {sections.map((s,i)=>(
          <NavDot key={i} active={currentSection===i} onClick={()=>handleScrollTo(i)}>
            <span>{s.title}</span>
          </NavDot>
        ))}
      </NavWrapper>
    </>
  )
}
