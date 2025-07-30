import { Component, EventEmitter, output, Output } from '@angular/core';
@Component({
  selector: 'app-left-section',
  imports: [],
  templateUrl: './left-section.html',
  styleUrl: './left-section.css'
})
export class LeftSection {
  selection = output<string>();
  tagsList: string[] = [];
  tagsListJson = localStorage.getItem('tagsList');
  constructor(){
    if(this.tagsListJson){
      this.tagsList = JSON.parse(this.tagsListJson);
    }else{
      this.tagsList.push("home");
      this.tagsList.push("work");
      this.addTagsListToLocalStorage();
    }
  }
  addTagsListToLocalStorage(){
    const tagsList = JSON.stringify(this.tagsList);
    localStorage.setItem('tagsList', tagsList);
  }

  sendSelectionToHome(){
    this.selection.emit("add_tag");
  }
}
