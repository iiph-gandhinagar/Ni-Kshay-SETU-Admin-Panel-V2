export interface ActionMeta<T = any> {
    callBack: (e: { status: boolean, data: T | { errors: Array<T> } | undefined, message: string }) => void;
}
