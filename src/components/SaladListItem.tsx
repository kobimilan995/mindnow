import React from 'react';
import {Salad} from "../types/Salad";

type Props = {
    salad: Salad;
    onTagSelect(tag: string): void;
}

export const SaladListItem = ({salad, onTagSelect}: Props) => {
    return (
        <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{salad.name}</h5>
                <small>{salad.caloriesCount} calories</small>
            </div>
            {salad.tags.length > 0 && (
                <div className="card-footer mb-2">
                    <h6>Tags</h6>
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
                </div>
            )}
        </a>
    );
}