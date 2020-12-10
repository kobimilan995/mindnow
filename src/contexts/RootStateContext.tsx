import React from 'react';
import {IngredientsStore} from '../stores/IngredientsStore';
import {SaladsStore} from "../stores/SaladsStore";
import {SaladDetailsStore} from "../stores/SaladDetailsStore";
import {IngredientDetailsStore} from "../stores/IngredientDetailsStore";
import {CreateSaladStore} from "../stores/CreateSaladStore";

type RootStateContextValue = {
    ingredientsStore: IngredientsStore;
    saladsStore: SaladsStore;
    saladDetailsStore: SaladDetailsStore;
    ingredientDetailsStore: IngredientDetailsStore;
    createSaladStore: CreateSaladStore;
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const ingredientsStore = new IngredientsStore();
const saladsStore = new SaladsStore();
const saladDetailsStore = new SaladDetailsStore();
const ingredientDetailsStore = new IngredientDetailsStore();
const createSaladStore = new CreateSaladStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return (
        <RootStateContext.Provider value={{ingredientsStore, saladsStore, saladDetailsStore, ingredientDetailsStore, createSaladStore}}>
            {children}
        </RootStateContext.Provider>
    );
}

export const useRootStore = () => React.useContext(RootStateContext);