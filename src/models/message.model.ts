export interface message {

    userFromId: string;
    userFromProfile: {
        first_name: string;
        last_name: string;
    }

    userToId: string;

    userToProfile: {
        first_name: string;
        last_name: string;
    }

    content: string;
    dateTime: number;


}