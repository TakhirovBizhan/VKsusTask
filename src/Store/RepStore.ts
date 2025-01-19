import { flow, makeAutoObservable } from 'mobx';
import { SortField, SortOrder } from '../Models/sortModels';
import { IRepositoryModel } from '../Models/RepositoryModel';
import { getRepos } from '../api/getRepos';

class RepStore {
    items: IRepositoryModel[] = [];
    sortCriteria: SortField = 'stars';
    sortOrder: SortOrder = 'asc';
    currentPage: number = 1;
    loading: boolean = false;
    error: string | null = null;
    pageCount: number = 0;

    constructor() {
        makeAutoObservable(this, {
            getItems: flow
        });
    }

    setItems(items: IRepositoryModel[]) {
        this.items = items;
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }

    setError(error: string) {
        this.error = `Error: ${error}`;
    }

    setOrderByAsc() {
        this.sortOrder = 'asc'
    }

    setOrderByDesc() {
        this.sortOrder = 'desc'
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    setSortCriteria(sortCriteria: SortField) {
        this.sortCriteria = sortCriteria;
        this.getItems();
    }

    setPageCount(pages: number) {
        this.pageCount = pages;
    }

    getItems = flow(function* (this: RepStore) {
        this.loading = true;
        this.error = null;

        try {
            const newItems: { items: IRepositoryModel[]; total_count: number } = yield getRepos(
                this.currentPage,
                this.sortCriteria,
                this.sortOrder
            );
            this.items = [...this.items, ...newItems.items];
            this.pageCount = newItems.total_count;
            this.currentPage++;
        } catch (err) {
            this.setError(
                err instanceof Error ? err.message : 'Unknown Error'
            );
        } finally {
            this.loading = false;
        }
    });

}

export default new RepStore();