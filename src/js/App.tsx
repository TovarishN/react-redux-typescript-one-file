import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { Router } from 'react-router';
import * as Immutable from 'immutable';
import * as ReduxActions from 'redux-actions';
import 'isomorphic-fetch';

import gql from 'graphql-tag';

import './common/Logger';

const GraphqlUrl = 'http://localhost:4000/graphql';

interface OwnProps {
    query: () => void;
}

interface HelloWorldProps {
    name: string;
    data?: any;
}

interface HelloWorldState {
    name1: string;
    data: string[];
}

class HelloWorld extends React.Component<HelloWorldProps & OwnProps, HelloWorldState> {
    constructor(props) {
        super(props);
        this.state = {
            name1: this.props.name
            , data: []
        }
    }

    componentDidMount(props) {
        this.props.query();
    }
    //{this.props.data.map((item, key) => <div key={key}>hello {item.id}</div>)}
    render() {
        return (
            <div>
                <div> Hello dima {this.state.name1}</div>

            </div>
        );
    }
}

const mapStateToProps = (state, own): HelloWorldProps => {
    return {
        name: "aaa"
        , data: []
    }
};

const mapDispatchToProps = (dispatch) => ({
    query: () => { fetchQuery(dispatch); }
});

const HwComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(HelloWorld);

type ActionType = SendRequest | RecieveRequest | ErrorRequest;
interface SendRequest { type: 'SEND_REQUEST'; query: string }
interface RecieveRequest { type: 'RECIEVE_REQUEST'; response: string }
interface ErrorRequest { type: 'ERROR_REQUEST', error: string }

const helloWorldReducer = (state = { query: '', result: '', error: '' }, action: ActionType) => {
    switch (action.type) {
        case 'SEND_REQUEST': return { ...state, query: action.query };
        case 'RECIEVE_REQUEST': return { ...state, result: action.response };
        case 'ERROR_REQUEST': return { ...state, error: action.error };
        default: return state;
    }
}

const MyQuery = `query market {
  GetMarkets {
    id
  }
}`;

const makeQuery = (query: string): Promise<IResponse> => {
    return fetch(GraphqlUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operationName: 'market', query: query, variables: null })
    })
}

const fetchQuery = async dispatch => {
    dispatch({ type: 'SEND_REQUEST', query: MyQuery });
    try {
        let res = await makeQuery(MyQuery);
        let js = await res.json();
        dispatch({ type: 'RECIEVE_REQUEST', response: js });
    }
    catch (e) {
        dispatch({ type: 'ERROR_REQUEST', error: e.message });
    }
};



const store = Redux.createStore(Redux.combineReducers(
    {
        'hw': helloWorldReducer
    }),
    Redux.applyMiddleware()
);


ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <HwComponent name="props name" />
    </ReactRedux.Provider>,
    document.getElementById('content')
);
