import { inject } from './1616-angular-core';
import { Dialog, DialogConfig, DialogRef } from './1616-angular-cdk-dialog';

interface IConfirmationModal<TSubSet> {
  subset?: TSubSet;
}

class ModalConfirmation<TSubSet> {
  readonly #dialogRef = inject(DialogRef<TSubSet>);
  // readonly #dialogRef: DialogRef<TSubSet> = inject(DialogRef<TSubSet>);
  readonly data: IConfirmationModal<TSubSet> = null!;
}

class AppComponent {
  readonly #dialog: Dialog = null!;

  openDeleteNeighborModal(): void {
    const dialogConfig: DialogConfig<
      IConfirmationModal<undefined>,
      DialogRef<undefined, ModalConfirmation<undefined>>
    > = {
      data: {
        subset: undefined,
      },
    };

    this.#dialog.open(ModalConfirmation, dialogConfig);
  }
}

