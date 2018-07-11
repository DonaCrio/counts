export class NoteModel {
    _id: string;
    object: string;
    amount: number;
    comment: string;
    contributors: [{
        _id: string,
        amount: number
    }];
    indebteds: [{
        _id: string,
        amount: number
    }];
    creationDate: Date;
    updateDate: Date;
    picture: string;
}
