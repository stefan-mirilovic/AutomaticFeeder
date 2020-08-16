export class ScheduledFeeding {

    public id: number;
    public time: string;
    public amount: number;
    public enabled: boolean;

    constructor(id: number, time: string, amount: number, enabled: boolean) {
        this.id = id;
        this.time = time;
        this.amount = amount;
        this.enabled = enabled;
    }

}