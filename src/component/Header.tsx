import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../recoil/ThemeSetting";

const HeaderBox = styled.header`
  display: flex;
  width: 100vw;
  height: 95px;
  padding: 25px 200px;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
`;

const MenuBox = styled.div`
  width: 100%;
  display: flex;
`;
const Logo = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  svg {
    width: 45px;
    height: 45px;
  }
  span {
    font-size: 24px;
    padding-left: 10px;
    font-weight: 600;
    color : ${props => props.theme.textColor};
  }
`;

const Menu = styled.div`
  flex-basis: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-weight: 600;
    color : ${props => props.theme.textColor};
  }
`;

const ThemeMode = styled(motion.div)`
  width: 80px;
  height: 40px;
  background-color: #e2e2e2;
  border-radius: 20px;
  border: 3px solid #cecece;
  display: flex;
  align-items: center;
`;

const ThemeButton = styled(motion.button)`
  width: 60px;
  height: 34px;
  border-radius: 16px;
  background-color: ${props => props.theme.modeColor};
  border: none;
  color : ${props => props.theme.textColor};
  cursor: pointer;
`;

const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
  };

function Header() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const [selected, setSelected] = useState(false);
  const toggleTheme = () => {
      setDarkAtom((prev) => !prev);
      setSelected((prev) => !prev);
  };
  return (
    <HeaderBox>
      <MenuBox>
        <Logo>
          <svg
            color="tomato"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
          >
            <path
              fill="currentColor"
              d="M352 384h108.4C417 455.9 338.1 504 248 504S79 455.9 35.6 384H144V256.2L248 361l104-105v128zM88 336V128l159.4 159.4L408 128v208h74.8c8.5-25.1 13.2-52 13.2-80C496 119 385 8 248 8S0 119 0 256c0 28 4.6 54.9 13.2 80H88z"
            ></path>
          </svg>
          <span>Crypto Tracker</span>
        </Logo>
        <Menu>
          <p>비트코인은 혁신적인 지불 네트워크이며 돈의 새로운 종류입니다</p>
          <ThemeMode onClick={toggleTheme}>
            {!selected ? (
              <ThemeButton
                layoutId="circle"
                initial={false}
                animate={false}
                transition={spring}
                style={{ marginLeft: 0 }}
              >
                Day
              </ThemeButton>
            ) : null}
            {selected ? (
              <ThemeButton
                layoutId="circle"
                initial={false}
                animate={false}
                transition={spring}
                style={{ marginLeft: 16 }}
              >
                Night
              </ThemeButton>
            ) : null}
          </ThemeMode>
        </Menu>
      </MenuBox>
    </HeaderBox>
  );
}

export default Header;
