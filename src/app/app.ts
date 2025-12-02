import { Component,inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy } from '@angular/core';

interface IConfirmationModal<TSubSet> {
  subset?: TSubSet;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
class ModalConfirmation<TSubSet> {
  readonly #dialogRef = inject(DialogRef<TSubSet>);
  // readonly #dialogRef: DialogRef<TSubSet> = inject(DialogRef<TSubSet>);

  readonly data: IConfirmationModal<TSubSet> = null!;
}

@Component({
  selector: 'app-root',
  template: '',
})
export class AppComponent {
  readonly #dialog: Dialog = null!;

  openDeleteNeighborModal(): void {
    const dialogConfig: DialogConfig<
      IConfirmationModal<undefined>,
      DialogRef<undefined, ModalConfirmation<undefined>>
    > = {
      data: { subset: undefined },
    };

    this.#dialog.open(ModalConfirmation, dialogConfig);
  }
}

