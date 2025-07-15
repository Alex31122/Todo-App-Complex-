export class Tag{
  name: string;
  color: string;
  constructor(data?: Partial<Tag>){
    this.name = data?.name ?? "unnamed tag";
    this.color = data?.color ?? this.generateNewHexColor();
  }


  generateNewHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const color = '#' + ('000000' + randomColor).slice(-6);
    // console.log('Nuevo color Hexadecimal:', this.color);
    return color;
  }
}
