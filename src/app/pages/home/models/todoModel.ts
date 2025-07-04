export class ToDo{
    name: string;
    description: string;
    type: string;

    constructor(data?: Partial<ToDo>){
        this.name = data?.name ?? "Unnamed ToDo";
        this.description = "Undefined Description";
        this.type = data?.type ?? "Undefined Type";
    }

}