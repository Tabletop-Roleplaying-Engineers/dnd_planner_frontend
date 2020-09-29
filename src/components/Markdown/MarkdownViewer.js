import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateFromMarkdown } from 'draft-js-import-markdown';

export const MarkdownViewer = ({ markdown = '', ...props }) => {
    const content = stateFromMarkdown(markdown.replace(/\n/gi, '\n\n'));
    const editorState = EditorState.createWithContent(content);

    return <Editor
        toolbarHidden
        readOnly
        editorStyle={{ whiteSpace: 'pre-wrap' }}
        editorState={editorState} />
}