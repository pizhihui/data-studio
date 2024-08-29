import React from 'react';
import Splitter from '@/components/Splitter';


const Welcome: React.FC = () => {
  return (
    <div>
      <Splitter primary="second"
                minSize={100}
                maxSize={-100}
                defaultSize="calc(100vw - 225px)"
                // size={uiStore.primaryPaneSize}
                // onDragFinished={uiStore.updatePrimaryPaneSize}
      >
        <div className="div1">hello1</div>
        <div className="div2">hello2</div>
      </Splitter>
    </div>
  )
}

export default Welcome
