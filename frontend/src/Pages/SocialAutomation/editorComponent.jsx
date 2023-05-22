import React, { useState, useContext, useRef, useEffect, useCallback, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import _ from 'lodash';
import {marked} from 'marked';

export function EditorMDE(props){

    const customMarkdownParser = (plainText) => {
        const html = marked(plainText);
        return html;
    };

    const options = useMemo(
        () => ({
          autofocus: true,
          spellChecker: false,
          placeholder: 'Create a post',
          minHeight: '100px',
          maxHeight: '180px',
          showIcons: [
            'code',
            'table',
            'horizontal-rule',
            'strikethrough',
            'heading',
            'quote',
            'unordered-list',
            'ordered-list',
            'clean-block',
            'link',
            'image',
            'redo',
            'undo',
          ],
          renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true,
          },
          previewRender: function (plainText) {
            const html = customMarkdownParser(plainText);
            return `<div class="prose-sm">${html}</div>`;
          },
        }),
        [] // No dependencies, options will be memoized
    );

    return(
        <SimpleMDE
            ref={props.editorRef}
            getMdeInstance={props.getMdeInstance}
            options={options}
            value={props.postText}
            onChange={props.setTextPost}
        />
    )
}