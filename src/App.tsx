import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Navbar} from "./components";
import {HomePage, IngredientsPage, NewIngredientPage, SaladDetailsPage, SaladsPage} from "./pages";
import {
    HOME_PAGE_ROUTE,
    INGREDIENTS_PAGE_ROUTE,
    NEW_INGREDIENT_PAGE_ROUTE, SALAD_DETAILS_ROUTE,
    SALADS_PAGE_ROUTE
} from "./constants/routes";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar/>
                <Switch>
                    <Route path={HOME_PAGE_ROUTE} exact>
                        <HomePage/>
                    </Route>
                    <Route path={INGREDIENTS_PAGE_ROUTE} exact>
                        <IngredientsPage/>
                    </Route>
                    <Route path={NEW_INGREDIENT_PAGE_ROUTE} exact>
                        <NewIngredientPage/>
                    </Route>
                    <Route path={SALADS_PAGE_ROUTE} exact>
                        <SaladsPage/>
                    </Route>
                    <Route path={SALAD_DETAILS_ROUTE(':id')} exact>
                        <SaladDetailsPage/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
