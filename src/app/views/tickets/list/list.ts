import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { QuickFilters } from '../../../components/quick-filters/quick-filters';
import {
  QuickTicketFilter,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  TicketPriority,
  TicketStatus,
  WorkspaceDataService,
} from '../../../services/workspace-data.service';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, RouterLink, TableModule, ButtonModule, QuickFilters],
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
  private readonly workspaceDataService = inject(WorkspaceDataService);

  readonly statuses = TICKET_STATUSES;
  readonly priorities = TICKET_PRIORITIES;
  readonly quickFilter = signal<QuickTicketFilter>('all');
  readonly statusFilter = signal<TicketStatus | 'Todos'>('Todos');
  readonly priorityFilter = signal<TicketPriority | 'Todas'>('Todas');
  readonly assigneeFilter = signal<string>('');
  readonly assignees = computed(() =>
    Array.from(new Set(this.workspaceDataService.selectedGroupMembers().map(member => member.username)))
  );
  readonly tickets = computed(() => {
    const quickFilter = this.quickFilter();
    const statusFilter = this.statusFilter();
    const priorityFilter = this.priorityFilter();
    const assigneeFilter = this.assigneeFilter();
    const currentUsername = this.workspaceDataService.currentUsername();

    return this.workspaceDataService.selectedGroupTickets().filter(ticket => {
      let matchesQuickFilter = true;
      if (quickFilter === 'mine') {
        matchesQuickFilter = ticket.assignee === currentUsername;
      } else if (quickFilter === 'unassigned') {
        matchesQuickFilter = ticket.assignee === null;
      } else if (quickFilter === 'high') {
        matchesQuickFilter = ticket.priority === 'Alta';
      }

      const matchesStatus = statusFilter === 'Todos' ? true : ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'Todas' ? true : ticket.priority === priorityFilter;
      const matchesAssignee = assigneeFilter ? ticket.assignee === assigneeFilter : true;
      return matchesQuickFilter && matchesStatus && matchesPriority && matchesAssignee;
    });
  });

  setQuickFilter(filter: QuickTicketFilter): void {
    this.quickFilter.set(filter);
  }
}
