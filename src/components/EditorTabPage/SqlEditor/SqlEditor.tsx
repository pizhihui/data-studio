import React, {forwardRef, useRef} from "react";
import {Flex, FlexProps} from 'reflexy';
import classNames from 'classnames';
import css from './SqlEditor.css';
import Toolbar, {ActionType, ToolbarProps} from './Toolbar';
import Toolbar2 from './Toolbar2';
import {Databases} from "@/services";
import SimpleEditor, {SimpleEditorProps} from "./SimpleEditor";
import {Query} from "@/services/types/query";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

// ------------------------------------------------------------------------------------
export interface SqlEditorProps
  extends Omit<ToolbarProps, 'databases'>,
    SimpleEditorProps,
    FlexProps {
  currentDatabase: string;
}

// ------------------------------------------------------------------------------------


const SqlEditor: React.FC<SqlEditorProps> = (props) => {

  const {
    content,
    onContentChange,
    serverStructure,
    onAction
  } = props

  const className: string = ''

  const currentDatabase = 'db1'

  /**
   * Выполнение запросов, если получена command
   *
   * @param queryList
   * @param isExecAll
   */
  const execQueries = (queryList: Array<Query>, isExecAll: boolean): void => {
    if (!queryList.length) {
      console.warn('Empty queryList, can`t exec...');
      return;
    }
    queryList.forEach((query: Query) => {
      console.info(`%c%s`, 'padding: 1rem;color: #bada55;font: 130% Tahoma;', query.sql);
    });
    // ------
    // Call parent onAction
    onAction(isExecAll ? ActionType.RunAll : ActionType.RunCurrent, queryList);
  };

  const onDatabaseChange = (db: Databases.Database) => {
    console.log('onDatabaseChange', db);
  };

  const onEditorMount = () => {
    // Bind key here
    // this.ref?.helper().bindKeys();
    // console.warn('onEditorMount - onEditorMount');
  };

  const handleOnAction = (action: ActionType, eventData?: any): void => {
    console.log('toolbar action xxxx', action, eventData)
  }

  const editorRef = useRef<any>();

  return (
    <Flex column fill className={classNames(css.root, className)}>
      {/*<Toolbar
        className={css.toolbar}
        databases={[]}
        currentDatabase={currentDatabase}
        onDatabaseChange={onDatabaseChange}
        onAction={handleOnAction}
        // stats={stats}
      />*/}
      <Toolbar2
        className={css.toolbar}
      />
      <Flex grow fill className={css.editor}>

        <SimpleEditor
          // ref={editorRef}
          content={content}
          readonly={false}
          processSql={true}
          onContentChange={onContentChange}
          serverStructure={serverStructure}
          onMount={onEditorMount}
          onExecCommand={execQueries}
        />
      </Flex>
    </Flex>
  )
}

export default SqlEditor
