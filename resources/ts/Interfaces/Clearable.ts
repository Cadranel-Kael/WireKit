export interface Clearable {
    clear(): void;

    onClear(callback: () => void): void;
}
