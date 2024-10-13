

const readOnly = false
const language = 'sql'
const enableSuggestions = false
const enableSuggestionPreview = false
const autoWrap = 'on'
const lineNumbers = true
const optionsBak: any = undefined

export const MonacoEditorOptions = {
  // selectOnLineNumbers: true,
  renderSideBySide: false, //  side by side
  autoIndent: 'None', //  auto indent
  fontSize: 14, //  font size
  automaticLayout: true, //  auto layout
  scrollBeyondLastLine: false, //is scroll beyond the last line
  autoDetectHighContrast: true // auto detect high contrast
};

export const finalEditorOptions = {
  ...MonacoEditorOptions, // set default options
  tabCompletion: 'on', // tab 补全
  cursorSmoothCaretAnimation: false, // 光标动画
  screenReaderAnnounceInlineSuggestion: true, // 屏幕阅读器提示
  formatOnPaste: true, // 粘贴时格式化
  mouseWheelZoom: true, // 鼠标滚轮缩放
  autoClosingBrackets: 'always', // 自动闭合括号
  autoClosingOvertype: 'always', // 用于在右引号或括号上键入的选项
  autoClosingQuotes: 'always', // 自动闭合引号
  showUnused: true, // 显示未使用的代码
  unfoldOnClickAfterEndOfLine: true, // 控制在折叠线之后单击空内容是否会展开该线
  showFoldingControls: 'always', // 代码折叠控件 'always' | 'mouseover' | 'never'
  automaticLayout: true, // 自动布局
  readOnly, // 是否只读
  glyphMargin: true, // 字形边缘
  formatOnType: true, // 代码格式化
  // columnSelection: true, // 列选择
  // @ts-ignore
  wrappingIndent: language === 'yaml' || language === 'yml' || language === 'json' ? 'indent' : 'none',
  inlineSuggest: {
    enabled: true,
    showToolbar: 'always',
    keepOnBlur: false,
    allowQuickSuggestions: true,
    showOnAllSymbols: true
  },
  // inlineSuggestionVisible: true,
  quickSuggestions: enableSuggestions,
  guides: {
    bracketPairs: true
  },
  bracketPairColorization: {
    enabled: true,
    independentColorPoolPerBracketType: true
  },
  foldingRanges: true,
  inlineCompletionsAccessibilityVerbose: true,
  smartSelect: {
    selectLeadingAndTrailingWhitespace: true,
    selectSubwords: true
  },
  suggest: {
    quickSuggestions: enableSuggestions,
    showStatusBar: true,
    preview: enableSuggestionPreview,
    previewMode: 'subword',
    showInlineDetails: true,
    showMethods: true,
    showFunctions: true,
    showConstructors: true,
    showFields: true,
    showEvents: true,
    showOperators: true,
    showClasses: true,
    showModules: true,
    showStructs: true,
    showInterfaces: true,
    showProperties: true,
    showUnits: true,
    showValues: true,
    showConstants: true,
    showEnums: true,
    showEnumMembers: true,
    showKeywords: true,
    showWords: true,
    showFolders: true,
    showReferences: true,
    showSnippets: true
  },
  scrollbar: {
    useShadows: false,
    vertical: 'visible',
    horizontal: 'visible',
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
    arrowSize: 30
  },
  wordWrap: autoWrap,
  autoDetectHighContrast: true,
  lineNumbers,
  ...optionsBak
};
