import { ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Cotainer = styled.header`
  position: relative;
  margin-bottom: 30px;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = styled.span`
  position: absolute;
  left: 0;
  font-size: 2em;

  a {
    color: ${(props) => props.theme.textColor};
  }
`;

export default function Header({ children }: { children: ReactNode }) {
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((cur) => !cur);

  return (
    <Cotainer>
      <Home>
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </Home>
      {children}
      <button onClick={toggleDarkAtom}>light/dark</button>
    </Cotainer>
  );
}
