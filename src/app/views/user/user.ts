import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { PermissionsService } from '../../services/permissions.service';
import { WorkspaceDataService } from '../../services/workspace-data.service';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ConfirmDialogModule,
    HasPermissionDirective,
  ],
  providers: [ConfirmationService],
  templateUrl: './user.html',
  styleUrl: './user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class User {
  private readonly workspaceDataService = inject(WorkspaceDataService);

  readonly user = this.workspaceDataService.currentUserProfile;
  readonly userSummary = this.workspaceDataService.userSummary;
  readonly assignedTickets = computed(() => {
    const username = this.user().username;
    return this.workspaceDataService.tickets().filter(ticket => ticket.assignee === username);
  });

  userCopy = this.user();
  displayEditDialog = false;
  userDeleted = false;

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly permissionsService: PermissionsService
  ) {}

  editProfile(): void {
    if (!this.permissionsService.hasPermission('user:edit')) {
      return;
    }

    this.userCopy = { ...this.user() };
    this.displayEditDialog = true;
  }

  saveProfile(): void {
    if (!this.permissionsService.hasPermission('user:edit')) {
      return;
    }

    this.displayEditDialog = false;
  }

  confirmDelete(): void {
    if (!this.permissionsService.hasPermission('user:delete')) {
      return;
    }

    this.confirmation.confirm({
      message: '¿Deseas eliminar tu cuenta? Esta acción es lógica y se puede revertir.',
      accept: () => {
        this.userDeleted = true;
      },
    });
  }
}
