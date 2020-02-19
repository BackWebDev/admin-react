import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Table, Tag} from "antd";

import Loader from "../Loader";

const {Column} = Table;

const PostsList = ({}) => {
	const [state, setState] = useState({
		posts: [],
		pageSize: 10,
		loading: true
	});

	useEffect(() => {
		fetch("", {
			method: "GET"
		}).then(response => response.json())
		.then(json => {
			if (!json.status || !json.data) {
				return false;
			}

			setState({
				...state,
				loading: false,
				posts: json.data.reduce((data, item) => {
					item.key = item.id;
					item.action = item.id;
					data.push(item);
					return data;
				}, [])
			});
		});
	}, [false]);

	const remove = id => {
		fetch("https://idea.growthside.app/api/delete-post", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				id: id
			})
		}).then(response => response.json())
		.then(json => {
			setState({
				...state,
				posts: state.posts.reduce((posts, post) => {
					if (post.id === id) {
						return posts;
					}

					posts.push(post);
					return posts;
				}, [])
			});
		});
	};

	return (
	<React.Fragment>
		{state.loading && <Loader/>}
		<Table
		dataSource={state.posts}
		pagination={{pageSize: state.pageSize}}
		>
			<Column title={"ID"} dataIndex={"id"} key={"id"}/>
			<Column title={"Title"} dataIndex={"title"} key={"title"}/>
			<Column
			title={"Tags"}
			dataIndex={"tags"}
			key={"tags"}
			render={tags => {
				return tags.map(tag => {
					return (<Tag color="magenta" key={tag.id}>{tag.name}</Tag>)
				})
			}}
			/>
			<Column
			title={"Categories"}
			dataIndex={"cats"}
			key={"cats"}
			render={cats => {
				return (cats.map(cat => {
					return (<Tag color="orange" key={cat.id}>{cat.name}</Tag>)
				}))
			}}
			/>
			<Column
			title={"Action"}
			dataIndex={"action"}
			key={"action"} render={id => {
				return (
				<React.Fragment>
					<Button
					type={"danger"}
					onClick={e => remove(id)}
					>Delete</Button>
					&nbsp;
					<Link to={"/post-edit/"+id}>
						<Button type={"primary"}>Edit</Button>
					</Link>
				</React.Fragment>
				);
			}}
			/>
		</Table>
	</React.Fragment>
	);
};

export default PostsList;