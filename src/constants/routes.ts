export const INGREDIENTS_PAGE_ROUTE = '/ingredients';
export const HOME_PAGE_ROUTE = '/';
export const NEW_INGREDIENT_PAGE_ROUTE = '/ingredients/new';
export const SALADS_PAGE_ROUTE = '/salads';
export const SALAD_DETAILS_ROUTE = (saladId: string) => `/salad/${saladId}`;
export const INGREDIENT_DETAILS_ROUTE = (ingredientId: string) => `/ingredient/${ingredientId}`;
export const EDIT_INGREDIENT_PAGE = (ingredientId: string) => `/ingredient/${ingredientId}/edit`;
export const NEW_SALAD_PAGE = `/salad/new`;