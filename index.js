/**
 * @format
 */
import React from 'react';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

//redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

//amplify
import awsmobile from "./aws-exports";
import Amplify from 'aws-amplify';
Amplify.configure(awsmobile);

//App
class ReduxApp extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
AppRegistry.registerComponent(appName, () => ReduxApp);
