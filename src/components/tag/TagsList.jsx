import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Table} from "antd";

import Loader from "../Loader";

const {Column} = Table;

const TagsList = ({}) => {
	const [state, setState] = useState({
		tags: [],
		pageSize: 10,
		loading: true
	});

	useEffect(() => {
		fetch("https://idea.growthside.app/api/get-tags", {
			method: "GET"
		}).then(response => response.json())
		.then(json => {
			if (!json.status || !json.data) {
				return false;
			}

			setState({
				...state,
				loading: false,
				tags: json.data.reduce((data, item) => {
					item.key = item.id;
					item.action = item.id;
					data.push(item);
					return data;
				}, [])
			});
		});
	}, [false]);

	const remove = id => {
		fetch("https://idea.growthside.app/api/delete-tag", {
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
				tags: state.tags.reduce((tags, item) => {
					if (id !== item.id) {
						tags.push(item);
					}
					return tags;
				}, [])
			});
		});
	};

	return (
	<React.Fragment>
		{state.loading && <Loader/>}
		<Table
		dataSource={state.tags}
		pagination={{pageSize: state.pageSize}}
		>
			<Column title={"ID"} dataIndex={"id"} key={"id"}/>
			<Column title={"Name"} dataIndex={"name"} key={"name"}/>
			<Column
			title={"Action"}
			dataIndex={"action"}
			key={"action"} render={id => {
				return (
				<React.Fragment>
					<Button
					type={"danger"}
					onClick={() => {remove(id)}}
					>Delete</Button>
					&nbsp;
					<Link to={"/tag-edit/"+id}>
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

export default TagsList;