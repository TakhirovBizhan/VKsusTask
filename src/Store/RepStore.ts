import { flow, makeAutoObservable } from 'mobx';
import { SortField, SortOrder } from '../Models/sortModels';
import { IRepositoryModel } from '../Models/RepositoryModel';
import { getRepos } from '../api/getRepos';
import { modalProps } from '../Models/modalProps';

class RepStore {
    items: IRepositoryModel[] = [];
    sortCriteria: SortField = 'stars';
    sortOrder: SortOrder = 'asc';
    currentPage: number = 1;
    loading: boolean = false;
    error: string | null = null;
    itemCount: number = 0;
    itemsPerPage: number = 30;

    constructor() {
        makeAutoObservable(this, {
            getItems: flow
        });
    }

    setItems(items: IRepositoryModel[]) {
        this.items = items;
    }

    resetItems() {
        this.items = []
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
        this.sortOrder = 'asc';
        this.resetItems();
        this.setCurrentPage(1)
        this.getItems();
    }

    setOrderByDesc() {
        this.sortOrder = 'desc';
        this.resetItems();
        this.setCurrentPage(1)
        this.getItems();
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    setSortCriteria(sortCriteria: SortField) {
        this.sortCriteria = sortCriteria;
        this.resetItems();
        this.setCurrentPage(1)
        this.getItems();
    }

    setItemCount(itemCount: number) {
        this.itemCount = itemCount;
    }

    getItems = flow(function* (this: RepStore) {
        this.loading = true;
        this.error = null;

        try {
            const newItems: { items: IRepositoryModel[]; total_count: number } = yield getRepos(
                this.currentPage,
                this.sortCriteria,
                this.sortOrder,
                this.itemsPerPage
            );
            this.items = [...this.items, ...newItems.items];
            this.itemCount = newItems.total_count;
            this.currentPage++;
        } catch (err) {
            this.setError(
                err instanceof Error ? err.message : 'Unknown Error'
            );
            throw err
        } finally {
            this.loading = false;
        }
    });

    deleteItem(id: IRepositoryModel['id']) {
        this.items = this.items.filter((item) => item.id !== id);
        this.setItemCount(this.itemCount - 1)
    }
    updateItem(id: IRepositoryModel['id'], formProps: modalProps) {
        const newItem = this.items.find((item) => item.id === id);
        if (newItem) {
            newItem.private = formProps.isPrivate;
            newItem.stargazers_count = formProps.stars;
            newItem.forks_count = formProps.forks;
            newItem.owner.login = formProps.login;
        } else {
            throw new Error('No item with this id!')
        }
    }

    clearError() {
        this.error = null;
    }

}

export default new RepStore();