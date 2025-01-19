import { AxiosError, AxiosResponse } from "axios";
import { IRepositoryModel } from "./RepositoryModel";

export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: IRepositoryModel[];
}

export type GitHubAxiosResponse = AxiosResponse<GitHubSearchResponse>;
export type GitHubAxiosError = AxiosError<{ message: string }>;
