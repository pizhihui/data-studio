import React from 'react';

import './index.css'
import {ActionType, Tabs, TabsTabPane} from '@/components/Tabs';
import {Dropdown} from 'antd';
import {Tab, TabModel, TabType} from '@/models';
import {Flex} from "reflexy";
import EditorTabPage from "@/components/EditorTabPage";


const tabs: Array<TabModel<Tab>> = [
  {
    id: '0001',
    title: 'test01',
    type: TabType.Editor
  }
]


const MiddleContainer: React.FC = () => {

  const onMenuAction = (action: ActionType) => {
    console.log('action.....', action);
  };

  return (
    <Tabs
      // activeKey={tabsStore.activeTab.map((_) => _.id).orUndefined()}
      // onEdit={this.onEditTabs}
      // onChange={tabsStore.setActiveTab}
      onMenuAction={onMenuAction}
    >
      { tabs.map((t) => (
        <TabsTabPane
          style={{ overflowY: 'scroll' }}
          key={t.id}
          closable
          /*tab={
            <Dropdown overlay={tabRightMenu(t.id)} trigger={['contextMenu']}>
                      <span>
                        {this.getTabIcon(t)}
                        {t.title}
                      </span>
            </Dropdown>
          }*/
        >
          <Flex fill={true} column hfill style={{ minHeight: '96vh', maxHeight: '96vh' }}>
              <EditorTabPage
                // store={tabsStore}
                // serverStructure={treeStore.serverStructure.orUndefined()}
                // model={t}
                // onModelFieldChange={t.changeField}
                // width={uiStore.primaryPaneSize}
              />
          </Flex>
        </TabsTabPane>
      ))}
    </Tabs>
  )
}

export default MiddleContainer

