import React from 'react';
import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css"
import "codemirror/lib/codemirror.css"

const Markdown = () => {

  return (
    <Editor
      initialValue="### try to input markdown!"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
    />

  )
}

export default Markdown;
