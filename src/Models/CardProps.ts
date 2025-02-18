

export type cardProps = {
    id: number,
    stars: number,
    forks: number,
    url: string,
    updated: string,
    name: string,
    private: boolean,
    avatarUrl: string,
    login: string,
    onDelete: () => void
}