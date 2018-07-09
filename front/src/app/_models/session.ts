export class SessionModel {
    jwt: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        pseudo: string;
        counts: string;
        email: string;
    };
}
