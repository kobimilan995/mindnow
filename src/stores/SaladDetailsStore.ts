import {makeObservable, observable, action} from 'mobx';
import {Salad} from "../types/Salad";
import * as saladsApi from "../api/salads";

export class SaladDetailsStore {
    constructor() {
        makeObservable(this)
    }

    @observable salad: Salad | null = null;
    @observable isLoading: boolean = false;

    @action
    setSalad = (salad: Salad | null) => {
        this.salad = salad;
    }
    @action
    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }

    getSalad = ({id}: {id: string}) => {
        this.setIsLoading(true);
        return saladsApi.getSalad({id})
            .then((response) => {
                this.setSalad(response.data);
                this.setIsLoading(false);
                return Promise.resolve();
            });
    }
}