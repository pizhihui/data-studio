import React from 'react';
import ReactDOM from 'react-dom';
import {action, decorate, observable} from 'mobx';
import {observer} from "mobx-react";
import CssModulesDemo from './src/module/CssModulesDemo';

interface HelloProps {
    name: string;
    store: Store;
}

interface HelloState {

}


class Store {
    @observable counter = 0
    // @ts-ignore
    @action.bound
    clickButton = () => {
        console.log('点击了')
        this.counter++
    }
}

@observer
class HelloMessage extends React.Component<HelloProps, HelloState> {

    render() {
        const { name, store } = this.props;
        return (
            <div>
                Hello {name}
                <br />
                counter: {store.counter}
                <br />
                <button onClick={ store.clickButton }>点击我</button>
            </div>
        );
    }
}


ReactDOM.render(
    // <HelloMessage name="Taylor" store = { new Store() }/>,
    // <HelloMessage name = "Taylor" store = { new Store() }/>,
  <CssModulesDemo />,
    document.getElementById('root')
);
