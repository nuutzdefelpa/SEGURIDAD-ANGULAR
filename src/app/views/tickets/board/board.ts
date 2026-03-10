import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { QuickFilters } from '../../../components/quick-filters/quick-filters';
import { HasPermissionDirective } from '../../../directives/has-permission.directive';
import {
  QuickTicketFilter,
  TicketPriority,
  TicketStatus,
  TICKET_STATUSES,
  WorkspaceDataService,
} from '../../../services/workspace-data.service';
import { PermissionsService } from '../../../services/permissions.service';

@Component({
  selector: 'app-board',
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, QuickFilters, HasPermissionDirective],
  templateUrl: './board.html',
  styleUrl: './board.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
  private readonly workspaceDataService = inject(WorkspaceDataService);
  private readonly permissionsService = inject(PermissionsService);

  readonly statuses = TICKET_STATUSES;
  readonly activeFilter = signal<QuickTicketFilter>('all');
  readonly draggedTicketId = signal<number | null>(null);
  readonly tickets = computed(() => {
    const allTickets = this.workspaceDataService.selectedGroupTickets();
    const filter = this.activeFilter();
    const currentUsername = this.workspaceDataService.currentUsername();
    switch (filter) {
      case 'mine':
        return allTickets.filter(ticket => ticket.assignee === currentUsername);
      case 'unassigned':
        return allTickets.filter(ticket => ticket.assignee === null);
      case 'high':
        return allTickets.filter(ticket => ticket.priority === 'Alta');
      default:
        return allTickets;
    }
  });

  setFilter(filter: QuickTicketFilter): void {
    this.activeFilter.set(filter);
  }

  ticketsByStatus(status: TicketStatus) {
    return this.tickets().filter(ticket => ticket.status === status);
  }

  canMoveTickets(): boolean {
    return this.permissionsService.hasPermission('ticket:edit_state') || this.permissionsService.hasPermission('ticket:edit');
  }

  dragStart(ticketId: number): void {
    if (!this.canMoveTickets()) {
      return;
    }
    this.draggedTicketId.set(ticketId);
  }

  allowDrop(event: DragEvent): void {
    if (!this.canMoveTickets()) {
      return;
    }
    event.preventDefault();
  }

  drop(status: TicketStatus): void {
    const ticketId = this.draggedTicketId();
    if (!ticketId) {
      return;
    }
    this.workspaceDataService.moveTicket(ticketId, status);
    this.draggedTicketId.set(null);
  }

  statusClass(status: TicketStatus): string {
    return `status-chip ${status.toLowerCase().replaceAll(' ', '-')}`;
  }

  priorityClass(priority: TicketPriority): string {
    return `priority-chip ${priority.toLowerCase()}`;
  }
}
