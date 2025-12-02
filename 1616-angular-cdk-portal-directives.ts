import {
  ComponentRef,
  EmbeddedViewRef,
  ElementRef
} from './1616-angular-core';

declare abstract class Portal<T> { }
interface PortalOutlet { }
interface ComponentType<T> {
    new (...args: any[]): T;
}
declare class ComponentPortal<T> extends Portal<ComponentRef<T>> { }
declare class TemplatePortal<C = any> extends Portal<EmbeddedViewRef<C>> { }
declare class DomPortal<T = HTMLElement> extends Portal<T> {
    readonly element: T;
    constructor(element: T | ElementRef<T>);
}
declare abstract class BasePortalOutlet implements PortalOutlet { }

export { BasePortalOutlet as B, DomPortal as D, Portal as P, TemplatePortal as T, ComponentPortal as a };
export type { ComponentType as C, PortalOutlet as b };
