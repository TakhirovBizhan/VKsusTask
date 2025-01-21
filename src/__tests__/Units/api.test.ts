import axios from "axios";
import { getRepos } from "../../api/getRepos";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getRepos", () => {
    const page = 1;
    const sortField = "stars";
    const sortOrder = "desc";
    const itemsPerPage = 10;

    it("should return data when the request is successful", async () => {
        const mockResponse = {
            data: {
                total_count: 100,
                items: [{ id: 1, name: "repo1" }, { id: 2, name: "repo2" }],
            },
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const result = await getRepos(page, sortField, sortOrder, itemsPerPage);

        expect(result).toEqual(mockResponse.data);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            `https://api.github.com/search/repositories?q=javascript&sort=${sortField}&order=${sortOrder}&page=${page}&per_page=${itemsPerPage}`,
            { headers: { Authorization: `Bearer ${process.env.VITE_PERSONAL_ACCESS_TOKEN}` } }
        );
    });

    it("should throw an error when an unexpected error occurs", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Unexpected error"));

        await expect(getRepos(page, sortField, sortOrder, itemsPerPage)).rejects.toThrow(
            "An unexpected error occurred. Please try again."
        );
    });
});