import { TodoService } from './../../service/todo-service';
import { Component, inject, input, OnInit} from '@angular/core';
import { FormControl, ReactiveFormsModule, NgForm, FormsModule, Validators} from '@angular/forms';
import { Tag } from '../../models/tagModel';

@Component({
  selector: 'app-tag-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './tag-form.html',
  styleUrl: './tag-form.css'
})
export class TagForm implements OnInit{
  todoService = inject(TodoService);
  tag = new Tag();
  tagName = new FormControl('', Validators.required);
  tagIndex = input(-1);
  is_editing = false;

  ngOnInit(): void {
    if(this.tagIndex() >= 0){
      this.tag = this.todoService.tagsList[this.tagIndex()];
      this.tagName.setValue(this.tag.name);
      this.is_editing = true;
    }
    this.todoService._editIndexObservable.subscribe({
      next: (data) => {
        this.tag = this.todoService.tagsList[data];
        this.tagName.setValue(this.tag.name);
        this.is_editing = true;
      }
    });
  }

  onSubmit(){
    if(this.tagName.invalid){
      return;
    }

    if(!this.tagName.dirty){
      this.tagName.reset();
      this.is_editing = false;
      console.log("YOU DIDN'T CHANGE THE TAG");
      this.is_editing = false;
      return;
    }

    this.tag.name = this.tagName.value ?? this.tag.name;
    if(this.tagIndex() >= 0 && this.is_editing){
      this.todoService.tagsList[this.tagIndex()] = this.tag;
    }else{
      this.todoService.tagsList.push(this.tag);
    }
    this.todoService.addTagsListToLocalStorage(this.todoService.tagsList);
    this.tagName.reset();
    this.is_editing = false;
  }

  deleteTag(){
    this.todoService.tagsList.splice(this.tagIndex(), 1);
    this.todoService.addTagsListToLocalStorage(this.todoService.tagsList);
    this.tagName.reset();
    this.is_editing = false;
  }
}
