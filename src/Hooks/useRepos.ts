import { useEffect, useState } from "react";
import { RepositoryModel } from "../Models/RepositoryModel";
import { getRepos } from "./getRepos";

export function useRepos(page: number, sort: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<RepositoryModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getRepos(page, sort);
                setData(response.items);
            } catch (err) {
                const errorMessage = (err as Error).message || "Unexpected error occurred";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, sort]);

    return { loading, error, data };
}