import { makeAutoObservable } from 'mobx';
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
        makeAutoObservable(this);
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

    async getItems() {
        this.startLoading();
        try {
            const newItems = await getRepos(
                this.currentPage,
                this.sortCriteria,
                this.sortOrder,
            );
            this.setItems(newItems.items);
            this.setCurrentPage(this.currentPage++);
            this.setPageCount(newItems.total_count)
        } catch (error) {
            this.setError(`Error: ${error}`);
        } finally {
            this.stopLoading();
        }
    }

}

export default new RepStore();