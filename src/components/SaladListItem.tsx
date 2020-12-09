import React from 'react';
import {useHistory} from 'react-router-dom';
import {Salad} from "../types/Salad";
import {SALAD_DETAILS_ROUTE} from "../constants/routes";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";

type Props = {
    salad: Salad;
    onTagSelect(tag: string): void;
}

export const SaladListItem = observer(({salad, onTagSelect}: Props) => {
    const {saladDetailsStore} = useRootStore();

    const history = useHistory();

    const onSaladListItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        saladDetailsStore.setSalad(salad);
        history.push(SALAD_DETAILS_ROUTE(salad.id));
    }
    return (
        <div className="list-group-item">
            <span className="mr-4">{salad.name}</span>
            {salad.tags.length > 0 && (
                <span>
                    {salad.tags.map(tag => {
                        return (
                            <button key={tag} className="badge badge-secondary mr-1" onClick={(e) => {
                                e.preventDefault();
                                onTagSelect(tag);
                            }}>
                                {tag}
                            </button>
                        );
                    })}
                </span>
            )}
            <button className="btn btn-primary btn-sm float-right" onClick={onSaladListItemClick}>Show more</button>
        </div>
    );
})