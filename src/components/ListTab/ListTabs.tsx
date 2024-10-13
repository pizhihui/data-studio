import React, {ReactNode, useState} from 'react';
import { Allotment } from 'allotment';
import Tab from './ListTab.tsx';

import Tooltip from '@/components/ListTab/Tooltip.tsx'
import {TabType} from '@/components/ListTab/interface.ts'

import 'allotment/dist/style.css';
import './ListTabs.css';

type ListTabsPropsType = {
  items: TabType[],
  activeTab: string
  onTabClick: (id: string) => void;
  onTabClose: (id: string, e: React.MouseEvent<HTMLSpanElement>) => void;
}

const ListTabs: React.FC<ListTabsPropsType> = (props) => {

  const {
    items,
    activeTab,
    onTabClick,
    onTabClose
  } = props

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number }>({left: 0, top: 0});

  // mouse enter
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, tabId: string) => {
    const {left, top, height} = e.currentTarget.getBoundingClientRect();
    const headerWidth = document.querySelector('.tabs-header')!.getBoundingClientRect().width;
    setTooltipPosition({
      left: left + headerWidth + 10,
      top: top + window.scrollY + height / 2
    });
    setHoveredTab(tabId);
  };

  return (
    <div className="tabs-container">
      <Allotment>
        <Allotment.Pane minSize={90} maxSize={200}>
          <div className="tabs-header">
            {/* 增加新 tab 的按钮 */}
            {items && items.map((tab) => (
              <Tab
                key={tab.id}
                id={tab.id}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={onTabClick}
                onClose={onTabClose}
                onMouseEnter={(e) => handleMouseEnter(e, tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
              />
            ))}
            {hoveredTab && (
              <Tooltip content={items.find(tab => tab.id === hoveredTab)?.label || ''} position={tooltipPosition}/>
            )}
          </div>
        </Allotment.Pane>

        {
          (items && items.length > 0) && <Allotment.Pane>
            <div className="tabs-content">
              {items.map((tab) =>
                  activeTab === tab.id ? (
                    <div key={tab.id} className="tab-content">
                      {tab.children}
                    </div>
                  ) : null
                // activeTab === tab.id ? (
                //   <tab.contentComponent key={tab.id} content={tab.label} /> // 渲染对应内容组件
                // ) : null
              )}
            </div>
          </Allotment.Pane>
        }
      </Allotment>
    </div>
  );
};

export default ListTabs;
