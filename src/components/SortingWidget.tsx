import React from 'react';
import {useHistory} from 'react-router-dom';
import queryString from 'query-string';
import {
    SORT_ORDER_ASC,
    SORT_ORDER_DESC,
    SORTING_WIDGET_CALORIES_ASC,
    SORTING_WIDGET_CALORIES_DESC
} from "../constants/sorting";

interface Props {
    sortBy?: string;
    order?: string;
    tags?: string;
    baseRoute: string;
}

export const SortingWidget = ({sortBy, order, tags, baseRoute}: Props) => {
    const history = useHistory();
    let defaultValue = '';

    if (sortBy === 'caloriesCount' && (!order || order === SORT_ORDER_ASC)) {
        defaultValue = SORTING_WIDGET_CALORIES_ASC;
    }

    if (sortBy === 'caloriesCount' && order === SORT_ORDER_DESC) {
        defaultValue = SORTING_WIDGET_CALORIES_DESC;
    }

    return (
        <div className="form mb-4 mt-4 w-50 d-flex">
            <h5 className="mb-0 align-self-center label label-default">Sort:</h5>
            <select className="form-control form-control-sm ml-4" value={defaultValue} onChange={(event) => {
                switch (event.target.value) {
                    case SORTING_WIDGET_CALORIES_ASC:
                        history.push(`${baseRoute}?${queryString.stringify({
                            sortBy: 'caloriesCount',
                            order: SORT_ORDER_ASC,
                            tags,
                        })}`);
                        break;
                    case SORTING_WIDGET_CALORIES_DESC:
                        history.push(`${baseRoute}?${queryString.stringify({
                            sortBy: 'caloriesCount',
                            order: SORT_ORDER_DESC,
                            tags,
                        })}`)
                        break;
                    default:
                }
            }}>
                <option value="" disabled>Select your option</option>
                <option value={SORTING_WIDGET_CALORIES_ASC}>By calories count (Low to High)
                </option>
                <option value={SORTING_WIDGET_CALORIES_DESC}>By calories count (High to Low)
                </option>
            </select>
        </div>
    );
}