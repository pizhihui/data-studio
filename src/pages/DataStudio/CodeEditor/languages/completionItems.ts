import { CancellationToken, editor, languages, Position } from 'monaco-editor'

export const sqlItemProvider: languages.CompletionItemProvider = {
  provideCompletionItems(model: editor.ITextModel,
                         position: Position,
                         context: languages.CompletionContext,
                         token: CancellationToken): languages.ProviderResult<languages.CompletionList> {
    const suggestions: Array<languages.CompletionItem> = []
    // 输入的单词
    const word = model.getWordUntilPosition(position);
    // 获取位置
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn
    };

    // 加入需要提示的词语
    const list: Array<languages.CompletionItem> = [
      {
        label: "simpleText",
        kind: languages.CompletionItemKind.Text,
        insertText: "simpleText",
        range: range,
      },
      {
        label: "testing",
        kind: languages.CompletionItemKind.Keyword,
        insertText: "testing(${1:condition})",
        insertTextRules:
        languages.CompletionItemInsertTextRule
          .InsertAsSnippet,
        range: range,
      },
      {
        label: "ifelse",
        kind: languages.CompletionItemKind.Snippet,
        insertText: [
          "if (${1:condition}) {",
          "\t$0",
          "} else {",
          "\t",
          "}",
        ].join("\n"),
        insertTextRules:
        languages.CompletionItemInsertTextRule
          .InsertAsSnippet,
        documentation: "If-Else Statement",
        range: range,
      },
      {
        label: 'mkdirp',
        range: range,
        kind: languages.CompletionItemKind.Function,
        documentation: "Recursively mkdir, like <code>mkdir -p</code>",
        detail: 'Recursively mkdir',
        insertText: '"mkdirp": "*"',
      },
      {
        label: '"my-third-party-library"',
        kind: languages.CompletionItemKind.Function,
        documentation: "Describe your library here",
        insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
        insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        // label: 'ABS(numeric)',
        label: {
          label: 'ABS(numeric)',
          // detail: '返回NUMERIC的绝对值。label-detail',
          description: 'bigint|double|decimal abs(<number>)'
        },
        range: range,
        kind: languages.CompletionItemKind.Variable,
        detail: 'ABS函数支持获取输入参数（number）的绝对值，确保输出总是正数或零',
        documentation: {
          value: '<a href="https://www.alibabacloud.com/help/zh/maxcompute/user-guide/abs#reference-2249917">详细点击</a>><p id="shortdesc-tva-l0o-f3x" data-tag="shortdesc" class="shortdesc">ABS函数支持获取输入参数（number）的绝对值，确保输出总是正数或零。本文介绍ABS函数的命令格式、参数说明以及使用示例。</p><div data-tag="refbody" id="refbody-p9c-upo-dn1" class="refbody"><section data-tag="section" id="section-s6y-wll-2kl" data-type="section" class="section"><h2 data-tag="title" id="title-002-voo-s3q" class="title">命令格式</h2><pre data-tag="codeblock" id="codeblock-sby-pn0-7dg" outputclass="language-plaintext" class="pre codeblock language-plaintext"><code>bigint|double|decimal abs(&lt;number&gt;)</code></pre></section><section data-tag="section" id="section-16c-3in-e5q" data-type="section" class="section"><h2 data-tag="title" id="title-t7b-tnv-z9r" class="title">参数说明</h2><div data-tag="p" id="p-28x-ilb-vft" class="p"><p id="b460c99703uxd"><span data-tag="parmname" id="parmname-jbv-ggm-91g" class="parmname">number</span>：必填。DOUBLE、BIGINT或DECIMAL类型。输入为STRING时，会隐式转换为DOUBLE类型后参与运算。</p><div data-tag="note" id="note-r39-0f3-mrp" class="note note-note"><div class="note-icon-wrapper"><i class="icon-note note note"></i></div><div class="noteContentSpan"><strong>说明 </strong><p id="b460c99803iay">当输入BIGINT类型的值超过BIGINT的最大表示范围时，会返回DOUBLE类型，但可能会损失精度。</p></div></div></div></section><section data-tag="section" id="section-9j9-zk4-z67" data-type="section" class="section"><h2 data-tag="title" id="title-6ty-x87-ja0" class="title">返回值说明</h2><div data-tag="p" id="p-sbr-clr-j06" class="p"><p id="b460c99903t0i">返回值类型取决于输入参数的类型。返回规则如下： </p><ul data-tag="ul" id="ul-qgq-9e2-je6" class="ul"><li data-tag="li" id="li-e5e-qvr-dfh" class="li"><p id="b460c99a034t9"><span data-tag="parmname" id="parmname-ebx-j2d-4x7" class="parmname">number</span>为DOUBLE、BIGINT或DECIMAL类型时会返回相应的类型。</p></li><li data-tag="li" id="li-dit-job-kdq" class="li"><p id="b460f0a0039id"><span data-tag="parmname" id="parmname-bip-7zp-694" class="parmname">number</span>为STRING类型时，返回DOUBLE类型。</p></li><li data-tag="li" id="li-t9q-a5f-01i" class="li"><p id="b460f0a1036pu"><span data-tag="parmname" id="parmname-2nk-rsq-rdx" class="parmname">number</span>为NULL，则返回NULL。</p></li></ul></div></section><section data-tag="section" id="section-udf-math-data" data-type="section" class="section"><h2 data-tag="title" id="title-mc7-jqd-gfv" class="title">示例数据</h2><div data-tag="p" id="p-5qi-vvz-77y" class="p"><p id="b460f0a203q3v">为便于理解各函数的使用方法，本文为您提供源数据，基于源数据提供函数相关示例。创建表mf_math_fun_t，并添加数据，命令示例如下。</p><pre data-tag="codeblock" id="codeblock-wrm-wkc-aiy" outputclass="language-sql" class="pre codeblock language-sql"><code>create table if not exists mf_math_fun_t(\n' +
            '     int_data     int,\n' +
            '     bigint_data  bigint,\n' +
            '     double_data  double,\n' +
            '     decimal_data decimal,\n' +
            '     float_data   float,\n' +
            '     string_data  string\n' +
            '    );\n' +
            'insert into mf_math_fun_t values\n' +
            '(null, -10, 0.525, 0.525BD, cast(0.525 as float), \'10\'),\n' +
            '(-20, null, -0.1, -0.1BD, cast(-0.1 as float), \'-10\'),\n' +
            '(0, -1, null, 20.45BD, cast(-1 as float), \'30\'),\n' +
            '(-40, 4, 0.89, null, cast(0.89 as float), \'-30\'),\n' +
            '(5, -50, -1, -1BD, null, \'50\'),\n' +
            '(-60, 6, 1.5, 1.5BD, cast(1.5 as float), \'-50\'),\n' +
            '(-1, -70, -7.5, -7.5BD, cast(-7.5 as float),null ),\n' +
            '(-80, 1, -10.2, -10.2BD, cast(-10.2 as float), \'-1\' ),\n' +
            '(9, -90, 2.58, 2.58BD, cast(2.58 as float), \'0\'),\n' +
            '(-100, 10, -5.8, -5.8BD, cast(-5.8 as float), \'-90\');</code></pre><p id="b460f0a303ol6">查询表mf_math_fun_t中的数据，命令示例如下：</p><pre data-tag="codeblock" id="codeblock-08c-y3b-3nt" outputclass="language-plaintext" class="pre codeblock language-plaintext"><code>select * from mf_math_fun_t;\n' +
            '--返回结果。\n' +
            '+------------+-------------+-------------+--------------+------------+-------------+\n' +
            '| int_data   | bigint_data | double_data | decimal_data | float_data | string_data |\n' +
            '+------------+-------------+-------------+--------------+------------+-------------+\n' +
            '| NULL       | -10         | 0.525       | 0.525        | 0.525      | 10          |\n' +
            '| -20        | NULL        | -0.1        | -0.1         | -0.1       | -10         |\n' +
            '| 0          | -1          | NULL        | 20.45        | -1.0       | 30          |\n' +
            '| -40        | 4           | 0.89        | NULL         | 0.89       | -30         |\n' +
            '| 5          | -50         | -1.0        | -1           | NULL       | 50          |\n' +
            '| -60        | 6           | 1.5         | 1.5          | 1.5        | -50         |\n' +
            '| -1         | -70         | -7.5        | -7.5         | -7.5       | NULL        |\n' +
            '| -80        | 1           | -10.2       | -10.2        | -10.2      | -1          |\n' +
            '| 9          | -90         | 2.58        | 2.58         | 2.58       | 0           |\n' +
            '| -100       | 10          | -5.8        | -5.8         | -5.8       | -90         |\n' +
            '+------------+-------------+-------------+--------------+------------+-------------+</code></pre></div></section><section data-tag="section" id="section-za2-uo4-3h0" data-type="section" class="section"><h2 data-tag="title" id="title-0dy-4os-sfi" class="title">使用示例：静态数据</h2><pre data-tag="codeblock" id="codeblock-q6f-p2i-45n" outputclass="language-sql" class="pre codeblock language-sql"><code>--返回NULL。\n' +
            'select abs(null);\n' +
            '--返回1。\n' +
            'select abs(-1);\n' +
            '--返回1.2。\n' +
            'select abs(-1.2);\n' +
            '--返回2.0。\n' +
            'select abs("-2");\n' +
            '--返回1.2232083745629837E32。\n' +
            'select abs(122320837456298376592387456923748);\n' +
            '--取tbl1表内id字段的绝对值。下面是一个完整的ABS函数在SQL中使用的示例，其他内建函数（除窗口函数和聚合函数外）的使用方式与其类似。\n' +
            'select abs(id) from tbl1;</code></pre></section><section data-tag="section" id="section-n9w-q54-hd4" data-type="section" class="section"><h2 data-tag="title" id="title-3xv-26y-wyk" class="title">使用示例：表数据示例</h2><div data-tag="p" id="p-dk9-xsj-hfa" class="p"><p id="b460f0a403duj">基于<a title="" class="xref" href="#section-udf-math-data">示例数据</a>，计算绝对值，命令示例如下。</p><pre data-tag="codeblock" id="codeblock-q05-qt8-nk9" outputclass="language-sql" class="pre codeblock language-sql"><code>select abs(bigint_data) as bigint_new, abs(double_data) as double_new, abs(decimal_data) as decimal_new, abs(string_data) as string_new from mf_math_fun_t;</code></pre><p id="b460f0a503tz3">表数据示例返回结果如下。</p><pre data-tag="codeblock" id="codeblock-vl3-w2z-1yp" outputclass="language-plaintext" class="pre codeblock language-plaintext"><code>+------------+------------+-------------+------------+\n' +
            '| bigint_new | double_new | decimal_new | string_new |\n' +
            '+------------+------------+-------------+------------+\n' +
            '| 10         | 0.525      | 0.525       | 10.0       |\n' +
            '| NULL       | 0.1        | 0.1         | 10.0       |\n' +
            '| 1          | NULL       | 20.45       | 30.0       |\n' +
            '| 4          | 0.89       | NULL        | 30.0       |\n' +
            '| 50         | 1.0        | 1           | 50.0       |\n' +
            '| 6          | 1.5        | 1.5         | 50.0       |\n' +
            '| 70         | 7.5        | 7.5         | NULL       |\n' +
            '| 1          | 10.2       | 10.2        | 1.0        |\n' +
            '| 90         | 2.58       | 2.58        | 0.0        |\n' +
            '| 10         | 5.8        | 5.8         | 90.0       |\n' +
            '+------------+------------+-------------+------------+</code></pre></div></section><section id="c0143d8003ko2" class="section"><h2 id="c39044e103v1t"><b>相关函数</b></h2><p id="c750f66003xub">ABS函数属于数学函数，<span data-tag="ph" id="cbbd94e004zy2" class="ph">更多数据计算、数据转换的相关函数请参见<a title="" class="xref" href="/help/zh/maxcompute/user-guide/mathematical-functions">数学函数</a>。</span></p></section></div>',
          supportThemeIcons: true,
          supportHtml: true,
          isTrusted: true,
          uris: {
            'abc': {
              scheme: '',
              path: '',
              authority: '',
              query: '',
              fragment: ''
            }
          }
        },
        insertText: 'ABS(${1:})',
        insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    ]

    suggestions.push(...list)

    return {
      suggestions
    }
  }
}
