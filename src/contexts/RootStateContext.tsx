import React from 'react';
import {IngredientsStore} from '../stores/IngredientsStore';
import {SaladsStore} from "../stores/SaladsStore";
import {SaladDetailsStore} from "../stores/SaladDetailsStore";
import {IngredientDetailsStore} from "../stores/IngredientDetailsStore";

type RootStateContextValue = {
    ingredientsStore: IngredientsStore;
    saladsStore: SaladsStore;
    saladDetailsStore: SaladDetailsStore;
    ingredientDetailsStore: IngredientDetailsStore;
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const ingredientsStore = new IngredientsStore();
const saladsStore = new SaladsStore();
const saladDetailsStore = new SaladDetailsStore();
const ingredientDetailsStore = new IngredientDetailsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return (
        <RootStateContext.Provider value={{ingredientsStore, saladsStore, saladDetailsStore, ingredientDetailsStore}}>
            {children}
        </RootStateContext.Provider>
    );
}

export const useRootStore = () => React.useContext(RootStateContext);