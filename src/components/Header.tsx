import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Cotainer = styled.header`
  margin-bottom: 30px;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Home = styled.span`
  left: 0;
  font-size: 2em;

  a {
    color: ${(props) => props.theme.textColor};
  }
`;

const Button = styled.button`
  border: 0;
  font-size: 2em;
  background-color: inherit;
  color: ${(props) => props.theme.textColor};
`;

export default function Header({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((cur) => !cur);

  return (
    <Cotainer>
      <Home>
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </Home>
      {children}
      <Button onClick={toggleDarkAtom}>
        <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
      </Button>
    </Cotainer>
  );
}
