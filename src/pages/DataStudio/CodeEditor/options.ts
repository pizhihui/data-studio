import * as monaco from 'monaco-editor'


export const defaultEditorOptions: monaco.editor.IEditorConstructionOptions = {
  minimap: { enabled: true, maxColumn: 60 },  // minimap
  fontFamily: 'JetBrains Mono, Menlo, Monaco, \'Courier New\', monospace'
}

export const editorOptions: monaco.editor.IEditorConstructionOptions = {
  ...defaultEditorOptions,
  fontSize: 12,             // 字体大小
  lineNumbersMinChars: 3,   // 行号大小,Defaults to 5

  glyphMargin: true,  // glyph true, start button
  scrollBeyondLastLine: false,  // 滚动到行的位置
}


