import { Component, inject, TemplateRef } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DIALOG_DATA, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy } from '@angular/core';

 interface NeighborOut {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordCreated: boolean;
  roles: string[];
  properties: PropertyOut[];
}

 interface PropertyOut {
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

 interface IConfirmationModal<TSubSet> {
  title: string;
  maximizable: boolean;
  hideCloseX: boolean;
  body: TemplateRef<void>;
  hasActionButton: boolean;
  actionButtonText?: string;
  actionButtonSeverity?: Severity;
  dismissButtonText: string;
  dismissButtonSeverity?: Severity;
  subset?: TSubSet;
}

 type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'plain';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="border: 1px solid red">
      <div>
        Modal content
      </div>
      @if(data.hasActionButton){
        <button (click)="handleActionButtonClick()">
        {{ data.actionButtonText }}
        </button>
      }
      <button (click)="handleDismissButtonClick()">
        {{ data.dismissButtonText }}
      </button>
    </div>
  `
})
class ModalConfirmation<TSubSet> {
  readonly #dialogRef = inject(DialogRef<TSubSet>);
  readonly data: IConfirmationModal<TSubSet> = inject(DIALOG_DATA);

  handleDismissButtonClick(): void {
    this.#dialogRef.close();
  }

  handleActionButtonClick(): void {
    this.#dialogRef.close(this.data.subset);
  }
}



 const getDefaultConfirmationDialogConfig = <TDataSubset>({
  disableClose = true,
  maximizable = false,
  hideCloseX = false,
  width,
  title,
  body,
  hasActionButton,
  actionButtonText,
  actionButtonSeverity,
  dismissButtonText,
  dismissButtonSeverity,
  dataSubset
}: {
  disableClose?: boolean;
  maximizable?: boolean;
  hideCloseX?: boolean;
  width?: string;
  title: string;
  body: TemplateRef<void>;
  hasActionButton: boolean;
  actionButtonText?: string;
  actionButtonSeverity?: Severity;
  dismissButtonText: string;
  dismissButtonSeverity?: Severity;
  dataSubset?: TDataSubset;
}): DialogConfig<
  IConfirmationModal<TDataSubset>,
  DialogRef<TDataSubset, ModalConfirmation<TDataSubset>>
> => {
  return {
    disableClose,
    width,
    data: {
      title,
      maximizable,
      hideCloseX,
      body,
      hasActionButton,
      actionButtonText,
      actionButtonSeverity,
      dismissButtonText,
      dismissButtonSeverity,
      subset: dataSubset
    }
  };
};
