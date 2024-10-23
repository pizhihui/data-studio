import React, { useState } from 'react'
import './VerticalTabs.css'

interface Tab {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface VerticalTabsProps {
  tabs: Tab[];
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className='vertical-tabs-wrapper'>
      <div className="vertical-tabs">
        <div className="vertical-tabs-sidebar">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`tab-item ${tab.key === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
              {/*<span className="tab-label">{tab.label}</span>*/}
            </div>
          ))}
        </div>
        <div className="vertical-tabs-content">
          {tabs.map((tab) =>
            tab.key === activeTab ? (
              <div key={tab.key} className="tab-content">
                {tab.content}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>

  )
}

export default VerticalTabs;
