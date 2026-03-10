import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PermissionsService, type Permission } from '../../services/permissions.service';
import {
  CreateUserInput,
  WorkspaceDataService,
} from '../../services/workspace-data.service';

interface EditableUser extends CreateUserInput {}

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, TableModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users {
  private readonly workspaceDataService = inject(WorkspaceDataService);
  private readonly permissionsService = inject(PermissionsService);

  readonly users = this.workspaceDataService.users;
  readonly groups = this.workspaceDataService.groups;
  readonly allPermissions = this.workspaceDataService.allPermissions;
  readonly isSuperuser = computed(() => this.permissionsService.isSuperuser());
  readonly canAddUsers = computed(() => this.permissionsService.hasPermission('user:add'));
  readonly canEditUsers = computed(() => this.permissionsService.hasPermission('user:edit'));
  readonly canDeleteUsers = computed(() => this.permissionsService.hasPermission('user:delete'));
  readonly dialogVisible = signal(false);
  readonly editingUsername = signal<string | null>(null);
  readonly editableUser = signal<EditableUser>(this.emptyUser());

  openNew(): void {
    if (!this.canAddUsers()) {
      return;
    }

    this.editingUsername.set(null);
    this.editableUser.set(this.emptyUser());
    this.dialogVisible.set(true);
  }

  openEdit(username: string): void {
    if (!this.canEditUsers()) {
      return;
    }

    const user = this.users().find(candidate => candidate.username === username);
    if (!user) {
      return;
    }

    this.editingUsername.set(username);
    this.editableUser.set({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      dob: user.dob,
      phone: user.phone,
      address: user.address,
      groupIds: [...user.groupIds],
      permissions: [...user.permissions],
    });
    this.dialogVisible.set(true);
  }

  saveUser(): void {
    const user = this.editableUser();
    if (!user.username || !user.fullName || !user.email) {
      return;
    }

    const editingUsername = this.editingUsername();
    if (editingUsername) {
      if (!this.canEditUsers()) {
        return;
      }
      this.workspaceDataService.updateUser(editingUsername, user);
    } else {
      if (!this.canAddUsers()) {
        return;
      }
      this.workspaceDataService.createUser(user);
    }

    this.dialogVisible.set(false);
  }

  deleteUser(username: string): void {
    if (!this.canDeleteUsers() || username === 'superadmin') {
      return;
    }

    this.workspaceDataService.deleteUser(username);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
  }

  onPermissionToggle(permission: Permission, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.togglePermission(permission, isChecked);
  }

  onGroupToggle(groupId: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleGroup(groupId, isChecked);
  }

  updateField<K extends keyof EditableUser>(key: K, value: EditableUser[K]): void {
    this.editableUser.update(user => ({ ...user, [key]: value }));
  }

  togglePermission(permission: Permission, checked: boolean): void {
    this.editableUser.update(user => ({
      ...user,
      permissions: checked
        ? [...new Set([...user.permissions, permission])]
        : user.permissions.filter(currentPermission => currentPermission !== permission),
    }));
  }

  toggleGroup(groupId: string, checked: boolean): void {
    this.editableUser.update(user => ({
      ...user,
      groupIds: checked
        ? [...new Set([...user.groupIds, groupId])]
        : user.groupIds.filter(currentGroupId => currentGroupId !== groupId),
    }));
  }

  private emptyUser(): EditableUser {
    return {
      username: '',
      fullName: '',
      email: '',
      dob: '1990-01-01',
      phone: '',
      address: '',
      groupIds: [],
      permissions: [],
    };
  }
}
