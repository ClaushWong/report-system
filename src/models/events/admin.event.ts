export class Login {
    constructor(
        public readonly username: string,
        public readonly ip: string,
        public readonly success: boolean,
        public readonly message?: string,
    ) {}
}

export class ChangePassword {
    constructor(
        public readonly username: string,
        public readonly ip: string,
        public readonly success: boolean,
        public readonly message?: string,
    ) {}
}

export class Update {
    constructor(
        public readonly user: any,
        public readonly action: "new" | "updated" | "updated-password" | "removed",
        public readonly byUser?: any,
    ) {}
}
