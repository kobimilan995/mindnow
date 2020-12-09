import {makeObservable, observable, action} from 'mobx';
import {Salad} from "../types/Salad";
import {SORT_ORDER_ASC, SORT_ORDER_DESC} from "../constants/sorting";
import * as saladsApi from "../api/salads";

export class SaladsStore {
    constructor() {
        makeObservable(this)
    }

    @observable salads: Salad[] = [];

    @action
    setSalads = (salads: Salad[]) => {
        this.salads = salads;
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