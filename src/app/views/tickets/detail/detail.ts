import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { PermissionsService } from '../../../services/permissions.service';
import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  TicketPriority,
  TicketStatus,
  WorkspaceDataService,
} from '../../../services/workspace-data.service';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, CardModule, InputTextModule, TextareaModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Detail {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly workspaceDataService = inject(WorkspaceDataService);
  private readonly permissionsService = inject(PermissionsService);

  readonly statuses = TICKET_STATUSES;
  readonly priorities = TICKET_PRIORITIES;
  readonly ticketId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  readonly ticket = computed(() => this.workspaceDataService.getTicketById(this.ticketId));
  readonly currentUsername = this.workspaceDataService.currentUsername;
  readonly members = this.workspaceDataService.selectedGroupMembers;
  readonly comment = signal('');
  readonly canEditAllFields = computed(() => {
    const ticket = this.ticket();
    if (!ticket) {
      return false;
    }
    return this.permissionsService.isSuperuser() || ticket.creator === this.currentUsername() || this.permissionsService.hasPermission('ticket:edit');
  });
  readonly canEditStateOnly = computed(() => {
    const ticket = this.ticket();
    if (!ticket) {
      return false;
    }
    return ticket.assignee === this.currentUsername() && this.permissionsService.hasPermission('ticket:edit_state');
  });

  readonly detailForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    status: ['Pendiente', Validators.required],
    assignee: [''],
    priority: ['Media', Validators.required],
    dueDate: ['2026-03-20', Validators.required],
  });

  constructor() {
    effect(() => {
      const ticket = this.ticket();
      if (!ticket) {
        return;
      }

      this.detailForm.patchValue({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        assignee: ticket.assignee ?? '',
        priority: ticket.priority,
        dueDate: ticket.dueDate,
      }, { emitEvent: false });
    });
  }

  saveTicket(): void {
    const ticket = this.ticket();
    if (!ticket) {
      return;
    }

    const rawValue = this.detailForm.getRawValue();
    if (this.canEditAllFields()) {
      this.workspaceDataService.updateTicket(ticket.id, {
        title: rawValue.title ?? ticket.title,
        description: rawValue.description ?? ticket.description,
        status: (rawValue.status ?? ticket.status) as TicketStatus,
        assignee: rawValue.assignee ? rawValue.assignee : null,
        priority: (rawValue.priority ?? ticket.priority) as TicketPriority,
        dueDate: rawValue.dueDate ?? ticket.dueDate,
      });
      return;
    }

    if (this.canEditStateOnly()) {
      this.workspaceDataService.moveTicket(ticket.id, (rawValue.status ?? ticket.status) as TicketStatus);
    }
  }

  addComment(): void {
    const nextComment = this.comment().trim();
    if (!nextComment || !this.ticket()) {
      return;
    }

    this.workspaceDataService.addComment(this.ticketId, nextComment);
    this.comment.set('');
  }
}
