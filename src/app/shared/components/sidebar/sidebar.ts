import { Component } from '@angular/core';
import { TagsList } from '../../../pages/home/components/tags-list/tags-list';
@Component({
  selector: 'app-sidebar',
  imports: [TagsList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

}
