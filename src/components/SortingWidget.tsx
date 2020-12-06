import React from 'react';
import {SORTING_WIDGET_CALORIES_ASC, SORTING_WIDGET_CALORIES_DESC} from "../constants/sorting";

type Props = {
    onSortingOptionChange(data: React.ChangeEvent<HTMLSelectElement>): void;
}

export const SortingWidget = ({onSortingOptionChange}: Props) => {
    return (
        <div className="form mb-4 mt-4 w-50 d-flex">
            <h5 className="mb-0 align-self-center label label-default">Sort:</h5>
            <select className="form-control form-control-sm ml-4" defaultValue="" onChange={onSortingOptionChange}>
                <option value="" disabled>Select your option</option>
                <option value={SORTING_WIDGET_CALORIES_ASC}>By calories count (Low to High)</option>
                <option value={SORTING_WIDGET_CALORIES_DESC}>By calories count (High to Low)</option>
            </select>
        </div>
    );
}