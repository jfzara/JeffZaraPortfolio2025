import styled from "styled-components";

const ShinyRevealButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 0.8rem 1.8rem;
  font-weight: 800;
  color: #fff;
  background: #000;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border-radius: 1px;
  transition: color 0.4s cubic-bezier(0.4,0,0.2,1),
              background 0.4s cubic-bezier(0.4,0,0.2,1);

  span {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #b0d2ff;
    transform-origin: center;
    transform: rotateY(-180deg);
    z-index: 1;
    transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }

  &:hover::before {
    transform: rotateY(0deg);
  }

  &:hover {
    color: #464646;
  }
`;

export default ShinyRevealButton;