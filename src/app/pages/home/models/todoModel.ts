import { FormControl } from "@angular/forms";

export class ToDo{
    name: string;
    description: string;
    type: string;
    is_completed: boolean;

    constructor(data?: Partial<ToDo>){
        this.name = data?.name ?? "Unnamed ToDo";
        this.description = "Undefined Description";
        this.type = data?.type ?? "Undefined Type";
        this.is_completed = data?.is_completed ?? false;
    }

}
