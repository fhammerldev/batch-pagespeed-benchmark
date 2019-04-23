import { Details } from "./details";
export class Audit {
    public id: string;
    public title: string;
    public description: string;
    public score: number;
    public displayValue: string;
    public details: Details;
    public weight: number;
    public group: string;

    constructor(
        id: string,
        title: string,
        description: string,
        score: number,
        displayValue: string,
        details: Details,
        weight: number,
        group: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.score = score;
        this.displayValue = displayValue;
        this.details = details;
        this.weight = weight;
        this.group = group;
    }

}
