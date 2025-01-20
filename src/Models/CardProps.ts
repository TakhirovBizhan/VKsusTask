

export type cardProps = {
    stars: number,
    forks: number,
    updated: string,
    name: string,
    private: boolean,
    avatarUrl: string,
    login: string,
    onDelete: () => void
}