import styled from "styled-components";

export const ShinyButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: ${p => p.theme.radius};
  font-weight: 800;
  background: ${p => p.theme.colors.cta};
  color: ${p => p.theme.colors.text};
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: #fff;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
    z-index: 2;
  }

  &:hover:before {
    transform: translateX(100%);
  }

  &:hover {
    color: ${p => p.theme.colors.text};
  }

  > span {
    position: relative;
    z-index: 3;
  }
`;
