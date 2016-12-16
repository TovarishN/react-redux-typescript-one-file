import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';
import Logger from './common/Logger';
//import thunk from 'redux-thunk';

interface OwnProps {
    name: string
}

interface ConnectedState {
    cname: string;
}

interface ConnectedDispatch {
    changeName: (n: string) => void
}

interface OwnState {
    //name: string;
}

class HelloWorld extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {
    constructor() {
        super();
    }

    change = (e: any) => {
        this.props.changeName(e.target.value);
    }
    render() {
        return (
            <div>
                <div> Hello dima</div>
                <p>Hello {this.props.cname} sasasdadsasd</p>
                <input placeholder="input your name" value={this.props.cname} onChange={this.change} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
    changeName: (n: string) => dispatch(changeName(n))
});

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    cname: (state && state.cn ? state.cn.value : '')
});

export const Hello: React.ComponentClass<OwnProps> = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HelloWorld)

export type ChangeNameAction = { type: 'CHANGE_NAME', name: string }

export const changeName = (name: string): ChangeNameAction => ({
    type: 'CHANGE_NAME',
    name
})

export namespace Store {
    export type ChangeName = { value: string }
    export type All = {
        cn: ChangeName,
    }
}

const initialState: Store.ChangeName = { value: '' }

function changeNameReducer(state: Store.ChangeName = initialState, action: ChangeNameAction): Store.ChangeName {
    switch (action.type) {
        case 'CHANGE_NAME': return { value : action.name };
        default: return state;
    }
}

export const reducers = Redux.combineReducers<Store.All>({
    cn: changeNameReducer
})

export const apiMiddleware = ({dispatch}: Redux.MiddlewareAPI<Store.ChangeName>) =>
    (next: Redux.Dispatch<Store.ChangeName>) =>
        (action: ChangeNameAction) => {
            switch (action.type) {
                case 'CHANGE_NAME':
                    //dispatch(changeName(action.name));
                    break;
            }

            return next(action);
        }

const middleware = Redux.applyMiddleware(apiMiddleware, Logger);
let store: Redux.Store<Store.All> = Redux.createStore(reducers, {} as Store.All, middleware)

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Hello name="aaa" />
    </ReactRedux.Provider>,
    document.getElementById('content')
);
