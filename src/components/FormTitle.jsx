import React from "react";

import {FormTitleStyle, FormTitleText} from "../style/main";

const FormTitle = ({title}) => {
	return (
	<FormTitleStyle>
		<FormTitleText>{title}</FormTitleText>
	</FormTitleStyle>
	);
};

export default FormTitle;