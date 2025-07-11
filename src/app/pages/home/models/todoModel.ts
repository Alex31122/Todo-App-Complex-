import { FormControl } from "@angular/forms";

export class ToDo{
    name: string;
    description: string;
    tag: string;
    is_completed: boolean;
    is_important: boolean;
    due_date: Date;

    constructor(data?: Partial<ToDo>){
        this.name = data?.name ?? "Unnamed ToDo";
        this.description = data?.description ??"Undefined Description";
        this.tag = data?.tag ?? "Undefined Type";
        this.is_completed = data?.is_completed ?? false;
        this.is_important = data?.is_important ?? false;
        this.due_date = data?.due_date ?? new Date();
    }


}
