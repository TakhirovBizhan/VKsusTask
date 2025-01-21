import RepStore from "../../Store/RepStore";
import { getRepos } from "../../api/getRepos";
import { IRepositoryModel } from "../../Models/RepositoryModel";
import { testRepository } from "../../../__mocks__/mockRep";
import "@testing-library/jest-dom";

jest.mock('../../api/getRepos', () => ({
    getRepos: jest.fn(() => Promise.resolve({ items: [], total_count: 0 })),
}));

describe("RepStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        RepStore.resetItems();
        RepStore.setCurrentPage(1);
        RepStore.setItemCount(0);
        RepStore.clearError();
    });

    it("should initialize with default values", () => {
        expect(RepStore.items).toEqual([]);
        expect(RepStore.sortCriteria).toBe("stars");
        expect(RepStore.sortOrder).toBe("asc");
        expect(RepStore.currentPage).toBe(1);
        expect(RepStore.loading).toBe(false);
        expect(RepStore.error).toBeNull();
        expect(RepStore.itemCount).toBe(0);
        expect(RepStore.itemsPerPage).toBe(30);
    });

    it("should set items", () => {
        const mockItems: IRepositoryModel[] = [testRepository];
        RepStore.setItems(mockItems, 1);
        expect(RepStore.items).toEqual(mockItems);
    });

    it("should reset items", () => {
        RepStore.setItems([testRepository], 1);
        RepStore.resetItems();
        expect(RepStore.items).toEqual([]);
    });

    it("should start and stop loading", () => {
        RepStore.startLoading();
        expect(RepStore.loading).toBe(true);

        RepStore.stopLoading();
        expect(RepStore.loading).toBe(false);
    });

    it("should set error", () => {
        RepStore.setError("Test error");
        expect(RepStore.error).toBe("Error: Test error");
    });

    it("should update sort order to ascending", () => {
        RepStore.setOrderByAsc();

        expect(RepStore.sortOrder).toBe("asc");
        expect(RepStore.currentPage).toBe(1);
        expect(RepStore.items).toEqual([]);
    });

    it("should fetch items and update state", async () => {
        const mockResponse = {
            items: [{ id: 1, name: "repo1" }],
            total_count: 1,
        };

        (getRepos as jest.Mock).mockResolvedValue(mockResponse);

        await RepStore.getItems();

        expect(getRepos).toHaveBeenCalledWith(1, "stars", "asc", 30);
        expect(RepStore.items).toEqual(mockResponse.items);
        expect(RepStore.itemCount).toBe(mockResponse.total_count);
        expect(RepStore.currentPage).toBe(2);
        expect(RepStore.loading).toBe(false);
        expect(RepStore.error).toBeNull();
    });

    it("should update sort order to descending", () => {
        RepStore.setOrderByDesc();

        expect(RepStore.sortOrder).toBe("desc");
        expect(RepStore.currentPage).toBe(1);
        expect(RepStore.items).toEqual([]);
    });

    it("should handle errors during fetching items", async () => {
        const mockError = new Error("Network error");
        (getRepos as jest.Mock).mockRejectedValue(mockError);

        await expect(RepStore.getItems()).rejects.toThrow(mockError);
        expect(RepStore.error).toBe("Error: Network error");
        expect(RepStore.loading).toBe(false);
    });

    it("should delete an item by id", () => {
        const mockItems: IRepositoryModel[] = [testRepository];
        RepStore.setItems(mockItems, 1);
        expect(RepStore.itemCount).toEqual(1);
        RepStore.deleteItem(1);

        expect(RepStore.items).toEqual([]);
        expect(RepStore.itemCount).toBe(0);
    });

    it("should update an item by id", () => {
        const mockItems: IRepositoryModel[] = [testRepository];
        const updatedProps = {
            isPrivate: true,
            forks: 10,
            stars: 20,
            login: "newUser",
        };

        RepStore.setItems(mockItems, 1);
        expect(RepStore.itemCount).toEqual(1);
        RepStore.updateItem(1, updatedProps);

        expect(RepStore.items[0]).toMatchObject({
            ...testRepository,
            private: updatedProps.isPrivate,
            stargazers_count: updatedProps.stars,
            forks_count: updatedProps.forks,
            owner: { ...testRepository.owner, login: updatedProps.login },
        });
    });

    it("should throw an error when updating a non-existent item", () => {
        expect(() =>
            RepStore.updateItem(999, {
                stars: 20,
                forks: 10,
                isPrivate: true,
                login: "newUser",
            })
        ).toThrow("No item with this id!");
    });
});