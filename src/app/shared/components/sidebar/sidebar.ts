import { TodoService } from './../../../pages/home/service/todo-service';
import { Component, inject, output } from '@angular/core';
import { TagsList } from '../../../pages/home/components/tags-list/tags-list';
@Component({
  selector: 'app-sidebar',
  imports: [TagsList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  todoService = inject(TodoService);
  sendViewSelectionToService(mensaje: string): void {
    this.todoService.actualizarMensaje(mensaje);
    this.todoService._selectionObservable.next(mensaje);
  }
}
