// src/models/SignupModel.ts
export class SignupModel {
    email: string;
    password: string;
    role: string;

    constructor(email: string, password: string, role: string = 'User') {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
