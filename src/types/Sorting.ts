import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";

export type SortingValuesType = { sortOrder?: typeof SORT_ORDER_DESC | typeof SORT_ORDER_ASC, sortBy: string } | null;