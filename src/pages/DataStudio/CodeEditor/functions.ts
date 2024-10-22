import { editor, KeyCode, languages, Selection } from 'monaco-editor'


type ResReturnType = {
  startLineNumber: number
  endLineNumber: number
  content: string
}

export function getSurroundingContent(editor: editor.IStandaloneCodeEditor): ResReturnType | null {
  const model = editor.getModel();
  const position = editor.getPosition();

  if (!model || !position) {
    return null;
  }
  // 当前行
  const currentLineNumber = position.lineNumber;
  // 所有行
  const totalLines = model.getLineCount();

  let startLineNumber = currentLineNumber;
  let endLineNumber = currentLineNumber;

  const lineContent = model.getLineContent(currentLineNumber).trim()

  // 向上查找，直到找到第一个以分号结尾的行
  let flag = false
  let upNum = currentLineNumber
  for (let i = currentLineNumber - 1; i > 0; i--) {
    const lineContent = model.getLineContent(i).trim();
    if (lineContent.endsWith(";")) {
      // 找到了,那就是往下的第一行有内容的
      flag = true
      upNum = i + 1
      break
    } else {
      // 没有找到,那么就是第一行有内容的
      flag = false
    }
  }

  if (!flag) {
    // 没有找到分号,那么就是第一行有内容的
    for (let i = currentLineNumber - 1; i > 0; i--) {
      const lineContent = model.getLineContent(i).trim()
      if (lineContent.length <= 0) {
        startLineNumber = i + 1
        break
      }
      if (i === 1) {
        startLineNumber = 1
      }
    }
  } else {
    // 找到了,那就是往下的第一行有内容的
    for (let i = upNum; i <= currentLineNumber; i++) {
      const lineContent = model.getLineContent(i).trim()
      if (lineContent.length > 0 && !lineContent.startsWith("--")) {
        startLineNumber = i
        break
      }
    }
  }


  // 向下查找，直到找到第二个以分号结尾的行
  for (let i = currentLineNumber; i <= totalLines; i++) {
    const lineContent = model.getLineContent(i).trim();
    if (lineContent.length > 0) { // 确保行不为空
      if (lineContent.endsWith(";")) {
        endLineNumber = i; // 找到结束行
        break;
      }
    }
  }

  // 去掉内容末尾多余的换行符
  let content = "";
// 遍历 startNum 到 endNum 之间的所有行
  for (let i = startLineNumber; i <= endLineNumber; i++) {
    const lineContent = model.getLineContent(i).trim(); // 获取每行内容并去掉首尾空格
    content += lineContent + "\n"; // 拼接内容
  }

  content = content.trimEnd()

  if (content.length <= 0) {
    startLineNumber = 0
    endLineNumber = 0
  }

  return {
    startLineNumber,
    endLineNumber,
    content
  }
}
