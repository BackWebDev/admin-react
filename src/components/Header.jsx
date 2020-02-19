import React from "react";

import {
	HeaderStyle,
	LogoWrap, Logo
} from "../style/header";

import LogoImg from "../assets/images/logo.png";

const Header = ({}) => {
	return (
	<HeaderStyle>
		<LogoWrap>
			<Logo src={LogoImg} alt={LogoImg}/>
		</LogoWrap>
	</HeaderStyle>
	);
};

export default Header;