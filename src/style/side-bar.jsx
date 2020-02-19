import styled from 'styled-components';
import {Layout} from "antd";

import {values as headerValues} from "./header";

const {Sider} = Layout;

export const SiderStyle = styled(Sider)`
	border-top: 1px #ccc solid;
	height: calc(100vh - ${headerValues.height});
	padding-top: ${headerValues.height};
`;