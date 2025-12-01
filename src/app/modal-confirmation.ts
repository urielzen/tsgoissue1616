import { DIALOG_DATA, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef
} from '@angular/core';

export interface IConfirmationModal<TSubSet> {
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

export type Severity =
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
export class ModalConfirmation<TSubSet> {
  readonly #dialogRef = inject(DialogRef<TSubSet>);
  readonly data: IConfirmationModal<TSubSet> = inject(DIALOG_DATA);

  handleDismissButtonClick(): void {
    this.#dialogRef.close();
  }

  handleActionButtonClick(): void {
    this.#dialogRef.close(this.data.subset);
  }
}



export const getDefaultConfirmationDialogConfig = <TDataSubset>({
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
