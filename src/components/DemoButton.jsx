import React from "react";
import * as S from "./DemoButton.styles";

const DemoButton = () => {
  return (
    <S.Wrapper>
      <S.VideoBackground
        src="/videos/demo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <S.Outline />  {/* Bordure extérieure */}

      <S.Label>DEMO</S.Label>
    </S.Wrapper>
  );
};

export default DemoButton;
