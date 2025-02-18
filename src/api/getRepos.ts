
import axios from "axios";
import { GitHubAxiosError, GitHubAxiosResponse, GitHubSearchResponse } from "../Models/RequestModels";
import { SortField, SortOrder } from "../Models/sortModels";

export async function getRepos(
    page: number,
    sortField: SortField,
    sortOrder: SortOrder,
    itemsPerPage: number,
    searchTerms: string,
    token: string

) {
    const url = `https://api.github.com/search/repositories${searchTerms ? `?q=${encodeURIComponent(searchTerms)}` : '?q=stars'
        }&sort=${sortField}&order=${sortOrder}&page=${page}&per_page=${itemsPerPage}`;
    try {
        const response: GitHubAxiosResponse = await axios.get<GitHubSearchResponse>(url,
            {
                headers: { Authorization: `Bearer ${token}` },
            });

        if (response.data.total_count === 0) {
            return { items: [], total_count: 0 };
        }


        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (axios.isCancel(e)) {
                console.warn("Запрос отменён:", e.message);
                return { items: [], total_count: 0 };
            }

            const error = e as GitHubAxiosError;
            const status = error.response?.status || 500;
            const message = error.response?.data.message || error.message || "Unknown error";

            throw new Error(`${message} (Status: ${status})`);
        } else {
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
}