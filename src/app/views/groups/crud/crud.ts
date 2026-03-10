import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { HasPermissionDirective } from '../../../directives/has-permission.directive';
import { Permission, PermissionsService } from '../../../services/permissions.service';

interface Group {
  id: number;
  nivel: string;
  autor: string;
  nombre: string;
  integrantes: number;
  tickets: number;
  descripcion: string;
  active: boolean;
}

@Component({
  standalone: true,
  selector: 'app-crud',
  imports: [
    CommonModule,
    FormsModule,
    HasPermissionDirective,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
  ],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {
  groups: Group[] = [];
  selectedGroup: Group | null = null;
  displayDialog = false;
  isNew = false;

  constructor(private readonly permissionsService: PermissionsService) {
    // seed with some placeholder data
    this.groups = [
      {
        id: 1,
        nivel: 'Alto',
        autor: 'Admin',
        nombre: 'Grupo A',
        integrantes: 5,
        tickets: 2,
        descripcion: 'Ejemplo de grupo A',
        active: true,
      },
      {
        id: 2,
        nivel: 'Medio',
        autor: 'User1',
        nombre: 'Grupo B',
        integrantes: 3,
        tickets: 0,
        descripcion: 'Ejemplo de grupo B',
        active: true,
      },
    ];
  }

  hasPermission(permission: Permission): boolean {
    return this.permissionsService.hasPermission(permission);
  }

  get canSeeActions(): boolean {
    return this.hasPermission('group:edit') || this.hasPermission('group:delete');
  }

  showNew(): void {
    if (!this.hasPermission('group:add')) {
      return;
    }

    this.selectedGroup = {
      id: 0,
      nivel: '',
      autor: '',
      nombre: '',
      integrantes: 0,
      tickets: 0,
      descripcion: '',
      active: true,
    };
    this.isNew = true;
    this.displayDialog = true;
  }

  showEdit(group: Group): void {
    if (!this.hasPermission('group:edit')) {
      return;
    }

    this.selectedGroup = { ...group };
    this.isNew = false;
    this.displayDialog = true;
  }

  save(): void {
    if (!this.selectedGroup) {
      return;
    }

    if (this.isNew && !this.hasPermission('group:add')) {
      return;
    }

    if (!this.isNew && !this.hasPermission('group:edit')) {
      return;
    }

    if (this.isNew) {
      // assign new id
      const maxId = this.groups.length === 0 ? 0 : Math.max(...this.groups.map(group => group.id));
      this.selectedGroup.id = maxId + 1;
      this.groups.push(this.selectedGroup);
    } else {
      const idx = this.groups.findIndex(g => g.id === this.selectedGroup!.id);
      if (idx !== -1) {
        this.groups[idx] = { ...this.selectedGroup } as Group;
      }
    }
    this.displayDialog = false;
  }

  delete(group: Group): void {
    if (!this.hasPermission('group:delete')) {
      return;
    }

    // logical delete
    const idx = this.groups.findIndex(g => g.id === group.id);
    if (idx !== -1) {
      this.groups[idx].active = false;
    }
  }

  get activeGroups(): Group[] {
    return this.groups.filter(g => g.active);
  }
}
