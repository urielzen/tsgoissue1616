// mock Angular core
interface AbstractType<T> extends Function {
  prototype: T;
}

type ProviderToken<T> = Type$1<T> | AbstractType<T>;

type StaticProvider =
  | {}
  | any[];

declare class ElementRef<T = any> {
}

declare abstract class TemplateRef<C> {
  abstract readonly elementRef: ElementRef;
}

declare const Type$1: FunctionConstructor;
interface Type$1<T> extends Function {
  new (...args: any[]): T;
}

declare function inject<T>(token: ProviderToken<T>): T;

// mock angular cdk dialog
declare abstract class BasePortalOutlet {
}

type DialogContainer = BasePortalOutlet;

declare class DialogConfig<
  D = unknown,
  R = unknown,
  C extends DialogContainer = BasePortalOutlet
> {
  data?: D | null;
  providers?:
    | StaticProvider[]
    | ((
        dialogRef: R,
        config: DialogConfig<D, R, C>,
        container: C
      ) => StaticProvider[]);
  container?:
    | Type$1<C>
    | {
        type: Type$1<C>;
        providers: (config: DialogConfig<D, R, C>) => StaticProvider[];
      };
}

class DialogRef<R = unknown, C = unknown> {
  readonly config!: DialogConfig<any, DialogRef<R, C>, DialogContainer>;
  readonly componentInstance: C | null = null;
  readonly closed: Observable<R | undefined> = null!;
}

declare class Dialog {
  constructor(...args: unknown[]);
  open<R = unknown, D = unknown, C = unknown>(
    component: ComponentType<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C>;
  open<R = unknown, D = unknown, C = unknown>(
    template: TemplateRef<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C>;
  open<R = unknown, D = unknown, C = unknown>(
    componentOrTemplateRef: ComponentType<C> | TemplateRef<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C>;
}

// mock angular cdk portal directives
interface ComponentType<T> {
  new (...args: any[]): T;
}

// mock rxjs observable
export class Observable<T> {
  subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): {};
  subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): {};
  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null
  ): {} {
    return {};
  }
}

// mock rxjs subscriber
export class Subscriber<T> implements Observer<T> {}

// mock rxjs types
export interface Observer<T> {}
export type TeardownLogic = {} | (() => void) | void;


// Custom code
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

