export interface Copyable {
    copy(): Promise<void>;

    onCopy(callback: () => void): void;
}
