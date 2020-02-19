import React from "react";
import {Spin} from "antd";

import {LoaderStyle} from "../style/main";

const Loader = ({}) => {
	return (
	<LoaderStyle>
		<Spin size={"large"}/>
	</LoaderStyle>
	);
};

export default Loader;