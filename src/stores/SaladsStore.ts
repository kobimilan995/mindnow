import {makeObservable, observable, action, computed} from 'mobx';
import {Salad} from "../types/Salad";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import * as saladsApi from "../api/salads";

export class SaladsStore {
    constructor() {
        makeObservable(this)
    }

    @observable salads: Salad[] = [];
    @observable searchQuery: string = '';

    @action
    setSalads = (salads: Salad[]) => {
        this.salads = salads;
    }

    @action
    setSearchQuery = (value: string) => {
        this.searchQuery = value;
    }

    @computed get filteredSalads() {
        return this.salads.filter(salad => {
            return (salad.name.toLocaleLowerCase()).includes(this.searchQuery.toLocaleLowerCase());
        })
    }

    getSalads = (args: {
        order?: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC,
        sortBy?: string,
        tags?: string,
        name?: string;
    }): Promise<void> => {
        return saladsApi.getSalads(args)
            .then(response => {
                this.setSalads(response.data);
            })
    }
}