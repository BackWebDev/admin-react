import styled from 'styled-components';
import {Layout} from 'antd';

const {Header} = Layout;

export const values = {
	height: "70px",
	logoDiff: "20px"
};

export const HeaderStyle = styled(Header)`
	height: ${values.height}!important;
`;

export const LogoWrap = styled.div`
	width: calc(${values.height} - ${values.logoDiff});
	height: calc(100% - ${values.logoDiff});
`;

export const Logo = styled.img`
	width: 100%;
`;