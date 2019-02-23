import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, compose, applyMiddleware } from "redux";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Base from "./components/Base";
import Home from "./components/Home";
import Ingredients from "./components/Ingredients";
import Recipes from "./components/Recipes";
import Locations from "./components/Locations";
import reducerHome from "./reducers/reducerHome";

const store = createStore(reducerHome,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Base>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/ingredients" component={Ingredients} />
                    <Route path="/recipes" component={Recipes} />
                    <Route path="/locations" component={Locations} />
                </Switch>
            </Base>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));