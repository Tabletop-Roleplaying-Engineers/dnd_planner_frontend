import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { stateToMarkdown } from 'draft-js-export-markdown';

export class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: props.value || '',
            editorState: EditorState.createEmpty()
        };
    }

    componentDidMount() {
        const content = stateFromMarkdown(this.props.value || '');
        const editorState = EditorState.createWithContent(content);
        this.setState({
            editorState: editorState
        })

    }

    onEditorStateChange = (e) => {
        const content = e.getCurrentContent();
        const markdown = stateToMarkdown(content);
        this.props.onChange(markdown);
        this.setState({
            editorState: e,
            markdown: markdown
        });
    }

    render() {
        const { placeholder, rowsCount } = this.props;
        const lineHeight = 21;

        return <Editor
            editorClassName='ant-input textarea'

            editorState={this.state.editorState}
            editorStyle={{ lineHeight: `${lineHeight}px`, maxHeight: `${rowsCount * lineHeight}px`, height: `${rowsCount * lineHeight}px` }}
            onEditorStateChange={this.onEditorStateChange}
            placeholder={placeholder}
            stripPastedStyles
            toolbar={{
                options: ['inline'],
                inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough']
                }
            }} ></Editor>

    }
}