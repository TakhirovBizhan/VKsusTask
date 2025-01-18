import axios, { AxiosResponse, AxiosError } from "axios";
import { RepositoryModel } from "../Models/RepositoryModel";

export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryModel[];
}

type GitHubAxiosResponse = AxiosResponse<GitHubSearchResponse>;
type GitHubAxiosError = AxiosError<{ message: string }>;

// Параметры сортировки
export type SortOrder = "asc" | "desc";
export type SortField = "stars" | "forks" | "updated";

const reposPerPage = 10;

export async function getRepos(
    page: number,
    sortField: SortField,
    sortOrder: SortOrder
) {
    const url = `https://api.github.com/search/repositories?q=javascript&sort=${sortField}&order=${sortOrder}&page=${page}&per_page=${reposPerPage}`;

    try {
        const response: GitHubAxiosResponse = await axios.get<GitHubSearchResponse>(url);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e as GitHubAxiosError;
            const status = error.response?.status || 500;
            const message = error.response?.data.message || error.message || "Unknown error";

            console.error(`GitHub API error: ${message} (Status: ${status})`);
            throw new Error(`${message} (Status: ${status})`);
        } else {
            console.error("Unexpected error:", e);
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
}