import {
  ComponentRef,
  EmbeddedViewRef,
  TemplateRef,
  ElementRef,
} from './1616-angular-core';

declare abstract class Portal<T> {
  private _attachedHost;
  attach(host: {}): T;
  detach(): void;
  get isAttached(): boolean;
  setAttachedHost(host: {} | null): void;
}


interface ComponentType<T> {
  new (...args: any[]): T;
}

declare class ComponentPortal<T> extends Portal<ComponentRef<T>> {
  component: ComponentType<T>;
  viewContainerRef?: {} | null;
  injector?: {} | null;
  componentFactoryResolver?: any;
  projectableNodes?: Node[][] | null;
  constructor(
    component: ComponentType<T>,
    viewContainerRef?: {} | null,
    injector?: {} | null,
    _componentFactoryResolver?: any,
    projectableNodes?: Node[][] | null
  );
}

declare class TemplatePortal<C = any> extends Portal<EmbeddedViewRef<C>> {
  templateRef: TemplateRef<C>;
  viewContainerRef: {};
  context?: C | undefined;
  injector?: {} | undefined;
  constructor(
    templateRef: TemplateRef<C>,
    viewContainerRef: {},
    context?: C | undefined,
    injector?: {} | undefined
  );
  get origin(): ElementRef;

  attach(host: {}, context?: C | undefined): EmbeddedViewRef<C>;
  detach(): void;
}

declare class DomPortal<T = HTMLElement> extends Portal<T> {
  readonly element: T;
  constructor(element: T | ElementRef<T>);
}

declare abstract class BasePortalOutlet {
  _attachedPortal: Portal<any> | null;
  hasAttached(): boolean;
  attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  attach(portal: any): any;
  abstract attachComponentPortal<T>(
    portal: ComponentPortal<T>
  ): ComponentRef<T>;
  abstract attachTemplatePortal<C>(
    portal: TemplatePortal<C>
  ): EmbeddedViewRef<C>;
  readonly attachDomPortal: null | ((portal: DomPortal) => any);
  detach(): void;
  dispose(): void;
  setDisposeFn(fn: () => void): void;
  private _invokeDisposeFn;
}

export {
  BasePortalOutlet as B,
  DomPortal as D,
  Portal as P,
  TemplatePortal as T,
  ComponentPortal as a,
};
export type { ComponentType as C };
