import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import queryString from "query-string";
import {useLocation} from "react-router-dom";

export const useQuery = ():{
    order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
    sortBy?: string,
    tags?: string
}  => {
    return queryString.parse(useLocation().search);
}
