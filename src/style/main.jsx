import styled from 'styled-components';
import {Form, Layout} from "antd";
import {values as headerValues} from "./header";

const {Content} = Layout;

export const FormTitleStyle = styled.div`
	width: 100%;
	margin: 40px;
	font-size: 30px;
`;

export const FormTitleText = styled.span`
	font-size: 30px;
`;

export const MainContent = styled(Content)`
	height: calc(100vh - ${headerValues.height})!important;
	overflow-y: scroll;
`;

export const FormStyle = styled(Form)`
	margin: 0 40px!important;
`;

export const LoaderStyle = styled.div`
	position: absolute;
	width: calc(100% - 200px);
	height: calc(100vh - ${headerValues.height});
	background: rgba(204,204,204,0.21);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
`;