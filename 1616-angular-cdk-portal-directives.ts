import {
  ComponentRef,
  ViewContainerRef,
  Injector,
  EmbeddedViewRef,
  TemplateRef,
  ElementRef
} from './1616-angular-core';

declare abstract class Portal<T> {
  private _attachedHost;
  /** Attach this portal to a host. */
  attach(host: PortalOutlet): T;
  /** Detach this portal from its host */
  detach(): void;
  /** Whether this portal is attached to a host. */
  get isAttached(): boolean;
  /**
   * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
   * the PortalOutlet when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host: PortalOutlet | null): void;
}

interface PortalOutlet {
  /** Attaches a portal to this outlet. */
  attach(portal: Portal<any>): any;
  /** Detaches the currently attached portal from this outlet. */
  detach(): any;
  /** Performs cleanup before the outlet is destroyed. */
  dispose(): void;
  /** Whether there is currently a portal attached to this outlet. */
  hasAttached(): boolean;
}

interface ComponentType<T> {
    new (...args: any[]): T;
}

declare class ComponentPortal<T> extends Portal<ComponentRef<T>> {
  /** The type of the component that will be instantiated for attachment. */
  component: ComponentType<T>;
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the PortalOutlet.
   * The origin is necessary when the host is outside of the Angular application context.
   */
  viewContainerRef?: ViewContainerRef | null;
  /** Injector used for the instantiation of the component. */
  injector?: Injector | null;
  /**
   * @deprecated No longer in use. To be removed.
   * @breaking-change 18.0.0
   */
  componentFactoryResolver?: any;
  /**
   * List of DOM nodes that should be projected through `<ng-content>` of the attached component.
   */
  projectableNodes?: Node[][] | null;
  constructor(
    component: ComponentType<T>,
    viewContainerRef?: ViewContainerRef | null,
    injector?: Injector | null,
    /**
     * @deprecated No longer in use. To be removed.
     * @breaking-change 18.0.0
     */
    _componentFactoryResolver?: any,
    projectableNodes?: Node[][] | null
  );
}

declare class TemplatePortal<C = any> extends Portal<EmbeddedViewRef<C>> {
    /** The embedded template that will be used to instantiate an embedded View in the host. */
    templateRef: TemplateRef<C>;
    /** Reference to the ViewContainer into which the template will be stamped out. */
    viewContainerRef: ViewContainerRef;
    /** Contextual data to be passed in to the embedded view. */
    context?: C | undefined;
    /** The injector to use for the embedded view. */
    injector?: Injector | undefined;
    constructor(
    /** The embedded template that will be used to instantiate an embedded View in the host. */
    templateRef: TemplateRef<C>,
    /** Reference to the ViewContainer into which the template will be stamped out. */
    viewContainerRef: ViewContainerRef,
    /** Contextual data to be passed in to the embedded view. */
    context?: C | undefined,
    /** The injector to use for the embedded view. */
    injector?: Injector | undefined);
    get origin(): ElementRef;
    /**
     * Attach the portal to the provided `PortalOutlet`.
     * When a context is provided it will override the `context` property of the `TemplatePortal`
     * instance.
     */
    attach(host: PortalOutlet, context?: C | undefined): EmbeddedViewRef<C>;
    detach(): void;
}

declare class DomPortal<T = HTMLElement> extends Portal<T> {
    /** DOM node hosting the portal's content. */
    readonly element: T;
    constructor(element: T | ElementRef<T>);
}

declare abstract class BasePortalOutlet implements PortalOutlet {
  /** The portal currently attached to the host. */
  _attachedPortal: Portal<any> | null;
  /** A function that will permanently dispose this host. */
  private _disposeFn;
  /** Whether this host has already been permanently disposed. */
  private _isDisposed;
  /** Whether this host has an attached portal. */
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
  /** Detaches a previously attached portal. */
  detach(): void;
  /** Permanently dispose of this portal host. */
  dispose(): void;
  /** @docs-private */
  setDisposeFn(fn: () => void): void;
  private _invokeDisposeFn;
}

export { BasePortalOutlet as B, DomPortal as D, Portal as P, TemplatePortal as T, ComponentPortal as a };
export type { ComponentType as C, PortalOutlet as b };
