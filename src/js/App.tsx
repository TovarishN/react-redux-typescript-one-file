import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';
import Logger from './common/Logger';

import { graphql, ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';


interface OwnProps extends React.HTMLProps<HelloWorld> {
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

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' })


});

const MyQuery = gql`query market {
  GetMarkets {
    id
  }
}`;

client.query({ query: MyQuery }).then(data => {
    console.log(data);
}).catch((e: Error) => {
    console.log(e.message);
});

const store = Redux.createStore(
    Redux.combineReducers({ apollo: client.reducer }),
    {}, // initial state
    Redux.compose(
        Redux.applyMiddleware(client.middleware())
        // If you are using the devToolsExtension, you can add it here also
        // window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
);

const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") { id } }`;

const MyComponentWithData = graphql(MyQuery)(MyComponent);

const Co = graphql(MyQuery, data => {
    console.log(JSON.stringify(data));
})(MyComponent);



ReactDOM.render(
    // <ReactRedux.Provider store={store}>
    //     <Co />
    // </ReactRedux.Provider>,

    <ApolloProvider client={client} store={store}>
    </ApolloProvider>,
    document.getElementById('content')
);
