import React, { useEffect, useRef, useState } from 'react'
import Editor,{ Monaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import {
  CancellationToken,
  editor, languages, Position
} from 'monaco-editor';

import { finalEditorOptions } from '@/pages/DataStudio/CodeEdit/options-bak.ts'
import { editorOptions } from '@/pages/DataStudio/CodeEdit/options.ts'
import { Languages } from '@/pages/DataStudio/CodeEdit/languages.ts'
import { sqlLanConf, sqlLanToken } from '@/pages/DataStudio/CodeEdit/languages/sql/config.ts'
import { sqlItemProvider } from '@/pages/DataStudio/CodeEdit/languages/completionItems.ts'


import { loader } from '@monaco-editor/react';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

// loader.init().then(/* ... */);

const CodeEdit = () => {


  const [language, setLanuguage] = useState('')
  useEffect(() => {
    setLanuguage(Languages.SQL)
  }, [])

  // editor.IStandaloneCodeEditor
  // Monaco['editor']
  const editorRef = useRef<editor.IStandaloneCodeEditor>()
  // Monaco
  const monacoRef = useRef<Monaco>()

  function handleEditorWillMount(monaco: Monaco) {
    const languages: Monaco['languages'] = monaco.languages
    const curLan = languages.getEncodedLanguageId(language)
    console.log('monacoeditor-before-mount;;;;;languages', curLan)
    // here is the monaco instance
    // do something before editor is mounted
    // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

    // 注册新语言
    languages.register({
      id: Languages.SQL,
      extensions: ['.sql']
    })
    // 注册新语言: token
    languages.setMonarchTokensProvider(Languages.SQL, sqlLanToken)
    // 注册新语言: config
    languages.setLanguageConfiguration(Languages.SQL, sqlLanConf)
    // 注册新语言: 自动提示
    languages.registerCompletionItemProvider(Languages.SQL, sqlItemProvider)


  }
  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    monacoRef.current = monaco
    editorRef.current = editor

    // editor.layout()
    // editor.focus()
  }
  function handleEditorChange(value, event) {
    // console.log('here is the current model value:', value);
  }

  return (
    <>
      <Editor
        height="100vh"
        // defaultLanguage="sql"
        defaultValue="-- 注释"
        language={language}
        options={editorOptions}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </>
  )
};

export default CodeEdit;
