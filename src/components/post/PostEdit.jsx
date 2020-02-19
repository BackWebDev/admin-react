import React, {useState, useEffect} from "react";
import {Row, Form, Input, Col, Button, Dropdown, Tag} from "antd";

import FormTitle from "../FormTitle";
import PostEditor from "../editor/PostEditor";
import PostDropdownMenu from "./PostDropdownMenu";

import {FormStyle} from "../../style/main";

const PostEdit = ({form}) => {
	const [state, setState] = useState({
		tags: [],
		categories: [],
		selectedTags: {},
		selectedCategories: [],
		initContent: "",
		id: window.location.pathname.split('/')[2],
		title: ""
	});

	useEffect(() => {
		let localState = {
			tags: {},
			categories: {}
		};
		fetch("", {
			method: "GET"
		}).then(response => response.json())
		.then(tags => {
			if (!tags.status || !tags.data) {
				return false;
			}

			localState.tags = tags.data.reduce((data, item) => {
				item.key = item.id;
				item.action = item.id;
				data[item.id] = item;
				return data;
			}, {});

			return fetch("https://idea.growthside.app/api/get-categories", {
				method: "GET"
			});
		}).then(response => response.json())
		.then(cats => {
			if (!cats.status || !cats.data) {
				return false;
			}

			localState.categories = cats.data.reduce((data, item) => {
				item.key = item.id;
				item.action = item.id;
				data[item.id] = item;
				return data;
			}, {});

			setState({
				...state,
				...localState
			});
		});
	}, [false]);

	let content = "";

	const changeTag = tag => {
		let selectedTags = {...state.selectedTags};
		selectedTags[tag.key] = {
			...state.tags[tag.key]
		};

		let tags = {...state.tags};
		delete tags[tag.key];

		setState({
			...state,
			selectedTags: selectedTags,
			tags: tags
		});
	};

	const removeTag = id => {
		let selectedTags = {...state.selectedTags};
		if (!selectedTags[id]) {
			return false;
		}

		let tags = {...state.tags};
		tags[id] = {
			...selectedTags[id]
		};

		delete selectedTags[id];
		setState({
			...state,
			selectedTags: selectedTags,
			tags: tags
		});
	};

	const changeCategory = category => {
		let selectedCategories = {...state.selectedCategories};
		selectedCategories[category.key] = {
			...state.categories[category.key]
		};

		let categories = {...state.categories};
		delete categories[category.key];

		setState({
			...state,
			selectedCategories: selectedCategories,
			categories: categories
		});
	};

	const removeCategory = id => {
		let selectedCategories = {...state.selectedCategories};
		if(!selectedCategories[id]) {
			return false;
		}

		let categories = {...state.categories};
		categories[id] = selectedCategories[id];

		delete selectedCategories[id];
		setState({
			...state,
			selectedCategories: selectedCategories,
			categories: categories
		});
	};

	const changeEditor = editorContent => {
		content = editorContent;
	};

	const submit = e => {
		e.preventDefault();
		// fetch("https://idea.growthside.app/api/create-post", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type" : "application/json"
		// 	},
		// 	body: JSON.stringify({
		// 		title: form.getFieldValue('post_title'),
		// 		content: content,
		// 		tags: Object.keys(state.selectedTags).reduce((ids, id) => {
		// 			ids.push(id);
		// 			return ids;
		// 		}, []),
		// 		categories: Object.keys(state.selectedCategories).reduce((ids, id) => {
		// 			ids.push(id);
		// 			return ids;
		// 		}, [])
		// 	})
		// }).then(response => response.text())
		// .then(json => {
		// 	form.resetFields();
		// 	setState({
		// 		...state,
		// 		initContent: "",
		// 		tags: Object.assign({}, state.tags, state.selectedTags),
		// 		categories: Object.assign({}, state.categories, state.selectedCategories),
		// 		selectedCategories: {},
		// 		selectedTags: {}
		// 	});
		// });
	};

	const {getFieldDecorator} = form;

	return (
	<React.Fragment>
		<FormTitle title={"Add new post"} onSubmit={submit}/>
		<FormStyle onSubmit={submit}>
			<Form.Item>
				<Col span={12}>
					{
						getFieldDecorator('post_title', {
							initialValue: state.title
						})(
						<Input placeholder={"Enter Post Title"}/>
						)
					}
				</Col>
			</Form.Item>
			<Form.Item>
				<Col span={6}>
					<Row>
						{
							Object.keys(state.selectedTags).map(tagKey => {
								return (<Tag
								color="magenta"
								key={state.selectedTags[tagKey].id}
								onClick={e => removeTag(state.selectedTags[tagKey].id)}
								style={{cursor: "pointer"}}
								>{state.selectedTags[tagKey].name}</Tag>)
							})
						}
					</Row>
					<Dropdown
					overlay={<PostDropdownMenu menuClick={changeTag} elems={state.tags}/>}
					trigger={['click']}
					>
						<Button>Select Tag</Button>
					</Dropdown>
				</Col>
				<Col span={6}>
					<Row>
						{
							Object.keys(state.selectedCategories).map(key => {
								return (
								<Tag
								color="orange"
								key={state.selectedCategories[key].id}
								style={{cursor: "pointer"}}
								onClick={e => removeCategory(state.selectedCategories[key].id)}
								>{state.selectedCategories[key].name}</Tag>
								);
							})
						}
					</Row>
					<Dropdown
					overlay={<PostDropdownMenu menuClick={changeCategory} elems={state.categories}/>}
					trigger={['click']}
					>
						<Button>Select Category</Button>
					</Dropdown>
				</Col>
			</Form.Item>
			<Form.Item>
				<PostEditor changeContent={changeEditor} initContent={state.initContent}/>
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

export default Form.create()(PostEdit);