export class NewNoteModel {
    object: string;
    comment: string;
    amount: number;
    contributors: [{
        _id: string,
        amount: number
    }];
    indebteds: [{
        _id: string,
        amount: number
    }];
}
