import { Component, inject, TemplateRef } from '@angular/core';
import { getDefaultConfirmationDialogConfig, ModalConfirmation } from './modal-confirmation';
import { Dialog } from '@angular/cdk/dialog';

export interface NeighborOut {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordCreated: boolean;
  roles: string[];
  properties: PropertyOut[];
}

export interface PropertyOut {
  lotNumber: string;
  streetNumber: number | null;
}

@Component({
  selector: 'app-root',
  template: `
  <div>
    <button (click)="openDeleteNeighborModal(deleteNeighborModalBody)">
      Open Modal
    </button>
    <ng-template #deleteNeighborModalBody>
      Are you sure you want to delete this user?
    </ng-template>
  </div>
  `,
})
export class AppComponent {
  readonly #dialog = inject(Dialog);

   openDeleteNeighborModal(
    body: TemplateRef<void>
  ): void {
    const dialogConfig = getDefaultConfirmationDialogConfig<NeighborOut>({
      title: 'Delete User',
      body,
      hasActionButton: true,
      actionButtonText: 'Delete User',
      actionButtonSeverity: 'danger',
      dismissButtonText: 'Do Not Delete',
      dataSubset: undefined
    });
    this.#dialog.open(ModalConfirmation, dialogConfig);
  }
}
