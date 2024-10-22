import React, { useEffect, useRef, useState } from 'react'
// ****** 使用自带的包,不请求 cdn 的包,容易超时
import Editor, { loader, Monaco } from '@monaco-editor/react'

import * as monaco from 'monaco-editor'
import { editor, KeyCode, languages, Selection } from 'monaco-editor'
import { editorOptions } from '@/pages/DataStudio/CodeEditor/options.ts'
import { Languages } from '@/pages/DataStudio/CodeEditor/languages.ts'
import { sqlLanConf, sqlLanToken } from '@/pages/DataStudio/CodeEditor/languages/sql/config.ts'
import { sqlItemProvider } from '@/pages/DataStudio/CodeEditor/languages/completionItems.ts'

import css from './CodeEditor.module.css'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Toolbar, { ActionType } from '@/pages/DataStudio/CodeEditor/Toolbar'
import { getSurroundingContent } from '@/pages/DataStudio/CodeEditor/functions.ts'

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
  }
};
loader.config({monaco});

// loader.init().then(/* ... */);

// 类型
type tMonaco = typeof monaco;
type tCodeEditor = monaco.editor.IStandaloneCodeEditor;
type iCodeEditor = monaco.editor.ICodeEditor;

/**
 *
 * @constructor
 */
type PropsType = {
  onAction: (action: ActionType) => void
}
const CodeEditor: React.FC<PropsType> = (props) => {

  const {
    onAction
  } = props

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

  /**
   * 修改左侧颜色的
   */
  const changeColorRange = (selectionFlag: boolean = false, selection: Selection) => {
    if (curDerationColor) {
      curDerationColor.clear()
    }

    if (!editorRef.current) return

    const model: editor.ITextModel | null = editorRef.current.getModel()
    if (!model) {
      return;
    }
    const {startLineNumber, startColumn, endLineNumber, endColumn} = selection
    curDerationColor = editorRef.current.createDecorationsCollection([
      {
        range: new monaco.Range(startLineNumber, 1, endLineNumber, 10000),
        options: {
          isWholeLine: true,
          linesDecorationsClassName: css.myLineDecoration
        }
      }
    ]);
    console.log('changeColorRange===========beforeLineNum=afterLineNum', startLineNumber, endLineNumber)
  }

  /**
   * 修改左侧执行图标
   */
  const changeExecPosition = (selection: Selection) => {
    if (!editorRef.current) return
    if (curDeration) {
      curDeration.clear()
    }
    let {startLineNumber, startColumn, endLineNumber, endColumn} = selection
    endLineNumber = startLineNumber  // 只显示第一行的
    const range = new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn);
    console.log('changeExecPosition===========', range)
    const decorations: editor.IModelDeltaDecoration[] = [
      {
        range: range,
        options: {
          isWholeLine: true,
          className: "myContentClass",
          glyphMarginClassName: `codicon-run ${css.runDecoration}`,
          glyphMarginHoverMessage: {
            value: '<p id="code-run">运行(⌘Enter)</p>',
            supportHtml: true,
            supportThemeIcons: true
          }
        }
      }
    ]
    curDeration = editorRef.current.createDecorationsCollection(decorations)
  }

  function getSelectionAndText(): [Selection | null, string] {
    if (editorRef.current) {
      const userSelection: Selection | null = editorRef.current.getSelection()
      const model: editor.ITextModel | null = editorRef.current.getModel();
      const selectedText = model?.getValueInRange(userSelection!);
      if (userSelection && selectedText) {
        return [userSelection, selectedText]
      }
    }
    return [null, '']
  }

  function onEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    // 绑定 monaco 和 editor 实例
    monacoRef.current = monaco
    editorRef.current = editor

    // 绑定 mouse 事件
    editorRef.current.onMouseDown((e) => {
      if (!editorRef.current) return
      // const userSelection: Selection | null = editorRef.current.getSelection()
      // const model: editor.ITextModel | null = editorRef.current.getModel();
      // const selectedText = model?.getValueInRange(userSelection!)
      const [userSelection, selectedText] = getSelectionAndText()

      // console.log('mouse down userSelection: ', userSelection)
      // console.log('mouse down selectedText: ', selectedText)
      // // console.log('mouse down: content', content)
      //
      // if (userSelection && selectedText) {
      //   changeExecPosition(userSelection);
      //   // changeColorRange(false, userSelection.startLineNumber,userSelection.startColumn,
      //   //   userSelection.endLineNumber, userSelection.endColumn);
      // }
      if (curDerationColor) {
        curDerationColor.clear()
      }
      if (curDeration) {
        curDeration.clear()
      }
    })
    editorRef.current.onMouseUp((e) => {
      if (!editorRef.current) return
      const [userSelection, selectedText] = getSelectionAndText()
      console.log('mouse up userSelection: ', userSelection)
      console.log('mouse up selectedText: ', selectedText)

      if (userSelection) {
        // console.log('mouse up: content', content)
        if (selectedText) {
          changeExecPosition(userSelection)
          changeColorRange(true, userSelection)
        } else {
          changeColorRange(false, userSelection);
        }
      } else {
        const { startLineNumber = 0,endLineNumber = 0,content  = ''} = getSurroundingContent( editorRef.current!) || {}
        console.log('onMouseUpxxxxxx ', content)
        if (content.length > 0) {
          const selection = new Selection(startLineNumber, 0, endLineNumber, 1000000);
          changeColorRange(false, selection)
          changeExecPosition(selection)
        }
      }

      // 执行按钮
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
        const lineNumber = e.target.position?.lineNumber;
        if (lineNumber) {
          console.log(`Glyph margin clicked at line: ${lineNumber}`);
        }
      }

    })

    editorRef.current.onKeyDown((e) => {
      // console.log('key down', e)
      // if (curDerationColor) {
      //   curDerationColor.clear()
      // }
      // if (curDeration) {
      //   curDeration.clear()
      // }
    })
    editorRef.current.onKeyUp((e) => {
      // const res = ![KeyCode.UpArrow, KeyCode.DownArrow, KeyCode.LeftArrow, KeyCode.RightArrow].includes(e.keyCode)
      // console.log('key up', res)
      // if (res) {
      //   return
      // }
      if (curDerationColor) {
        curDerationColor.clear()
      }
      if (curDeration) {
        curDeration.clear()
      }
      const [userSelection, selectedText] = getSelectionAndText()
      // console.log('key up', userSelection, userSelection)
      // const lineNumber = e.target.position?.lineNumber;

      if (userSelection && selectedText) {
        if (selectedText) {
          changeExecPosition(userSelection)
          changeColorRange(true, userSelection)
        } else {
          changeColorRange(false, userSelection)
        }
      } else {
        const { startLineNumber = 0,endLineNumber = 0, content  = ''} = getSurroundingContent( editorRef.current!) || {}
        console.log('onMouseUpxxxxxx ', content)
        if (content.length > 0) {
          const selection = new Selection(startLineNumber, 0, endLineNumber, 1000000);
          changeColorRange(false, selection)
          changeExecPosition(selection)
        }
      }


    })


    // 绑定快捷键
    editorRef.current.addCommand(monaco.KeyMod.CtrlCmd + monaco.KeyCode.Enter, () => {
      console.log('cmd/ctrl+enter开始执行.......')
    })


    // 绑定右键的操作
    editorRef.current.addAction({
      id: 'find',
      label: '查找',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF],
      // keybindingContext: null,
      contextMenuGroupId: 'control',
      contextMenuOrder: 1.6,
      run(editor) {
        editor.trigger('find', 'actions.find', null)
      }
    })

    // 初始化完后,聚焦光标
    editor.layout()
    editor.focus()
  }

  function onEditorChange(value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) {
    console.log('here is the current model value:', value);
  }


  return (
    <>
      <Toolbar onAction={onAction}/>
      <Editor
        // height="100vh"
        // defaultLanguage="sql"
        defaultValue=""
        language={language}
        options={editorOptions}
        beforeMount={handleEditorWillMount}
        onMount={onEditorDidMount}
        onChange={onEditorChange}
      />

      {/* 最简单的 editor  */}
      {/*<Editor
        defaultLanguage="javascript"
        defaultValue="// some comment"
        options={{
          scrollBeyondLastLine: false,
        }}
      />*/}
    </>
  )
};

export default CodeEditor;
