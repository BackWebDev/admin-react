import React from "react";
import {Form, Input, Button, Row, Col} from "antd";

import FormTitle from "../FormTitle";

import {FormStyle} from "../../style/main";

const TagAdd = ({form}) => {

	const submit = e => {
		e.preventDefault();
		fetch("https://idea.growthside.app/api/create-tag", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				name: form.getFieldValue('tag_name')
			})
		}).then(response => response.json())
		.then(json => {
			if (json.status) {
				form.resetFields();
			}
		});
	};

	const {getFieldDecorator} = form;

	return (
	<React.Fragment>
		<FormTitle title={"Tag Add"}/>
		<FormStyle onSubmit={submit}>
			<Form.Item>
				<Col span={12}>
					{
						getFieldDecorator("tag_name")(
						<Input placeholder={"Enter Tag Name"} name={"tag_name"}/>
						)
					}
				</Col>
			</Form.Item>
			<Form.Item>
				<Col span={3} offset={21}>
					<Button type={"primary"} htmlType={"submit"}>Add</Button>
				</Col>
			</Form.Item>
		</FormStyle>
	</React.Fragment>
	);
};

export default Form.create({name: "add_tag"})(TagAdd);