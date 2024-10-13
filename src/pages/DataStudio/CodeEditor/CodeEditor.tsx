import React, { useEffect, useRef, useState } from 'react'
import Editor,{ Monaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import {
  CancellationToken,
  Selection,
  editor,
  languages,
  Position
} from 'monaco-editor';

import { finalEditorOptions } from '@/pages/DataStudio/CodeEditor/options-bak.ts'
import { editorOptions } from '@/pages/DataStudio/CodeEditor/options.ts'
import { Languages } from '@/pages/DataStudio/CodeEditor/languages.ts'
import { sqlLanConf, sqlLanToken } from '@/pages/DataStudio/CodeEditor/languages/sql/config.ts'
import { sqlItemProvider } from '@/pages/DataStudio/CodeEditor/languages/completionItems.ts'

import css from './CodeEditor.module.css'



// ****** 使用自带的包,不请求 cdn 的包,容易超时
import { loader } from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Toolbar from '@/pages/DataStudio/CodeEditor/Toolbar'
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

// 类型
type tMonaco = typeof monaco;
type tCodeEditor = monaco.editor.IStandaloneCodeEditor;
type iCodeEditor = monaco.editor.ICodeEditor;

/**
 *
 * @constructor
 */
const CodeEditor = () => {

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
  let curDeration: editor.IEditorDecorationsCollection
  let curDerationColor: editor.IEditorDecorationsCollection

  const changeColorRange = (selectionFlag: boolean = false, startLineNumber: number, startColumn: number,
                            endLineNumber: number, endColumn: number) => {

    if (curDerationColor) {
      curDerationColor.clear()
    }

    if(!editorRef.current) return

    const model: editor.ITextModel | null = editorRef.current.getModel();
    if (!model) {
      return;
    }
    const totalLine = model.getLineCount()
    let beforeLineNum = startLineNumber
    for (let i = startLineNumber - 1; i >= 1; i--) {
      let content = model.getLineContent(i)
      if (content.indexOf(";") > 0) {
        i++;
        content = model.getLineContent(i)
        while (content.trim() === '') {
          content = model.getLineContent(i)
          i++
        }
        beforeLineNum = i - 1
        break;
      }
      if (i === 1) {
        beforeLineNum = 1
      }
    }

    let afterLineNum = totalLine
    for (let i = startLineNumber; i <= totalLine; i++) {
      const content = model.getLineContent(i)
      if (content.indexOf(";") > 0) {
        afterLineNum = i;
        break;
      }
    }

    if (selectionFlag) {
      beforeLineNum = startLineNumber
      afterLineNum = endLineNumber
    }

    curDerationColor = editorRef.current!.createDecorationsCollection([
      {
        range: new monaco.Range(beforeLineNum, 1, afterLineNum, 10000),
        options: {
          isWholeLine: true,
          linesDecorationsClassName: css.myLineDecoration,
        },
      }
    ]);
    console.log('=============beforeLineNum=afterLineNum', beforeLineNum, afterLineNum)
  }

  const changeExecPosition = (startLineNumber: number, startColumn: number,
                              endLineNumber: number, endColumn: number) => {
    if(!editorRef.current) return
    // if (currentDerarations) {
    //   const ids = currentDerarations.map(e => {
    //     return e.id
    //   });
    //   currentEditor.removeDecorations(ids)
    // }
    if (curDeration) {
      curDeration.clear()
    }
    const range = new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn);
    const decorations: editor.IModelDeltaDecoration[] = [
      {
        // startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number
        range: range,
        options: {
          isWholeLine: true,
          className: "myContentClass",
          glyphMarginClassName: `codicon-run ${css.runDecoration}`,
          glyphMarginHoverMessage: {
            value: '<p>运行(⌘Enter)</p>',
            supportHtml: true,
            supportThemeIcons: true
          }
        },
      }
    ]
    curDeration = editorRef.current.createDecorationsCollection(decorations)
    // res.clear()
    // const getDerations: editor.IModelDecoration[] | null = currentEditor.getDecorationsInRange(range)
    // getDerations?.forEach(e => {
    //   currentDerarations.push(e)
    // })
    console.log('changexxxxxxxxxabc', curDeration)
  }

  function onEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    monacoRef.current = monaco
    editorRef.current = editor


    // 绑定 mouse 事件
    editorRef.current.onMouseDown((e) => {
      if(!editorRef.current) return
      const userSelection: Selection | null = editorRef.current.getSelection()
      const model: editor.ITextModel | null = editorRef.current.getModel();
      const selectedText = model?.getValueInRange(userSelection!);
      console.log('mouse down: ', userSelection, selectedText)
      // console.log('mouse down: content', content)

      if (userSelection) {
        changeExecPosition(userSelection.startLineNumber, userSelection.startColumn,
          userSelection.endLineNumber, userSelection.endColumn);
        // changeColorRange(false, userSelection.startLineNumber,userSelection.startColumn,
        //   userSelection.endLineNumber, userSelection.endColumn);
      }
    })
    editorRef.current.onMouseUp((e) => {
      if(!editorRef.current) return
      const userSelection: Selection | null = editorRef.current.getSelection()
      const model: editor.ITextModel | null = editorRef.current.getModel();
      const selectedText = model?.getValueInRange(userSelection!);
      console.log('mouse up: ', userSelection, selectedText)
      if (userSelection) {
        // console.log('mouse up: content', content)
        if (selectedText) {
          changeColorRange(true, userSelection.startLineNumber, userSelection.startColumn,
            userSelection.endLineNumber, userSelection.endColumn);
        } else {
          changeColorRange(false, userSelection.startLineNumber, userSelection.startColumn,
            userSelection.endLineNumber, userSelection.endColumn);
        }
      }
    })

    // editor.layout()
    // editor.focus()
  }
  function onEditorChange(value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) {
    console.log('here is the current model value:', value);
  }

  function onClickRun() {
    if(!editorRef.current) return
    const selection = editorRef.current.getSelection();
    if(selection == null) return
    const execSql = selection.isEmpty() ? null : editorRef.current.getModel()?.getValueInRange(selection)
    console.log('执行的 SQL 逻辑是: ', execSql)
  }

  return (
    <>
      <div style={{height: '32px'}}>
        <Toolbar onRun={onClickRun}/>
      </div>
      <Editor
        height="100vh"
        // defaultLanguage="sql"
        defaultValue="-- 注释"
        language={language}
        options={editorOptions}
        beforeMount={handleEditorWillMount}
        onMount={onEditorDidMount}
        onChange={onEditorChange}
      />
    </>
  )
};

export default CodeEditor;
