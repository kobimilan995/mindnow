import React from 'react';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";

export const SaladDetailsPage = observer(() => {
    const {saladDetailsStore} = useRootStore();

    const salad = saladDetailsStore.salad!;
    return (
        <div className="container d-flex justify-content-center mt-4">
            <h3>{salad.name}</h3>
        </div>
    );
})
