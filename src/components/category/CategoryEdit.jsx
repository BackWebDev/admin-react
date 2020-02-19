import React, {useState, useEffect} from "react";
import {Form, Input, Button, Col, notification} from "antd";

import FormTitle from "../FormTitle";
import Loader from "../Loader";

import {FormStyle} from "../../style/main";

const CategoryEdit = ({form}) => {
	const [state, setState] = useState({
		loading: true,
		name: "",
		id: window.location.pathname.split('/')[2]
	});

	useEffect(() => {
		fetch("", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				id: state.id
			})
		}).then(response => response.json())
		.then(json => {
			if (!json.status || !json.data) {
				return false;
			}

			setState({
				...state,
				loading: false,
				name: json.data.name
			});
		});
	}, [false]);

	const submit = e => {
		e.preventDefault();
		fetch("https://idea.growthside.app/api/update-category", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				category: {
					name: form.getFieldValue('category_name')
				},
				criteria: {
					id: state.id
				}
			})
		}).then(response => response.json())
		.then(json => {
			notification["success"]({
				message: "Success"
			});

			setState({
				...state,
				name: form.getFieldValue('category_name')
			});
		});
	};

	return (
	<React.Fragment>
		{state.loading && <Loader/>}
		<FormTitle title={"Category Add"} />
		<FormStyle onSubmit={submit}>
			<Form.Item>
				<Col span={12}>
					{
						form.getFieldDecorator("category_name", {
							initialValue: state.name
						})(
						<Input placeholder={"Enter Category Name"}/>
						)
					}
				</Col>
			</Form.Item>
			<Form.Item>
				<Col span={3} offset={23}>
					<Button type={"primary"} htmlType={"submit"}>Edit</Button>
				</Col>
			</Form.Item>
		</FormStyle>
	</React.Fragment>
	);
};

export default Form.create()(CategoryEdit);