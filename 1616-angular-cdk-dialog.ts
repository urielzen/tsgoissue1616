import {
  Type,
  StaticProvider,
  ComponentRef,
  TemplateRef,
} from './1616-angular-core';
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
  viewContainerRef?: {};
  injector?: {};
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

export { Dialog, DialogConfig, DialogRef };
