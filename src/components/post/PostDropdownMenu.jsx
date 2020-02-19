import React from "react";
import {Menu} from "antd";

const PostDropdownMenu = ({menuClick, elems}) => {
	return (
	<Menu onClick={menuClick}>
		{
			Object.keys(elems).map(elemKey => (
			<Menu.Item key={elems[elemKey].id}>{elems[elemKey].name}</Menu.Item>
			))
		}
	</Menu>
	);
};

export default PostDropdownMenu;