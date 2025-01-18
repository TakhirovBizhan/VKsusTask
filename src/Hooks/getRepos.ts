import axios, { AxiosResponse, AxiosError } from "axios";
import { RepositoryModel } from "../Models/RepositoryModel";

export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryModel[];
}

type GitHubAxiosResponse = AxiosResponse<GitHubSearchResponse>;
type GitHubAxiosError = AxiosError<{ message: string }>;

export async function getRepos(page: number, sort: string) {
    const url = `https://api.github.com/search/repositories?q=javascript&sort=${sort}&order=asc&page=${page}`;

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