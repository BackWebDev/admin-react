import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Layout} from "antd";

import Header from "./components/Header";
import SideBar from "./components/SideBar";

import PostAdd from "./components/post/PostAdd";
import PostsList from "./components/post/PostsList";
import PostEdit from "./components/post/PostEdit";

import TagAdd from "./components/tag/TagAdd";
import TagsList from "./components/tag/TagsList";
import TagEdit from "./components/tag/TagEdit";

import CategoryAdd from "./components/category/CategoryAdd";
import CategoriesList from "./components/category/CategoriesList";
import CategoryEdit from "./components/category/CategoryEdit";

import {MainContent} from "./style/main";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
		<Router>
			<Layout>
				<Header/>
				<Layout>
					<SideBar/>
					<MainContent>
						<Switch>
							<Route  path={'/add-post'}>
								<PostAdd/>
							</Route>
							<Route path={'/posts-report'}>
								<PostsList/>
							</Route>
							<Route path={'/post-edit/:id'}>
								<PostEdit/>
							</Route>

							<Route path={'/add-tag'}>
								<TagAdd/>
							</Route>
							<Route path={'/tags-report'}>
								<TagsList/>
							</Route>
							<Route path={'/tag-edit/:id'}>
								<TagEdit/>
							</Route>

							<Route path={'/add-category'}>
								<CategoryAdd/>
							</Route>
							<Route path={'/categories-report'}>
								<CategoriesList/>
							</Route>
							<Route path={'/category-edit/:id'}>
								<CategoryEdit/>
							</Route>
						</Switch>
					</MainContent>
				</Layout>
			</Layout>
		</Router>
		);
	};
}

export default App;