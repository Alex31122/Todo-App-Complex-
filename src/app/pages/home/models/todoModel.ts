import { FormControl } from "@angular/forms";

export class ToDo{
    name: string;
    description: string;
    tag: string;
    is_completed: boolean;

    constructor(data?: Partial<ToDo>){
        this.name = data?.name ?? "Unnamed ToDo";
        this.description = data?.description ??"Undefined Description";
        this.tag = data?.tag ?? "Undefined Type";
        this.is_completed = data?.is_completed ?? false;
    }


}
