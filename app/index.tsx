import { createRoot } from 'react-dom/client'
import App from "./App"


// document.body.innerHTML = '<div id="app"></div>'

// react18 之后的写法
const root = createRoot(document.getElementById('app'))
root.render(<App/>)


