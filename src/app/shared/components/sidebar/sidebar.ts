import { TodoService } from './../../../pages/home/service/todo-service';
import { Component, output } from '@angular/core';
import { TagsList } from '../../../pages/home/components/tags-list/tags-list';
@Component({
  selector: 'app-sidebar',
  imports: [TagsList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  add_tag_selection: string = '';
  selection = output<string>();

  constructor(private todoService: TodoService){}
  handleData(data: string): void{
    console.log("Received data: ", data);
    this.add_tag_selection = data;
    this.sendSelectionToHome(data);
  }

  sendSelectionToHome(message: string){
    this.selection.emit(message);
  }

  mensajeInput: string = '';
  enviarMensaje(mensaje: string): void {
    this.todoService.actualizarMensaje(mensaje);
  }
}
