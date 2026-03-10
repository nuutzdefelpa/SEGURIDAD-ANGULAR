import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  ALL_PERMISSIONS,
  DEFAULT_USER_PERMISSIONS,
  type Permission,
  PermissionsService,
} from './permissions.service';

export type TicketStatus = 'Pendiente' | 'En progreso' | 'Revision' | 'Hecho' | 'Bloqueado';
export type TicketPriority = 'Alta' | 'Media' | 'Baja';
export type QuickTicketFilter = 'all' | 'mine' | 'unassigned' | 'high';

export interface WorkspaceUser {
  username: string;
  fullName: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  permissions: Permission[];
  groupIds: string[];
}

export interface WorkspaceGroup {
  id: string;
  name: string;
  description: string;
  memberUsernames: string[];
}

export interface TicketComment {
  id: number;
  author: string;
  message: string;
  createdAt: string;
}

export interface TicketHistoryEntry {
  id: number;
  actor: string;
  message: string;
  createdAt: string;
}

export interface TicketRecord {
  id: number;
  groupId: string;
  title: string;
  description: string;
  status: TicketStatus;
  assignee: string | null;
  creator: string;
  priority: TicketPriority;
  createdAt: string;
  dueDate: string;
  comments: TicketComment[];
  history: TicketHistoryEntry[];
}

export interface CreateTicketInput {
  title: string;
  description: string;
  status: TicketStatus;
  assignee: string | null;
  priority: TicketPriority;
  dueDate: string;
}

export interface UpdateTicketInput {
  title: string;
  description: string;
  status: TicketStatus;
  assignee: string | null;
  priority: TicketPriority;
  dueDate: string;
}

export interface CreateUserInput {
  username: string;
  fullName: string;
  email: string;
  dob: string;
  phone: string;
  address: string;
  groupIds: string[];
  permissions: Permission[];
}

export interface UpdateUserInput extends CreateUserInput {}

export const TICKET_STATUSES: readonly TicketStatus[] = [
  'Pendiente',
  'En progreso',
  'Revision',
  'Bloqueado',
  'Hecho',
] as const;

export const TICKET_PRIORITIES: readonly TicketPriority[] = ['Alta', 'Media', 'Baja'] as const;

const INITIAL_USERS: WorkspaceUser[] = [
  {
    username: 'superadmin',
    fullName: 'Super Admin',
    email: 'superadmin@erp.com',
    dob: '1988-02-10',
    phone: '+52 555 100 1000',
    address: 'Centro de Control 1',
    permissions: [...ALL_PERMISSIONS],
    groupIds: ['dev-team', 'support-team', 'ux-team'],
  },
  {
    username: 'admin@erp.com',
    fullName: 'Admin Desarrollo',
    email: 'admin@erp.com',
    dob: '1992-08-15',
    phone: '+52 555 111 2222',
    address: 'Avenida Desarrollo 123',
    permissions: [...DEFAULT_USER_PERMISSIONS],
    groupIds: ['dev-team', 'support-team'],
  },
  {
    username: 'sandra.soporte',
    fullName: 'Sandra Soporte',
    email: 'sandra@erp.com',
    dob: '1994-04-21',
    phone: '+52 555 333 4444',
    address: 'Zona Soporte 88',
    permissions: ['ticket:view', 'ticket:edit_state', 'group:view', 'user:view'],
    groupIds: ['support-team'],
  },
  {
    username: 'luis.ux',
    fullName: 'Luis UX',
    email: 'luis@erp.com',
    dob: '1995-11-07',
    phone: '+52 555 777 8899',
    address: 'Distrito Creativo 56',
    permissions: ['ticket:view', 'ticket:add', 'ticket:edit_state', 'group:view', 'user:view'],
    groupIds: ['ux-team'],
  },
];

const INITIAL_GROUPS: WorkspaceGroup[] = [
  {
    id: 'dev-team',
    name: 'Equipo Dev',
    description: 'Workspace principal para desarrollo de producto y bugs de sprint.',
    memberUsernames: ['superadmin', 'admin@erp.com'],
  },
  {
    id: 'support-team',
    name: 'Soporte',
    description: 'Espacio de tickets operativos, atención a incidencias y seguimiento.',
    memberUsernames: ['superadmin', 'admin@erp.com', 'sandra.soporte'],
  },
  {
    id: 'ux-team',
    name: 'UX',
    description: 'Validación de experiencia, research y mejoras de interfaz.',
    memberUsernames: ['superadmin', 'luis.ux'],
  },
];

const INITIAL_TICKETS: TicketRecord[] = [
  {
    id: 1001,
    groupId: 'dev-team',
    title: 'Corregir login responsive',
    description: 'El formulario de login se desborda en pantallas pequeñas.',
    status: 'En progreso',
    assignee: 'admin@erp.com',
    creator: 'superadmin',
    priority: 'Alta',
    createdAt: '2026-03-04',
    dueDate: '2026-03-14',
    comments: [
      { id: 1, author: 'superadmin', message: 'Necesitamos esto antes del demo.', createdAt: '2026-03-04 09:15' },
    ],
    history: [
      { id: 1, actor: 'superadmin', message: 'Ticket creado', createdAt: '2026-03-04 09:00' },
      { id: 2, actor: 'admin@erp.com', message: 'Estado cambiado a En progreso', createdAt: '2026-03-05 10:10' },
    ],
  },
  {
    id: 1002,
    groupId: 'dev-team',
    title: 'Crear tablero Kanban',
    description: 'Se requiere una primera versión del tablero de tickets por columnas.',
    status: 'Pendiente',
    assignee: null,
    creator: 'superadmin',
    priority: 'Alta',
    createdAt: '2026-03-06',
    dueDate: '2026-03-18',
    comments: [],
    history: [{ id: 1, actor: 'superadmin', message: 'Ticket creado', createdAt: '2026-03-06 08:45' }],
  },
  {
    id: 2001,
    groupId: 'support-team',
    title: 'Revisar SLA de ticket crítico',
    description: 'Validar atención del ticket crítico con prioridad alta.',
    status: 'Bloqueado',
    assignee: 'sandra.soporte',
    creator: 'admin@erp.com',
    priority: 'Alta',
    createdAt: '2026-03-03',
    dueDate: '2026-03-11',
    comments: [
      { id: 1, author: 'sandra.soporte', message: 'Pendiente validación del proveedor.', createdAt: '2026-03-07 13:40' },
    ],
    history: [
      { id: 1, actor: 'admin@erp.com', message: 'Ticket creado', createdAt: '2026-03-03 07:25' },
      { id: 2, actor: 'sandra.soporte', message: 'Estado cambiado a Bloqueado', createdAt: '2026-03-07 13:35' },
    ],
  },
  {
    id: 3001,
    groupId: 'ux-team',
    title: 'Actualizar flujo de onboarding',
    description: 'Se deben simplificar pasos del onboarding de nuevos usuarios.',
    status: 'Revision',
    assignee: 'luis.ux',
    creator: 'superadmin',
    priority: 'Media',
    createdAt: '2026-03-02',
    dueDate: '2026-03-20',
    comments: [],
    history: [
      { id: 1, actor: 'superadmin', message: 'Ticket creado', createdAt: '2026-03-02 10:05' },
      { id: 2, actor: 'luis.ux', message: 'Estado cambiado a Revision', createdAt: '2026-03-09 17:15' },
    ],
  },
  {
    id: 3002,
    groupId: 'ux-team',
    title: 'Preparar guía visual de permisos',
    description: 'Diseñar una referencia rápida para acciones bloqueadas por permisos.',
    status: 'Hecho',
    assignee: 'luis.ux',
    creator: 'superadmin',
    priority: 'Baja',
    createdAt: '2026-02-28',
    dueDate: '2026-03-09',
    comments: [],
    history: [
      { id: 1, actor: 'superadmin', message: 'Ticket creado', createdAt: '2026-02-28 14:00' },
      { id: 2, actor: 'luis.ux', message: 'Ticket completado', createdAt: '2026-03-08 16:30' },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class WorkspaceDataService {
  private readonly permissionsService = inject(PermissionsService);

  private readonly usersSignal = signal<WorkspaceUser[]>(INITIAL_USERS);
  private readonly groupsSignal = signal<WorkspaceGroup[]>(INITIAL_GROUPS);
  private readonly ticketsSignal = signal<TicketRecord[]>(INITIAL_TICKETS);
  private readonly selectedGroupIdSignal = signal<string | null>(INITIAL_GROUPS[0]?.id ?? null);

  readonly statuses = TICKET_STATUSES;
  readonly priorities = TICKET_PRIORITIES;
  readonly allPermissions = ALL_PERMISSIONS;

  readonly currentUsername = computed(() => this.permissionsService.currentUser()?.username ?? 'guest');
  readonly isSuperuser = computed(() => this.permissionsService.isSuperuser());
  readonly currentUserProfile = computed<WorkspaceUser>(() => {
    const username = this.currentUsername();
    const existingUser = this.usersSignal().find(user => user.username === username || user.email === username);
    if (existingUser) {
      return existingUser;
    }

    return {
      username,
      fullName: username,
      email: username.includes('@') ? username : `${username}@erp.local`,
      dob: '1990-01-01',
      phone: '+52 555 000 0000',
      address: 'Sin dirección registrada',
      permissions: [...DEFAULT_USER_PERMISSIONS],
      groupIds: INITIAL_GROUPS.slice(0, 2).map(group => group.id),
    };
  });

  readonly users = computed(() => this.usersSignal());
  readonly groups = computed(() => this.groupsSignal());
  readonly tickets = computed(() => this.ticketsSignal());
  readonly availableGroups = computed(() => {
    const groups = this.groupsSignal();
    if (this.isSuperuser()) {
      return groups;
    }

    const allowedGroupIds = new Set(this.currentUserProfile().groupIds);
    return groups.filter(group => allowedGroupIds.has(group.id));
  });
  readonly selectedGroup = computed(() => {
    const selectedGroupId = this.selectedGroupIdSignal();
    return this.availableGroups().find(group => group.id === selectedGroupId) ?? null;
  });
  readonly selectedGroupMembers = computed(() => {
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup) {
      return [];
    }

    const members = new Set(selectedGroup.memberUsernames);
    return this.usersSignal().filter(user => members.has(user.username));
  });
  readonly selectedGroupTickets = computed(() => {
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup) {
      return [];
    }

    return this.ticketsSignal()
      .filter(ticket => ticket.groupId === selectedGroup.id)
      .sort((left, right) => right.id - left.id);
  });
  readonly selectedGroupStats = computed(() => {
    const tickets = this.selectedGroupTickets();
    return {
      total: tickets.length,
      pendiente: tickets.filter(ticket => ticket.status === 'Pendiente').length,
      enProgreso: tickets.filter(ticket => ticket.status === 'En progreso').length,
      revision: tickets.filter(ticket => ticket.status === 'Revision').length,
      hecho: tickets.filter(ticket => ticket.status === 'Hecho').length,
      bloqueado: tickets.filter(ticket => ticket.status === 'Bloqueado').length,
    };
  });
  readonly recentTickets = computed(() => this.selectedGroupTickets().slice(0, 4));
  readonly assignedTicketsForCurrentUser = computed(() => {
    const username = this.currentUsername();
    return this.selectedGroupTickets().filter(ticket => ticket.assignee === username);
  });
  readonly userSummary = computed(() => {
    const username = this.currentUsername();
    const tickets = this.ticketsSignal().filter(ticket => ticket.assignee === username);
    return {
      total: tickets.length,
      abiertos: tickets.filter(ticket => ticket.status !== 'Hecho').length,
      enProgreso: tickets.filter(ticket => ticket.status === 'En progreso').length,
      hechos: tickets.filter(ticket => ticket.status === 'Hecho').length,
    };
  });

  constructor() {
    effect(() => {
      const currentUser = this.permissionsService.currentUser();
      if (!currentUser) {
        return;
      }

      const username = currentUser.username;
      const alreadyExists = this.usersSignal().some(user => user.username === username || user.email === username);
      if (alreadyExists) {
        return;
      }

      this.usersSignal.update(users => [
        {
          username,
          fullName: username,
          email: username.includes('@') ? username : `${username}@erp.local`,
          dob: '1990-01-01',
          phone: '+52 555 000 0000',
          address: 'Sin dirección registrada',
          permissions: [...DEFAULT_USER_PERMISSIONS],
          groupIds: INITIAL_GROUPS.slice(0, 2).map(group => group.id),
        },
        ...users,
      ]);
    });

    effect(() => {
      const groups = this.availableGroups();
      const selectedGroup = this.selectedGroupIdSignal();
      if (groups.length === 0) {
        this.selectedGroupIdSignal.set(null);
        return;
      }
      if (!selectedGroup || !groups.some(group => group.id === selectedGroup)) {
        this.selectedGroupIdSignal.set(groups[0].id);
      }
    });
  }

  selectGroup(groupId: string): void {
    this.selectedGroupIdSignal.set(groupId);
  }

  getTicketById(ticketId: number): TicketRecord | undefined {
    return this.ticketsSignal().find(ticket => ticket.id === ticketId);
  }

  createTicket(input: CreateTicketInput): number {
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup) {
      return 0;
    }

    const nextId = this.ticketsSignal().length === 0 ? 1 : Math.max(...this.ticketsSignal().map(ticket => ticket.id)) + 1;
    const actor = this.currentUsername();
    const newTicket: TicketRecord = {
      id: nextId,
      groupId: selectedGroup.id,
      title: input.title,
      description: input.description,
      status: input.status,
      assignee: input.assignee,
      creator: actor,
      priority: input.priority,
      createdAt: this.today(),
      dueDate: input.dueDate,
      comments: [],
      history: [
        {
          id: 1,
          actor,
          message: 'Ticket creado',
          createdAt: this.now(),
        },
      ],
    };

    this.ticketsSignal.update(tickets => [newTicket, ...tickets]);
    return nextId;
  }

  moveTicket(ticketId: number, status: TicketStatus): void {
    const actor = this.currentUsername();
    this.ticketsSignal.update(tickets =>
      tickets.map(ticket => {
        if (ticket.id !== ticketId || ticket.status === status) {
          return ticket;
        }

        return {
          ...ticket,
          status,
          history: [
            ...ticket.history,
            {
              id: ticket.history.length + 1,
              actor,
              message: `Estado cambiado a ${status}`,
              createdAt: this.now(),
            },
          ],
        };
      })
    );
  }

  updateTicket(ticketId: number, input: UpdateTicketInput): void {
    const actor = this.currentUsername();
    this.ticketsSignal.update(tickets =>
      tickets.map(ticket => {
        if (ticket.id !== ticketId) {
          return ticket;
        }

        return {
          ...ticket,
          title: input.title,
          description: input.description,
          status: input.status,
          assignee: input.assignee,
          priority: input.priority,
          dueDate: input.dueDate,
          history: [
            ...ticket.history,
            {
              id: ticket.history.length + 1,
              actor,
              message: 'Ticket actualizado',
              createdAt: this.now(),
            },
          ],
        };
      })
    );
  }

  addComment(ticketId: number, message: string): void {
    const actor = this.currentUsername();
    this.ticketsSignal.update(tickets =>
      tickets.map(ticket => {
        if (ticket.id !== ticketId) {
          return ticket;
        }

        const nextCommentId = ticket.comments.length + 1;
        return {
          ...ticket,
          comments: [
            ...ticket.comments,
            {
              id: nextCommentId,
              author: actor,
              message,
              createdAt: this.now(),
            },
          ],
          history: [
            ...ticket.history,
            {
              id: ticket.history.length + 1,
              actor,
              message: 'Comentario agregado',
              createdAt: this.now(),
            },
          ],
        };
      })
    );
  }

  addGroup(name: string, description: string): void {
    const nextId = `${name.toLowerCase().replaceAll(' ', '-')}-${this.groupsSignal().length + 1}`;
    const actor = this.currentUsername();
    this.groupsSignal.update(groups => [
      {
        id: nextId,
        name,
        description,
        memberUsernames: [actor],
      },
      ...groups,
    ]);
    this.usersSignal.update(users =>
      users.map(user =>
        user.username === actor
          ? { ...user, groupIds: [...new Set([...user.groupIds, nextId])] }
          : user
      )
    );
    this.selectedGroupIdSignal.set(nextId);
  }

  updateSelectedGroup(name: string, description: string): void {
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup) {
      return;
    }

    this.groupsSignal.update(groups =>
      groups.map(group =>
        group.id === selectedGroup.id ? { ...group, name, description } : group
      )
    );
  }

  removeSelectedGroup(): void {
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup) {
      return;
    }

    this.groupsSignal.update(groups => groups.filter(group => group.id !== selectedGroup.id));
    this.ticketsSignal.update(tickets => tickets.filter(ticket => ticket.groupId !== selectedGroup.id));
    this.usersSignal.update(users =>
      users.map(user => ({
        ...user,
        groupIds: user.groupIds.filter(groupId => groupId !== selectedGroup.id),
      }))
    );
  }

  addUserToSelectedGroup(email: string): void {
    const normalizedEmail = email.trim().toLowerCase();
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup || !normalizedEmail) {
      return;
    }

    const existingUser = this.usersSignal().find(user => user.email.toLowerCase() === normalizedEmail);
    const username = existingUser?.username ?? normalizedEmail;

    if (existingUser) {
      this.usersSignal.update(users =>
        users.map(user =>
          user.username === existingUser.username
            ? { ...user, groupIds: [...new Set([...user.groupIds, selectedGroup.id])] }
            : user
        )
      );
    } else {
      this.usersSignal.update(users => [
        {
          username,
          fullName: normalizedEmail.split('@')[0],
          email: normalizedEmail,
          dob: '1990-01-01',
          phone: '+52 555 000 0000',
          address: 'Sin dirección registrada',
          permissions: [...DEFAULT_USER_PERMISSIONS],
          groupIds: [selectedGroup.id],
        },
        ...users,
      ]);
    }

    this.groupsSignal.update(groups =>
      groups.map(group =>
        group.id === selectedGroup.id
          ? {
              ...group,
              memberUsernames: [...new Set([...group.memberUsernames, username])],
            }
          : group
      )
    );
  }

  removeUserFromSelectedGroup(username: string): void {
    const selectedGroup = this.selectedGroup();
    if (!selectedGroup) {
      return;
    }

    this.groupsSignal.update(groups =>
      groups.map(group =>
        group.id === selectedGroup.id
          ? {
              ...group,
              memberUsernames: group.memberUsernames.filter(memberUsername => memberUsername !== username),
            }
          : group
      )
    );
    this.usersSignal.update(users =>
      users.map(user =>
        user.username === username
          ? { ...user, groupIds: user.groupIds.filter(groupId => groupId !== selectedGroup.id) }
          : user
      )
    );
  }

  createUser(input: CreateUserInput): void {
    this.usersSignal.update(users => [
      {
        username: input.username,
        fullName: input.fullName,
        email: input.email,
        dob: input.dob,
        phone: input.phone,
        address: input.address,
        groupIds: input.groupIds,
        permissions: input.permissions,
      },
      ...users,
    ]);
    this.syncUserGroups(input.username, input.groupIds);
  }

  updateUser(username: string, input: UpdateUserInput): void {
    this.usersSignal.update(users =>
      users.map(user =>
        user.username === username
          ? {
              username: input.username,
              fullName: input.fullName,
              email: input.email,
              dob: input.dob,
              phone: input.phone,
              address: input.address,
              groupIds: input.groupIds,
              permissions: input.permissions,
            }
          : user
      )
    );
    this.syncUserGroups(input.username, input.groupIds, username);
    this.ticketsSignal.update(tickets =>
      tickets.map(ticket => ({
        ...ticket,
        assignee: ticket.assignee === username ? input.username : ticket.assignee,
        creator: ticket.creator === username ? input.username : ticket.creator,
        comments: ticket.comments.map(comment =>
          comment.author === username ? { ...comment, author: input.username } : comment
        ),
        history: ticket.history.map(entry =>
          entry.actor === username ? { ...entry, actor: input.username } : entry
        ),
      }))
    );
  }

  deleteUser(username: string): void {
    this.usersSignal.update(users => users.filter(user => user.username !== username));
    this.groupsSignal.update(groups =>
      groups.map(group => ({
        ...group,
        memberUsernames: group.memberUsernames.filter(memberUsername => memberUsername !== username),
      }))
    );
    this.ticketsSignal.update(tickets =>
      tickets.map(ticket => ({
        ...ticket,
        assignee: ticket.assignee === username ? null : ticket.assignee,
      }))
    );
  }

  private syncUserGroups(nextUsername: string, groupIds: string[], previousUsername = nextUsername): void {
    this.groupsSignal.update(groups =>
      groups.map(group => {
        const shouldContainUser = groupIds.includes(group.id);
        const withoutPrevious = group.memberUsernames.filter(memberUsername => memberUsername !== previousUsername);
        return {
          ...group,
          memberUsernames: shouldContainUser
            ? [...new Set([...withoutPrevious, nextUsername])]
            : withoutPrevious,
        };
      })
    );
  }

  private today(): string {
    return '2026-03-10';
  }

  private now(): string {
    return '2026-03-10 10:00';
  }
}
