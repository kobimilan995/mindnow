import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Navbar} from "./components";
import {
    EditIngredientPage,
    HomePage,
    IngredientDetailsPage,
    IngredientsPage,
    NewIngredientPage,
    SaladDetailsPage,
    SaladsPage
} from "./pages";
import {
    EDIT_INGREDIENT_PAGE,
    HOME_PAGE_ROUTE, INGREDIENT_DETAILS_ROUTE,
    INGREDIENTS_PAGE_ROUTE,
    NEW_INGREDIENT_PAGE_ROUTE, SALAD_DETAILS_ROUTE,
    SALADS_PAGE_ROUTE
} from "./constants/routes";
import {Container} from "@material-ui/core";

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
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
                    <Route path={INGREDIENT_DETAILS_ROUTE(':id')} exact>
                        <IngredientDetailsPage/>
                    </Route>
                    <Route path={EDIT_INGREDIENT_PAGE(':id')} exact>
                        <EditIngredientPage/>
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;
