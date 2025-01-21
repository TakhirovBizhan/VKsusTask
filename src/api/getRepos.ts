
import axios from "axios";
import { GitHubAxiosError, GitHubAxiosResponse, GitHubSearchResponse } from "../Models/RequestModels";
import { SortField, SortOrder } from "../Models/sortModels";

export async function getRepos(
    page: number,
    sortField: SortField,
    sortOrder: SortOrder,
    itemsPerPage: number
) {
    const url = `https://api.github.com/search/repositories?q=javascript&sort=${sortField}&order=${sortOrder}&page=${page}&per_page=${itemsPerPage}`;

    try {
        const response: GitHubAxiosResponse = await axios.get<GitHubSearchResponse>(url,
            { headers: { Authorization: `Bearer ${process.env.VITE_PERSONAL_ACCESS_TOKEN}` } });
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