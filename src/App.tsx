import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Navbar} from "./components";
import {HomePage, IngredientsPage} from "./pages";
import {HOME_PAGE_ROUTE, INGREDIENTS_PAGE_ROUTE} from "./constants/routes";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar/>
                <Switch>
                    <Route path={HOME_PAGE_ROUTE} exact>
                        <HomePage/>
                    </Route>
                    <Route path={INGREDIENTS_PAGE_ROUTE}>
                        <IngredientsPage/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
