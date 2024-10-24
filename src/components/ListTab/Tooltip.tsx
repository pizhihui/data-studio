import React from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.css';  // 可以为 Tooltip 添加样式

type PropsType = {
  content: string
  position: { left: number, top: number }
}

const Tooltip: React.FC<PropsType> = ({ content, position }) => {
  return ReactDOM.createPortal(
    <div className="list-tabs-tooltip" style={{ left: position.left, top: position.top }}>
      {content}
    </div>,
    document.body
  );
};

export default Tooltip;
