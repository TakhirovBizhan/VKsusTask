import { AxiosError, AxiosResponse } from "axios";
import { RepositoryModel } from "./RepositoryModel";

export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepositoryModel[];
}

export type GitHubAxiosResponse = AxiosResponse<GitHubSearchResponse>;
export type GitHubAxiosError = AxiosError<{ message: string }>;
