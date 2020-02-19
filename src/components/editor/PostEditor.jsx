import React, {useState, useRef, useEffect} from 'react';
import JoditEditor from "jodit-react";

import "./style.css";

const PostEditor = ({changeContent, initContent}) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	useEffect(() => {
		setContent(initContent);
	}, [initContent]);

	const config = {
		readonly: false
	};

	return (
	<JoditEditor
	ref={editor}
	value={content}
	config={config}
	tabIndex={1}
	onChange={changeContent}
	style={{height: "5000px!important"}}
	/>
	);
};

export default PostEditor;