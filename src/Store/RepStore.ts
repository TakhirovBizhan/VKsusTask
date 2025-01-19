import { makeAutoObservable } from 'mobx';
import { SortField, SortOrder } from '../Models/sortModels';
import { RepositoryModel } from '../Models/RepositoryModel';

class RepStore {
    items: RepositoryModel[] = [];
    sortFields: SortField = 'stars';
    sortOrder: SortOrder = 'asc';
    currentPage: number = 1;
    loading: boolean = false;
    error: string | null = null;
    itemsPerPage: number = 30;

    constructor() {
        makeAutoObservable(this);
    }

}

export default new RepStore();