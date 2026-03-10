import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  TicketPriority,
  TicketStatus,
  WorkspaceDataService,
} from '../../../services/workspace-data.service';

@Component({
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, CardModule, InputTextModule, TextareaModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Create {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly workspaceDataService = inject(WorkspaceDataService);

  readonly statuses = TICKET_STATUSES;
  readonly priorities = TICKET_PRIORITIES;
  readonly members = this.workspaceDataService.selectedGroupMembers;

  readonly ticketForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    status: ['Pendiente', Validators.required],
    assignee: [''],
    priority: ['Media', Validators.required],
    dueDate: ['2026-03-20', Validators.required],
  });

  createTicket(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const rawValue = this.ticketForm.getRawValue();
    const ticketId = this.workspaceDataService.createTicket({
      title: rawValue.title ?? '',
      description: rawValue.description ?? '',
      status: (rawValue.status ?? 'Pendiente') as TicketStatus,
      assignee: rawValue.assignee ? rawValue.assignee : null,
      priority: (rawValue.priority ?? 'Media') as TicketPriority,
      dueDate: rawValue.dueDate ?? '2026-03-20',
    });

    this.router.navigate(['/tickets', ticketId]);
  }
}
