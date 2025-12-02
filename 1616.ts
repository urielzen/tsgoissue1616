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

    // This should work in old compiler (C inferred as NeighborOut)
    // And fail in new compiler (C inferred as unknown -> providers mismatch)
    // We force the types here to reproduce the inference result seen in the full app
    this.#dialog.open(ModalConfirmation, dialogConfig);
  }
}

