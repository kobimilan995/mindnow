import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Navbar} from "./components";
import {HomePage, IngredientsPage, NewIngredientPage} from "./pages";
import {HOME_PAGE_ROUTE, INGREDIENTS_PAGE_ROUTE, NEW_INGREDIENT_PAGE} from "./constants/routes";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar/>
                <Switch>
                    <Route path={HOME_PAGE_ROUTE} exact>
                        <HomePage/>
                    </Route>
                    <Route path={`${INGREDIENTS_PAGE_ROUTE}`} exact>
                        <IngredientsPage/>
                    </Route>
                    <Route path={`${NEW_INGREDIENT_PAGE}`} exact>
                        <NewIngredientPage/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
