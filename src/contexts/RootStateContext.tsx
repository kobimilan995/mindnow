import React from 'react';
import {IngredientsStore} from '../stores/IngredientsStore';

type RootStateContextValue = {
    ingredientsStore: IngredientsStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const ingredientsStore = new IngredientsStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return (
        <RootStateContext.Provider value={{ingredientsStore}}>
            {children}
        </RootStateContext.Provider>
    );
}

export const useRootStore = () => React.useContext(RootStateContext);