import React from "react";
import {Form, Input, Button, Row, Col} from "antd";

import FormTitle from "../FormTitle";

import {FormStyle} from "../../style/main";

const CategoryAdd = ({form}) => {

	const {getFieldDecorator} = form;

	const submit = e => {
		e.preventDefault();
		fetch("", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				name: form.getFieldValue("category_name")
			})
		}).then(response => response.json())
		.then(json => {
			form.resetFields();
		});
	};

	return (
	<React.Fragment>
		<FormTitle title={"Category Add"} />
		<FormStyle onSubmit={submit}>
			<Form.Item>
				<Col span={12}>
					{
						getFieldDecorator("category_name")(
						<Input placeholder={"Enter Category Name"}/>
						)
					}
				</Col>
			</Form.Item>
			<Form.Item>
				<Col span={3} offset={23}>
					<Button type={"primary"} htmlType={"submit"}>Add</Button>
				</Col>
			</Form.Item>
		</FormStyle>
	</React.Fragment>
	);
};

export default Form.create()(CategoryAdd);