
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

declare abstract class ComponentFactory$1<C> {

  abstract get selector(): string;

  abstract get componentType(): Type$1<any>;

  abstract get ngContentSelectors(): string[];

  abstract get inputs(): {
    propName: string;
    templateName: string;
    transform?: (value: any) => any;
    isSignal: boolean;
  }[];

  abstract get outputs(): {
    propName: string;
    templateName: string;
  }[];

  abstract create(
    injector: Injector,
    projectableNodes?: any[][],
    rootSelectorOrNode?: string | any,
    environmentInjector?: EnvironmentInjector | NgModuleRef$1<any>
  ): ComponentRef$1<C>;
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

// interface InjectOptions {
//   optional?: boolean;
//   skipSelf?: boolean;
//   self?: boolean;
//   host?: boolean;
// }

// declare enum InjectFlags {
//   Default = 0,
//   Host = 1,
//   Self = 2,
//   SkipSelf = 4,
//   Optional = 8,
// }

interface ValueSansProvider {

  useValue: any;
}

interface ValueProvider extends ValueSansProvider {

  provide: any;

  multi?: boolean;
}

interface ExistingProvider extends ExistingSansProvider {

  provide: any;

  multi?: boolean;
}

interface ExistingSansProvider {

  useExisting: any;
}

interface StaticClassSansProvider {

  useClass: Type$1<any>;

  deps: any[];
}

interface StaticClassProvider extends StaticClassSansProvider {

  provide: any;

  multi?: boolean;
}

interface ConstructorSansProvider {

  deps?: any[];
}

interface ConstructorProvider extends ConstructorSansProvider {

  provide: Type$1<any>;

  multi?: boolean;
}

interface TypeProvider extends Type$1<any> {}
interface ClassSansProvider {

  useClass: Type$1<any>;
}
interface ClassProvider extends ClassSansProvider {

  provide: any;

  multi?: boolean;
}

interface FactorySansProvider {

  useFactory: Function;

  deps?: any[];
}

interface FactoryProvider extends FactorySansProvider {

  provide: any;

  multi?: boolean;
}

type Provider =
  | TypeProvider
  | ValueProvider
  | ClassProvider
  | ConstructorProvider
  | ExistingProvider
  | FactoryProvider
  | any[];

type StaticProvider =
  | ValueProvider
  | ExistingProvider
  | StaticClassProvider
  | ConstructorProvider
  | FactoryProvider
  | any[];

declare abstract class Injector {
  static THROW_IF_NOT_FOUND: {};
  static NULL: Injector;

  // abstract get<T>(
  //   token: ProviderToken<T>,
  //   notFoundValue: undefined,
  //   options: InjectOptions & {
  //     optional?: false;
  //   }
  // ): T;

  // abstract get<T>(
  //   token: ProviderToken<T>,
  //   notFoundValue: null | undefined,
  //   options: InjectOptions
  // ): T | null;

  // abstract get<T>(
  //   token: ProviderToken<T>,
  //   notFoundValue?: T,
  //   options?: InjectOptions | InjectFlags
  // ): T;

  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    // flags?: InjectFlags
  ): T;

  abstract get(token: any, notFoundValue?: any): any;

  static create(providers: StaticProvider[], parent?: Injector): Injector;

  static create(options: {
    providers: Array<Provider | StaticProvider>;
    parent?: Injector;
    name?: string;
  }): Injector;

  static ɵprov: unknown;
}

declare class ElementRef<T = any> {

  nativeElement: T;
  constructor(nativeElement: T);
}

declare abstract class ChangeDetectorRef {
  abstract markForCheck(): void;
  abstract detach(): void;
  abstract detectChanges(): void;
  abstract checkNoChanges(): void;
  abstract reattach(): void;
}

declare abstract class ViewRef$1 extends ChangeDetectorRef {
  abstract destroy(): void;
  abstract get destroyed(): boolean;
  abstract onDestroy(callback: Function): void;
}

declare abstract class EmbeddedViewRef<C> extends ViewRef$1 {
  abstract context: C;
  abstract get rootNodes(): any[];
}

declare abstract class TemplateRef<C> {
  abstract readonly elementRef: ElementRef;
  abstract createEmbeddedView(
    context: C,
    injector?: Injector
  ): EmbeddedViewRef<C>;
}

declare abstract class EnvironmentInjector implements Injector {

  // abstract get<T>(
  //   token: ProviderToken<T>,
  //   notFoundValue: undefined,
  //   options: InjectOptions & {
  //     optional?: false;
  //   }
  // ): T;

  // abstract get<T>(
  //   token: ProviderToken<T>,
  //   notFoundValue: null | undefined,
  //   options: InjectOptions
  // ): T | null;

  // abstract get<T>(
  //   token: ProviderToken<T>,
  //   notFoundValue?: T,
  //   options?: InjectOptions
  // ): T;

  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    // flags?: InjectFlags
  ): T;

  abstract get(token: any, notFoundValue?: any): any;

  abstract runInContext<ReturnT>(fn: () => ReturnT): ReturnT;
  abstract destroy(): void;
}

declare abstract class ComponentFactoryResolver$1 {
  static NULL: ComponentFactoryResolver$1;

  abstract resolveComponentFactory<T>(
    component: Type$1<T>
  ): ComponentFactory$1<T>;
}

declare abstract class NgModuleRef$1<T> {

  abstract get injector(): EnvironmentInjector;

  abstract get componentFactoryResolver(): ComponentFactoryResolver$1;

  abstract get instance(): T;

  abstract destroy(): void;

  abstract onDestroy(callback: () => void): void;
}

abstract class ViewContainerRef {

  abstract get element(): ElementRef;

  abstract get injector(): Injector;

  abstract get parentInjector(): Injector;

  abstract clear(): void;

  abstract get(index: number): ViewRef$1 | null;

  abstract get length(): number;

  abstract createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C,
    options?: {
      index?: number;
      injector?: Injector;
    }
  ): EmbeddedViewRef<C>;

  abstract createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C,
    index?: number
  ): EmbeddedViewRef<C>;

  abstract createComponent<C>(
    componentType: Type$1<C>,
    options?: {
      index?: number;
      injector?: Injector;
      ngModuleRef?: NgModuleRef$1<unknown>;
      environmentInjector?: EnvironmentInjector | NgModuleRef$1<unknown>;
      projectableNodes?: Node[][];
    }
  ): ComponentRef$1<C>;

  abstract createComponent<C>(
    componentFactory: ComponentFactory$1<C>,
    index?: number,
    injector?: Injector,
    projectableNodes?: any[][],
    environmentInjector?: EnvironmentInjector | NgModuleRef$1<any>
  ): ComponentRef$1<C>;

  abstract insert(viewRef: ViewRef$1, index?: number): ViewRef$1;

  abstract move(viewRef: ViewRef$1, currentIndex: number): ViewRef$1;

  abstract indexOf(viewRef: ViewRef$1): number;

  abstract remove(index?: number): void;

  abstract detach(index?: number): ViewRef$1 | null;
}

declare const Type$1: FunctionConstructor;
interface Type$1<T> extends Function {
  new (...args: any[]): T;
}

interface OnDestroy {
  ngOnDestroy(): void;
}

type CtorDependency = {
  attribute?: string | unknown;
  optional?: true;
  host?: true;
  self?: true;
  skipSelf?: true;
} | null;

type ɵɵFactoryDeclaration<
  T,
  CtorDependencies extends CtorDependency[]
> = unknown;

interface ɵɵInjectableDeclaration<T> {
  providedIn:
    | InjectorType<any>
    | 'root'
    | 'platform'
    | 'any'
    | 'environment'
    | null;
  token: unknown;
  factory: (t?: Type$1<any>) => T;
  value: T | undefined;
}

interface InjectorType<T> extends Type$1<T> {
  ɵfac?: unknown;
  ɵinj: unknown;
}

interface ListenerOptions {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
}

declare function inject<T>(token: ProviderToken<T>): T;

export {
  ChangeDetectorRef,
  ComponentFactory$1 as ComponentFactory,
  ComponentFactoryResolver$1 as ComponentFactoryResolver,
  ComponentRef$1 as ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  // InjectFlags,
  InjectionToken,
  Injector,
  NgModuleRef$1 as NgModuleRef,
  TemplateRef,
  Type$1 as Type,
  ViewContainerRef,
  ViewRef$1 as ViewRef,
  ComponentFactory$1 as ɵComponentFactory,
  inject
};
export type {
  AbstractType,
  ClassProvider,
  ClassSansProvider,
  ConstructorProvider,
  ConstructorSansProvider,
  ExistingProvider,
  ExistingSansProvider,
  FactoryProvider,
  FactorySansProvider,
  InjectorType,
  OnDestroy,
  OutputRef,
  OutputRefSubscription,
  Provider,
  ProviderToken,
  StaticClassProvider,
  StaticClassSansProvider,
  StaticProvider,
  TypeProvider,
  ValueProvider,
  ValueSansProvider,
  ɵɵFactoryDeclaration,
  ɵɵInjectableDeclaration,
  ListenerOptions
};
