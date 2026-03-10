import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Crud } from './crud/crud';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

@Component({
  standalone: true,
  selector: 'app-groups',
  imports: [CommonModule, CardModule, Crud, HasPermissionDirective],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups {
  total = 12345; // placeholder
}
