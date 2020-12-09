import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useRootStore} from "../contexts/RootStateContext";
import {useQuery} from "../hooks";
import {SortingWidget, SaladList, LoadingSpinner} from "../components";
import {SALADS_PAGE_ROUTE} from "../constants/routes";

export const SaladsPage = observer(() => {
    const {saladsStore} = useRootStore();

    const {filteredSalads, setSearchQuery, searchQuery} = saladsStore;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const query = useQuery();
    useEffect(() => {
        setIsLoading(true);
        const {order, sortBy, tags} = query;
        saladsStore.getSalads({order, sortBy, tags})
            .then(() => {
                setIsLoading(false);
            })
    }, [query.tags, query.order, query.sortBy]);

    // const onSearchQueryChange = useMemo(() => debounce((name: string) => {
    //     setIsLoading(true);
    //     const {order, sortBy, tags} = query;
    //     saladsStore.getSalads({order, sortBy, tags, name})
    //         .then(() => {
    //             setIsLoading(false);
    //         });
    // }, 500), [query.tags, query.order, query.sortBy]);
    const {order, sortBy, tags} = query;
    const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div>
            <div className="d-flex row align-items-center justify-content-between">
                <SortingWidget baseRoute={SALADS_PAGE_ROUTE} order={order} sortBy={sortBy} tags={tags}/>
                {/*<Link to={NEW_INGREDIENT_PAGE_ROUTE} className="btn btn-primary mt-4 mb-4">New Ingredient</Link>*/}
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Search query</span>
                    </div>
                    <input
                        value={searchQuery}
                        onChange={onSearchQueryChange}
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </div>

            </div>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <SaladList salads={filteredSalads} order={order} sortBy={sortBy}/>
            )}

        </div>
    );
})