import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { QuickFilters } from '../../components/quick-filters/quick-filters';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import {
  QuickTicketFilter,
  TicketPriority,
  TicketStatus,
  WorkspaceDataService,
} from '../../services/workspace-data.service';

@Component({
  selector: 'app-group-dashboard',
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, DividerModule, QuickFilters, HasPermissionDirective],
  templateUrl: './group-dashboard.html',
  styleUrl: './group-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDashboard {
  private readonly workspaceDataService = inject(WorkspaceDataService);

  readonly activeFilter = signal<QuickTicketFilter>('all');
  readonly selectedGroup = this.workspaceDataService.selectedGroup;
  readonly selectedGroupStats = this.workspaceDataService.selectedGroupStats;
  readonly assignedTickets = this.workspaceDataService.assignedTicketsForCurrentUser;
  readonly filteredRecentTickets = computed(() => {
    const tickets = this.workspaceDataService.recentTickets();
    const activeFilter = this.activeFilter();
    const currentUsername = this.workspaceDataService.currentUsername();
    switch (activeFilter) {
      case 'mine':
        return tickets.filter(ticket => ticket.assignee === currentUsername);
      case 'unassigned':
        return tickets.filter(ticket => ticket.assignee === null);
      case 'high':
        return tickets.filter(ticket => ticket.priority === 'Alta');
      default:
        return tickets;
    }
  });

  setFilter(filter: QuickTicketFilter): void {
    this.activeFilter.set(filter);
  }

  statusClass(status: TicketStatus): string {
    return `status-chip ${status.toLowerCase().replaceAll(' ', '-')}`;
  }

  priorityClass(priority: TicketPriority): string {
    return `priority-chip ${priority.toLowerCase()}`;
  }
}
