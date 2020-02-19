import React, {useState, useEffect} from "react";
import {Form, Input, Button, Col, notification} from "antd";

import FormTitle from "../FormTitle";

import {FormStyle} from "../../style/main";
import Loader from "../Loader";

const TagEdit = ({form}) => {
	const [state, setState] = useState({
		loading: true,
		id: window.location.pathname.split('/')[2],
		name: ""
	});

	useEffect(() => {
		fetch("https://idea.growthside.app/api/get-tag-by-id", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				id: state.id
			})
		}).then(response => response.json())
		.then(json => {
			if(!json.status || !json.data) {
				return false;
			}

			setState({
				...state,
				name: json.data.name,
				loading: false
			});
		});
	}, [false]);

	const submit = e => {
		e.preventDefault();
		fetch("https://idea.growthside.app/api/update-tag", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				tag: {
					name: form.getFieldValue("tag_name")
				},
				criteria: {
					id: state.id
				}
			})
		}).then(response => response.json())
		.then(json => {
			if (!json.status || !json.data) {
				notification['error']({
					message: "Error"
				});
				return false;
			}

			notification['success']({
				message: "Success"
			});
			setState({
				...state,
				name: form.getFieldValue("tag_name")
			});
		});
	};

	const {getFieldDecorator} = form;

	return (
	<React.Fragment>
		{state.loading && <Loader/>}
		<FormTitle title={"Tag Add"}/>
		<FormStyle onSubmit={submit}>
			<Form.Item>
				<Col span={12}>
					{
						getFieldDecorator("tag_name", {
							initialValue: state.name
						})(
						<Input placeholder={"Enter Tag Name"} name={"tag_name"}/>
						)
					}
				</Col>
			</Form.Item>
			<Form.Item>
				<Col span={3} offset={21}>
					<Button type={"primary"} htmlType={"submit"}>Edit</Button>
				</Col>
			</Form.Item>
		</FormStyle>
	</React.Fragment>
	);
};

export default Form.create({name: "add_tag"})(TagEdit);