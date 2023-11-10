export class RequestForm {
    provider: number;
    amount: number;
    requestId: string;
    requestDate: string;

    public clone(): any {
        const form = new RequestForm();
        form.provider = this.provider;
        form.amount = this.amount;
        return form;
    }

}
