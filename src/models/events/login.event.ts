export class LoginEvent {
    constructor(
        public readonly username: string,
        public readonly ip: string,
        public readonly success: boolean,
        public readonly message?: string,
    ) {}
}
