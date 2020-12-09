import React from 'react';
import {IngredientsStore} from '../stores/IngredientsStore';
import {SaladsStore} from "../stores/SaladsStore";

type RootStateContextValue = {
    ingredientsStore: IngredientsStore,
    saladsStore: SaladsStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const ingredientsStore = new IngredientsStore();
const saladsStore = new SaladsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return (
        <RootStateContext.Provider value={{ingredientsStore, saladsStore}}>
            {children}
        </RootStateContext.Provider>
    );
}

export const useRootStore = () => React.useContext(RootStateContext);