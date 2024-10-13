// src/components/Tab.tsx
import React from 'react';
import './ListTabs.css'

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  onClose: (id: string, e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void; // 接收 onMouseEnter
  onMouseLeave: () => void; // 接收 onMouseLeave
}

const Tab: React.FC<TabProps> = (props) => {
  const {
    id, label, isActive,
    onClick, onClose, onMouseEnter,
    onMouseLeave
  } = props
  return (
    <div
      className={`tab-item ${isActive ? 'active' : ''}`}
      onClick={() => onClick(id)}
      onMouseEnter={onMouseEnter} // 绑定 onMouseEnter
      onMouseLeave={onMouseLeave} // 绑定 onMouseLeave
    >
      <span className="tab-label">{label}</span>
      <span className="tab-close" onClick={(e) => onClose(id, e)}>
        &times;
      </span>
    </div>
  );
};

export default Tab;
