import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import React, {useEffect, useState} from "react";
import {EditorHelper} from './monaco/sql-worker/EditorHelper'
import {defaultOptions} from './monaco/config';
import {Databases} from "@/services";
import {Query} from "@/services/types/query";
import {themeCobalt} from './monaco/theme/Cobalt';
import {themeDarcula} from './monaco/theme/Darcula';
import {SupportLanguage} from "./monaco/sql-worker/supportLanguage";
import {editor, Selection} from "monaco-editor";
import {delayFunctionWrap} from "@/components/EditorTabPage/SqlEditor/monaco/utils";

import css from './SimpleEditor.css'
import GlyphMarginLane = editor.GlyphMarginLane;

import {loader} from '@monaco-editor/react';

loader.config({monaco});

//
type tMonaco = typeof monaco;
type tCodeEditor = monaco.editor.IStandaloneCodeEditor;
type iCodeEditor = monaco.editor.ICodeEditor;


class execMarginWidget implements monaco.editor.IGlyphMarginWidget {

  private widget: HTMLElement

  constructor() {
    this.widget = document.createElement('div')
    this.widget.innerText = 'hello'
  }


  getDomNode(): HTMLElement {
    return this.widget
  }

  getId(): string {
    return "1234";
  }

  getPosition(): editor.IGlyphMarginWidgetPosition {
    return {
      lane: GlyphMarginLane.Right,
      range: {
        startColumn: 1,
        startLineNumber: 3,
        endColumn: 1,
        endLineNumber: 3,
      },
      zIndex: 10001,
    };
  }

}

// ------------------------------------------------------------------------------------
export interface SimpleEditorProps {
  content: string;
  onContentChange?: (content: string) => void;
  serverStructure?: Databases.Server;
  readonly?: boolean;
  processSql?: boolean;
  onMount?: () => void;
  onExecCommand?: (queryList: Array<Query>, isExecAll: boolean) => void;
}

const SimpleEditor: React.FC<SimpleEditorProps> = (props) => {

  const currentDerarations: editor.IModelDecoration[] = []

  let curDeration: editor.IEditorDecorationsCollection
  let curDerationColor: editor.IEditorDecorationsCollection

  const {
    content,
    serverStructure,
    processSql,
    onMount, onExecCommand,
    onContentChange
  } = props

  let tMonacoCur: tMonaco
  let currentEditor: tCodeEditor;
  const editorHelper = new EditorHelper()

  const monacoEditorOptions: monaco.editor.IEditorConstructionOptions =
    Object.assign({}, defaultOptions, {
      fontSize: 13,
      lineNumbersMinChars: 3,
    });

  const onEditorBeforeMount = (thisMonaco: tMonaco): void => {
    console.log('monaeditro....onEditorBeforeMount', thisMonaco);
    // thisMonaco.editor.defineTheme('cobalt', themeDarcula);
    tMonacoCur = thisMonaco
    if (serverStructure) {
      updateGlobalEditorStructure(serverStructure);
    }
  }

  const changeExecPosition = (startLineNumber: number, startColumn: number,
                              endLineNumber: number, endColumn: number) => {

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

    curDeration = currentEditor.createDecorationsCollection(decorations)
    // res.clear()
    // const getDerations: editor.IModelDecoration[] | null = currentEditor.getDecorationsInRange(range)
    // getDerations?.forEach(e => {
    //   currentDerarations.push(e)
    // })
    console.log('changexxxxxxxxxabc', curDeration)

  }

  const onEditorMount = (editor: tCodeEditor, thisMonaco: tMonaco) => {
    console.log('monaeditro....onEditorMount', editor, thisMonaco)
    currentEditor = editor
    tMonacoCur = thisMonaco
    processCurrent()

    // currentEditor.addGlyphMarginWidget(new execMarginWidget())

    // currentEditor.createDecorationsCollection([
    //   {
    //     range: new monaco.Range(3, 1, 3, 1),
    //     options: {
    //       isWholeLine: true,
    //       className: "myContentClass",
    //       glyphMarginClassName: `codicon-run ${css.runDecoration}`,
    //       glyphMarginHoverMessage: {
    //         value: '<p>运行(⌘Enter)</p>',
    //         supportHtml: true,
    //         supportThemeIcons: true
    //       }
    //     },
    //   },
    //   {
    //     range: new monaco.Range(3, 1, 5, 1),
    //     options: {
    //       isWholeLine: true,
    //       linesDecorationsClassName: css.myLineDecoration,
    //     },
    //   },
    //   {
    //     range: new monaco.Range(7, 1, 7, 24),
    //     options: { inlineClassName: css.myInlineDecoration },
    //   },
    // ])

    const changeColorRange = (selectionFlag: boolean = false, startLineNumber: number, startColumn: number,
                              endLineNumber: number, endColumn: number) => {

      if (curDerationColor) {
        curDerationColor.clear()
      }

      console.log(startLineNumber);
      const model: editor.ITextModel | null = editor.getModel();
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

      curDerationColor = currentEditor.createDecorationsCollection([
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

    currentEditor.onMouseDown((e) => {
      const userSelection: Selection | null = currentEditor.getSelection()
      const model: editor.ITextModel | null = editor.getModel();
      // @ts-ignore
      const selectedText = model?.getValueInRange(userSelection);
      console.log('mouse down: ', userSelection, selectedText)
      // console.log('mouse down: content', content)

      if (userSelection) {
        changeExecPosition(userSelection.startLineNumber, userSelection.startColumn,
          userSelection.endLineNumber, userSelection.endColumn);
        // changeColorRange(false, userSelection.startLineNumber,userSelection.startColumn,
        //   userSelection.endLineNumber, userSelection.endColumn);
      }

    })

    currentEditor.onMouseUp((e) => {
      const userSelection: Selection | null = currentEditor.getSelection()
      const model: editor.ITextModel | null = editor.getModel();
      // @ts-ignore
      const selectedText = model?.getValueInRange(userSelection);
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

    // @todo: Command-Left | Command-Right | Shift-Alt-Command-Right | Shift-Alt-Command-Right
    // @todo: Command-Shift-[NUM]
    // for (let i = 0; i < 9; i++) {
    // [ globalMonaco.KeyMod.Shift | globalMonaco.KeyMod.CtrlCmd | globalMonaco.KeyCode['KEY_'+i])] => self.actionChangeTab(i);

    // Bind keys
    editorHelper.bindBaseKeys(editor);
    // Attach Cmd+Enter key
    editorHelper.bindKeyExecCommand(editor, onExecCommandFunction);
    //
    editor.focus();
    // Call on mount
    onMount && onMount();
  }

  /**
   * Выполнение запросов, если получена command
   *
   * @param isAllQuery
   */
  const onExecCommandFunction = (isAllQuery: boolean) => {
    // Запросы которые необходимо отправить
    const execQueries =
      currentEditor && editorHelper?.createExecCurrentQuery(currentEditor, isAllQuery);
    if (execQueries?.length) {
      // Если запросы найдены и разобраны в обьекты Query
      if (onExecCommand) {
        onExecCommand(execQueries, isAllQuery);
      }
    } else {
      console.warn('Empty onExecCommand, after createExecCurrentQuery');
    }
  };

  const updateGlobalEditorStructure = (serverStructure: Databases.Server) => {
    if (!serverStructure) {
      console.warn('Error in updateGlobalEditorStructure, empty serverStructure!');
      return;
    }
    if (!tMonacoCur) {
      console.warn('Error in updateGlobalEditorStructure, empty this.tMonaco!');
      return;
    }
    //
    if (tMonacoCur && serverStructure) {
      // Base create completion,functions,tables,fields...
      // Register first CompletionItemProvider & MonarchTokensProvider
      // Attach to tMonaco - MonarchTokensProvider
      editorHelper.applyLanguage(SupportLanguage.CLICKHOUSE);
      editorHelper.applyServerStructure(serverStructure, tMonacoCur);
      editorHelper.register(tMonacoCur);
    }

    // Обрабатываем текущий запрос в активном таб/окне
    processCurrent();
  }

  /**
   * Parse current text in current monaco tab/window
   *
   * @private
   */
  const processCurrent = (): void => {
    const q = currentEditor?.getValue();
    const uriModel = currentEditor?.getModel()?.uri.toString();
    if (q && uriModel && editorHelper.getLanguage()) {
      processSQL(uriModel, q).catch();
    } else {
      // console.info('Can`t processCurrent, not set q or uri', q, uriModel);
    }
  };

  /**
   * Call editorHelper->LanguageWorker.parseAndApplyModel()
   *
   * @param modelUri
   * @param value
   */
  async function processSQL(modelUri: string, value: string) {
    if (!processSql) return;
    if (editorHelper.isReady()) {
      const position = currentEditor?.getPosition();
      let offset: number = -1;
      if (position) {
        const d = currentEditor?.getModel()?.getOffsetAt(position);
        if (d !== undefined) offset = d;
      }
      await editorHelper.OnChange(modelUri, value, offset);
    } else {
      console.info('In processSQL, error on languageValueOnChange, editorHelper.isReady = false');
    }
  }


  const onChange = (value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => {
    //console.log('monaeditro....onChange', value, ev);
    const uriModel = currentEditor?.getModel()?.uri.toString();
    console.log('changexxxxxxxxxxxx:', uriModel, ev, value)
    if (value !== undefined && uriModel) {
      // Update model
      onContentChange && onContentChange(value);
      // Registration delay timer 2000мс -> parse & validate
      languageValueOnChange(uriModel, value);
    }
  }

  function languageValueOnChange(modelUri: string, value: string) {
    // On user typing
    processSQL(modelUri, value).catch();
  }

  // delayLanguageValueOnChange: any = delayFunctionWrap(processSQL.bind(this));


  useEffect(() => {
  }, []);

  return (
    <Editor
      language={SupportLanguage.CLICKHOUSE}
      onMount={onEditorMount}
      onChange={onChange}
      beforeMount={onEditorBeforeMount}
      options={monacoEditorOptions}
      theme="cobalt"
      value={content}
    />
  )
}
export default SimpleEditor
