interface AbstractType<T> extends Function {
  prototype: T;
}

interface OutputRefSubscription {
  unsubscribe(): void;
}

interface OutputRef<T> {
  subscribe(callback: (value: T) => void): OutputRefSubscription;
}

declare abstract class ComponentRef$1<C> {
}

declare class InjectionToken<T> {
  protected _desc: string;
  readonly ɵprov: unknown;

  constructor(
    _desc: string,
    options?: {
      providedIn?: Type$1<any> | 'root' | 'platform' | 'any' | null;
      factory: () => T;
    }
  );
  toString(): string;
}

type ProviderToken<T> = Type$1<T> | AbstractType<T> | InjectionToken<T>;

interface TypeProvider extends Type$1<any> {}

type Provider =
  | TypeProvider
  | {}
  | any[];

type StaticProvider =
  | {}
  | any[];

declare class ElementRef<T = any> {
  nativeElement: T;
  constructor(nativeElement: T);
}


declare abstract class EmbeddedViewRef<C> {
  abstract context: C;
  abstract get rootNodes(): any[];
}

declare abstract class TemplateRef<C> {
  abstract readonly elementRef: ElementRef;
}

declare abstract class EnvironmentInjector {
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
  ): T;
}

declare abstract class ComponentFactoryResolver$1 {
}

declare abstract class NgModuleRef$1<T> {

}

declare const Type$1: FunctionConstructor;
interface Type$1<T> extends Function {
  new (...args: any[]): T;
}

interface InjectorType<T> extends Type$1<T> {
  ɵfac?: unknown;
  ɵinj: unknown;
}

declare function inject<T>(token: ProviderToken<T>): T;

export {
  ComponentFactoryResolver$1 as ComponentFactoryResolver,
  ComponentRef$1 as ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  InjectionToken,
  NgModuleRef$1 as NgModuleRef,
  TemplateRef,
  Type$1 as Type,
  inject
};
export type {
  AbstractType,
  InjectorType,
  OutputRef,
  OutputRefSubscription,
  Provider,
  ProviderToken,
  StaticProvider,
  TypeProvider
};
