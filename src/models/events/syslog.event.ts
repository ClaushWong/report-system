export class Track {
    constructor(
        public readonly _metadata: any,
        public readonly tags: string[],
        public readonly severity: string,
        public readonly message: string,
    ) {}
}
