import * as i0 from './1616-angular-core';
import {
  Injector,
  Type,
  ViewContainerRef,
  StaticProvider,
  ComponentRef,
  TemplateRef,
} from './1616-angular-core';
import { Subject } from './1616-rxjs-subject';
import {
  B as BasePortalOutlet,
  C as ComponentType,
} from './1616-angular-cdk-portal-directives';
import { Observable } from './1616-rxjs-observable';
import {
  b as OverlayRef,
} from './1616-angular-cdk-overlay-module';

type DialogContainer = BasePortalOutlet;

declare class DialogConfig<
  D = unknown,
  R = unknown,
  C extends DialogContainer = BasePortalOutlet
> {
  viewContainerRef?: ViewContainerRef;
  injector?: Injector;
  data?: D | null;
  componentFactoryResolver?: unknown;
  providers?:
    | StaticProvider[]
    | ((
        dialogRef: R,
        config: DialogConfig<D, R, C>,
        container: C
      ) => StaticProvider[]);
  container?:
    | Type<C>
    | {
        type: Type<C>;
        providers: (config: DialogConfig<D, R, C>) => StaticProvider[];
      };
  templateContext?: Record<string, any> | (() => Record<string, any>);
}

class DialogRef<R = unknown, C = unknown> {
  readonly overlayRef!: OverlayRef;
  readonly config!: DialogConfig<any, DialogRef<R, C>, DialogContainer>;
  readonly componentInstance: C | null = null;
  readonly componentRef: ComponentRef<C> | null = null;
  readonly containerInstance: DialogContainer = null!;
  readonly closed: Observable<R | undefined> = null!;
  readonly backdropClick: any;
  readonly keydownEvents: any;

  readonly outsidePointerEvents: any;
  readonly id: string = '';
  disableClose: boolean | undefined;

  close(result?: R): void {}
}

declare class Dialog {
  private _overlay;
  private _injector;
  private _defaultOptions;
  private _parentDialog;
  private _overlayContainer;
  private _idGenerator;
  private _openDialogsAtThisLevel;
  private readonly _afterAllClosedAtThisLevel;
  private readonly _afterOpenedAtThisLevel;
  private _ariaHiddenElements;
  private _scrollStrategy;

  get openDialogs(): readonly DialogRef<any, any>[];

  get afterOpened(): Subject<DialogRef<any, any>>;

  readonly afterAllClosed: Observable<void>;
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

  closeAll(): void;

  getDialogById<R, C>(id: string): DialogRef<R, C> | undefined;

  static ɵfac: i0.ɵɵFactoryDeclaration<Dialog, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<Dialog>;
}

export { Dialog, DialogConfig, DialogRef };
export type {};
