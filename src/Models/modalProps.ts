export type modalProps = {
    id: number,
    visible: boolean,
    onClose: () => void,
    stars: number,
    forks: number,
    isPrivate: boolean,
    login: string
}