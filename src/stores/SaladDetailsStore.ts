import {makeObservable, observable, action} from 'mobx';
import {Salad} from "../types/Salad";

export class SaladDetailsStore {
    constructor() {
        makeObservable(this)
    }

    @observable salad: Salad | null = null;

    @action
    setSalad = (salad: Salad | null) => {
        this.salad = salad;
    }
}