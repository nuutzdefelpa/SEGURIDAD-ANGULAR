import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { type QuickTicketFilter } from '../../services/workspace-data.service';

interface QuickFilterOption {
  key: QuickTicketFilter;
  label: string;
}

@Component({
  selector: 'app-quick-filters',
  imports: [CommonModule, ButtonModule],
  templateUrl: './quick-filters.html',
  styleUrl: './quick-filters.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickFilters {
  readonly currentFilter = input<QuickTicketFilter>('all');
  readonly filterChange = output<QuickTicketFilter>();

  readonly options: QuickFilterOption[] = [
    { key: 'all', label: 'Todos' },
    { key: 'mine', label: 'Mis tickets' },
    { key: 'unassigned', label: 'Sin asignar' },
    { key: 'high', label: 'Prioridad alta' },
  ];

  selectFilter(filter: QuickTicketFilter): void {
    this.filterChange.emit(filter);
  }
}
