export class Details {
    public oversallSavingsMs: number;
    public type: string;

    constructor(overallSavingsMs: number = 0, type: string = "N/A") {
        this.oversallSavingsMs = overallSavingsMs;
        this.type = type;
    }
}
