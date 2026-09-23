export interface Revealable {
    reveal(): void;

    conceal(): void;

    toggle(): void;

    isRevealed(): boolean;
}
