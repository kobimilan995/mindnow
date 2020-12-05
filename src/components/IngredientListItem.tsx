import React from "react";
import {Ingredient} from "../types/Ingredient";

type Props = {
    ingredient: Ingredient;
}

export const IngredientListItem = ({ingredient}: Props) => {
    return (
        <div className="col-xs-12 col-md-4 col-sm-2 gray border-warning">
            <img className="card-img-top" src={ingredient.image} alt="''"/>
                <div className="card-body">
                    <h5 className="card-title">{ingredient.name}</h5>
                    <p className="card-text">{ingredient.caloriesCount} calories</p>
                    {ingredient.tags.length > 0 && (
                        <div className="card-footer mb-2">
                            <h4>Tags</h4>
                            {ingredient.tags.map(tag => {
                                return <span key={tag} className="badge badge-secondary mr-1">{tag}</span>;
                            })}
                        </div>
                    )}
                    <a href="/#" className="btn btn-primary">View details</a>
                </div>
        </div>
);
}