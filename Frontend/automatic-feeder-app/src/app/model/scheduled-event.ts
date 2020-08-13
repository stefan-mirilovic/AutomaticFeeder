export class ScheduledFeeding {

    public id: number;
    public time: Date;
    public amount: number;
    public enabled: boolean;

    constructor(id: number, time: Date, amount: number, enabled: boolean) {
        this.id = id;
        this.time = time;
        this.amount = amount;
        this.enabled = enabled;
    }

}