import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { WorkspaceDataService } from '../../services/workspace-data.service';

@Component({
  selector: 'app-groups',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    TextareaModule,
    HasPermissionDirective,
  ],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Groups {
  private readonly workspaceDataService = inject(WorkspaceDataService);

  readonly selectedGroup = this.workspaceDataService.selectedGroup;
  readonly members = this.workspaceDataService.selectedGroupMembers;
  readonly total = computed(() => this.members().length);
  readonly newMemberEmail = signal('');

  saveSelectedGroup(name: string, description: string): void {
    this.workspaceDataService.updateSelectedGroup(name, description);
  }

  addMember(): void {
    this.workspaceDataService.addUserToSelectedGroup(this.newMemberEmail());
    this.newMemberEmail.set('');
  }

  removeMember(username: string): void {
    this.workspaceDataService.removeUserFromSelectedGroup(username);
  }

  deleteGroup(): void {
    this.workspaceDataService.removeSelectedGroup();
  }
}
