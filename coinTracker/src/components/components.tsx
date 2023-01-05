import styled from "styled-components";

export const Header = styled.header`
  position: relative;
  margin: 30px;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.div`
  display: block;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;
