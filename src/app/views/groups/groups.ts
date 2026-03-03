import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-groups',
  imports: [CommonModule, CardModule],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups {
  total = 12345; // placeholder
}
