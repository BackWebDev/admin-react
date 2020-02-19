import React from "react";
import {Link} from "react-router-dom";
import {Menu, Icon} from "antd";

import {SiderStyle} from "../style/side-bar";

const {SubMenu} = Menu;

const SideBar = ({}) => {
	return (
	<SiderStyle>
		<Menu
		mode={"inline"}
		defaultSelectedKeys={["posts"]}
		style={{backgroundColor: "#002549", color: "#fff"}}
		>
			<SubMenu
			key={"posts"}
			title={<span><Icon type={"file"}/>Posts</span>}
			>
				<Menu.Item key={"add-post"}>
					<Link to={"/add-post"}>
						<Icon type={"file-add"}/>
						Add Post
					</Link>
				</Menu.Item>
				<Menu.Item key={"posts-report"}>
					<Link to={"/posts-report"}>
						<Icon type={"ordered-list"}/>
						Posts Report
					</Link>
				</Menu.Item>
			</SubMenu>
			<SubMenu
			key={"tags"}
			title={<span><Icon type={"tags"}/>Tags</span>}
			>
				<Menu.Item key={"add-tag"}>
					<Link to={"/add-tag"}>
						<Icon type={"file-add"}/>
						Add Tag
					</Link>
				</Menu.Item>
				<Menu.Item key={"tags-report"}>
					<Link to={"/tags-report"}>
						<Icon type={"ordered-list"}/>
						Tags Report
					</Link>
				</Menu.Item>
			</SubMenu>
			<SubMenu
			key={"categories"}
			title={<span><Icon type={"folder"}/>Categories</span>}
			>
				<Menu.Item key={"add-category"}>
					<Link to={"/add-category"}>
						<Icon type={"file-add"}/>
						Add Category
					</Link>
				</Menu.Item>
				<Menu.Item key={"categories-report"}>
					<Link to={"/categories-report"}>
						<Icon type={"ordered-list"}/>
						Categories Report
					</Link>
				</Menu.Item>
			</SubMenu>
		</Menu>
	</SiderStyle>
	);
};

export default SideBar;