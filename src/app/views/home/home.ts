import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PermissionsService } from '../../services/permissions.service';
import { WorkspaceDataService } from '../../services/workspace-data.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, DividerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly router = inject(Router);
  private readonly permissionsService = inject(PermissionsService);
  private readonly workspaceDataService = inject(WorkspaceDataService);

  readonly currentUser = this.workspaceDataService.currentUserProfile;
  readonly availableGroups = this.workspaceDataService.availableGroups;
  readonly selectedGroup = this.workspaceDataService.selectedGroup;
  readonly selectedGroupStats = this.workspaceDataService.selectedGroupStats;
  readonly canViewTickets = computed(() => this.permissionsService.hasPermission('ticket:view'));

  selectGroup(groupId: string): void {
    this.workspaceDataService.selectGroup(groupId);
  }

  enterDashboard(groupId: string): void {
    this.selectGroup(groupId);
    this.router.navigate(['/dashboard']);
  }
}
