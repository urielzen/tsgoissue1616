import { Subject } from './1616-rxjs-subject';
import { Subscription } from './1616-rxjs-subscription';

interface AbstractType<T> extends Function {
  prototype: T;
}

interface OutputRefSubscription {
  unsubscribe(): void;
}

interface OutputRef<T> {
  /**
   * Registers a callback that is invoked whenever the output
   * emits a new value of type `T`.
   *
   * Angular will automatically clean up the subscription when
   * the directive/component of the output is destroyed.
   */
  subscribe(callback: (value: T) => void): OutputRefSubscription;
}

interface EventEmitter<T> extends Subject<T>, OutputRef<T> {
  /**
   * Creates an instance of this class that can
   * deliver events synchronously or asynchronously.
   *
   * @param [isAsync=false] When true, deliver events asynchronously.
   *
   */
  new (isAsync?: boolean): EventEmitter<T>;
  /**
   * Emits an event containing a given value.
   * @param value The value to emit.
   */
  emit(value?: T): void;
  /**
   * Registers handlers for events emitted by this instance.
   * @param next When supplied, a custom handler for emitted events.
   * @param error When supplied, a custom handler for an error notification from this emitter.
   * @param complete When supplied, a custom handler for a completion notification from this
   *     emitter.
   */
  subscribe(
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription;
  /**
   * Registers handlers for events emitted by this instance.
   * @param observerOrNext When supplied, a custom handler for emitted events, or an observer
   *     object.
   * @param error When supplied, a custom handler for an error notification from this emitter.
   * @param complete When supplied, a custom handler for a completion notification from this
   *     emitter.
   */
  subscribe(observerOrNext?: any, error?: any, complete?: any): Subscription;
}
declare const EventEmitter: {
  new (isAsync?: boolean): EventEmitter<any>;
  new <T>(isAsync?: boolean): EventEmitter<T>;
  readonly prototype: EventEmitter<any>;
};

declare abstract class ComponentRef$1<C> {
  /**
   * Updates a specified input name to a new value. Using this method will properly mark for check
   * component using the `OnPush` change detection strategy. It will also assure that the
   * `OnChanges` lifecycle hook runs when a dynamically created component is change-detected.
   *
   * @param name The name of an input.
   * @param value The new value of an input.
   */
  abstract setInput(name: string, value: unknown): void;
  /**
   * The host or anchor element for this component instance.
   */
  abstract get location(): ElementRef;
  /**
   * The dependency injector for this component instance.
   */
  abstract get injector(): Injector;
  /**
   * This component instance.
   */
  abstract get instance(): C;
  /**
   * The host view defined by the template
   * for this component instance.
   */
  abstract get hostView(): ViewRef$1;
  /**
   * The change detector for this component instance.
   */
  abstract get changeDetectorRef(): ChangeDetectorRef;
  /**
   * The type of this component (as created by a `ComponentFactory` class).
   */
  abstract get componentType(): Type$1<any>;
  /**
   * Destroys the component instance and all of the data structures associated with it.
   */
  abstract destroy(): void;
  /**
   * A lifecycle hook that provides additional developer-defined cleanup
   * functionality for the component.
   * @param callback A handler function that cleans up developer-defined data
   * associated with this component. Called when the `destroy()` method is invoked.
   */
  abstract onDestroy(callback: Function): void;
}

declare abstract class ComponentFactory$1<C> {
  /**
   * The component's HTML selector.
   */
  abstract get selector(): string;
  /**
   * The type of component the factory will create.
   */
  abstract get componentType(): Type$1<any>;
  /**
   * Selector for all <ng-content> elements in the component.
   */
  abstract get ngContentSelectors(): string[];
  /**
   * The inputs of the component.
   */
  abstract get inputs(): {
    propName: string;
    templateName: string;
    transform?: (value: any) => any;
    isSignal: boolean;
  }[];
  /**
   * The outputs of the component.
   */
  abstract get outputs(): {
    propName: string;
    templateName: string;
  }[];
  /**
   * Creates a new component.
   */
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
  /**
   * @param _desc   Description for the token,
   *                used only for debugging purposes,
   *                it should but does not need to be unique
   * @param options Options for the token's usage, as described above
   */
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

interface InjectOptions {
  optional?: boolean;
  skipSelf?: boolean;
  self?: boolean;
  host?: boolean;
}

declare enum InjectFlags {
  Default = 0,
  Host = 1,
  Self = 2,
  SkipSelf = 4,
  Optional = 8,
}

interface ValueSansProvider {
  /**
   * The value to inject.
   */
  useValue: any;
}

interface ValueProvider extends ValueSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   */
  provide: any;
  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   */
  multi?: boolean;
}

interface ExistingProvider extends ExistingSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   */
  provide: any;
  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   */
  multi?: boolean;
}

interface ExistingSansProvider {
  /**
   * Existing `token` to return. (Equivalent to `injector.get(useExisting)`)
   */
  useExisting: any;
}

interface StaticClassSansProvider {
  /**
   * An optional class to instantiate for the `token`. By default, the `provide`
   * class is instantiated.
   */
  useClass: Type$1<any>;
  /**
   * A list of `token`s to be resolved by the injector. The list of values is then
   * used as arguments to the `useClass` constructor.
   */
  deps: any[];
}

interface StaticClassProvider extends StaticClassSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   */
  provide: any;
  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   */
  multi?: boolean;
}

interface ConstructorSansProvider {
  /**
   * A list of `token`s to be resolved by the injector.
   */
  deps?: any[];
}

interface ConstructorProvider extends ConstructorSansProvider {
  /**
   * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
   */
  provide: Type$1<any>;
  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   */
  multi?: boolean;
}

interface TypeProvider extends Type$1<any> {}
interface ClassSansProvider {
  /**
   * Class to instantiate for the `token`.
   */
  useClass: Type$1<any>;
}
interface ClassProvider extends ClassSansProvider {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   */
  provide: any;
  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   */
  multi?: boolean;
}

interface FactorySansProvider {
  /**
   * A function to invoke to create a value for this `token`. The function is invoked with
   * resolved values of `token`s in the `deps` field.
   */
  useFactory: Function;
  /**
   * A list of `token`s to be resolved by the injector. The list of values is then
   * used as arguments to the `useFactory` function.
   */
  deps?: any[];
}

interface FactoryProvider extends FactorySansProvider {
  /**
   * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
   */
  provide: any;
  /**
   * When true, injector returns an array of instances. This is useful to allow multiple
   * providers spread across many files to provide configuration information to a common token.
   */
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
  /**
   * Internal note on the `options?: InjectOptions|InjectFlags` override of the `get`
   * method: consider dropping the `InjectFlags` part in one of the major versions.
   * It can **not** be done in minor/patch, since it's breaking for custom injectors
   * that only implement the old `InjectorFlags` interface.
   */
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue: undefined,
    options: InjectOptions & {
      optional?: false;
    }
  ): T;
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue: null | undefined,
    options: InjectOptions
  ): T | null;
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    options?: InjectOptions | InjectFlags
  ): T;
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   * @deprecated use object-based flags (`InjectOptions`) instead.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  /**
   * @deprecated from v4.0.0 use ProviderToken<T>
   * @suppress {duplicate}
   */
  abstract get(token: any, notFoundValue?: any): any;
  /**
   * @deprecated from v5 use the new signature Injector.create(options)
   */
  static create(providers: StaticProvider[], parent?: Injector): Injector;
  /**
   * Creates a new injector instance that provides one or more dependencies,
   * according to a given type or types of `StaticProvider`.
   *
   * @param options An object with the following properties:
   * * `providers`: An array of providers of the [StaticProvider type](api/core/StaticProvider).
   * * `parent`: (optional) A parent injector.
   * * `name`: (optional) A developer-defined identifying name for the new injector.
   *
   * @returns The new injector instance.
   *
   */
  static create(options: {
    providers: Array<Provider | StaticProvider>;
    parent?: Injector;
    name?: string;
  }): Injector;
  /** @nocollapse */
  static ɵprov: unknown;
}

declare class ElementRef<T = any> {
  /**
   * <div class="docs-alert docs-alert-important">
   *   <header>Use with caution</header>
   *   <p>
   *    Use this API as the last resort when direct access to DOM is needed. Use templating and
   *    data-binding provided by Angular instead. If used, it is recommended in combination with
   *    {@link /best-practices/security#direct-use-of-the-dom-apis-and-explicit-sanitization-calls DomSanitizer}
   *    for maxiumum security;
   *   </p>
   * </div>
   */
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
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue: undefined,
    options: InjectOptions & {
      optional?: false;
    }
  ): T;
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue: null | undefined,
    options: InjectOptions
  ): T | null;
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    options?: InjectOptions
  ): T;
  /**
   * Retrieves an instance from the injector based on the provided token.
   * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
   * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
   * @deprecated use object-based flags (`InjectOptions`) instead.
   */
  abstract get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  /**
   * @deprecated from v4.0.0 use ProviderToken<T>
   * @suppress {duplicate}
   */
  abstract get(token: any, notFoundValue?: any): any;
  /**
   * Runs the given function in the context of this `EnvironmentInjector`.
   *
   * Within the function's stack frame, [`inject`](api/core/inject) can be used to inject
   * dependencies from this injector. Note that `inject` is only usable synchronously, and cannot be
   * used in any asynchronous callbacks or after any `await` points.
   *
   * @param fn the closure to be run in the context of this injector
   * @returns the return value of the function, if any
   * @deprecated use the standalone function `runInInjectionContext` instead
   */
  abstract runInContext<ReturnT>(fn: () => ReturnT): ReturnT;
  abstract destroy(): void;
}

declare abstract class ComponentFactoryResolver$1 {
  static NULL: ComponentFactoryResolver$1;
  /**
   * Retrieves the factory object that creates a component of the given type.
   * @param component The component type.
   */
  abstract resolveComponentFactory<T>(
    component: Type$1<T>
  ): ComponentFactory$1<T>;
}

declare abstract class NgModuleRef$1<T> {
  /**
   * The injector that contains all of the providers of the `NgModule`.
   */
  abstract get injector(): EnvironmentInjector;
  /**
   * The resolver that can retrieve component factories in a context of this module.
   *
   * Note: since v13, dynamic component creation via
   * [`ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)
   * does **not** require resolving component factory: component class can be used directly.
   *
   * @deprecated Angular no longer requires Component factories. Please use other APIs where
   *     Component class can be used directly.
   */
  abstract get componentFactoryResolver(): ComponentFactoryResolver$1;
  /**
   * The `NgModule` instance.
   */
  abstract get instance(): T;
  /**
   * Destroys the module instance and all of the data structures associated with it.
   */
  abstract destroy(): void;
  /**
   * Registers a callback to be executed when the module is destroyed.
   */
  abstract onDestroy(callback: () => void): void;
}

abstract class ViewContainerRef {
  /**
   * Anchor element that specifies the location of this container in the containing view.
   * Each view container can have only one anchor element, and each anchor element
   * can have only a single view container.
   *
   * Root elements of views attached to this container become siblings of the anchor element in
   * the rendered view.
   *
   * Access the `ViewContainerRef` of an element by placing a `Directive` injected
   * with `ViewContainerRef` on the element, or use a `ViewChild` query.
   *
   * <!-- TODO: rename to anchorElement -->
   */
  abstract get element(): ElementRef;
  /**
   * The dependency injector for this view container.
   */
  abstract get injector(): Injector;
  /** @deprecated No replacement */
  abstract get parentInjector(): Injector;
  /**
   * Destroys all views in this container.
   */
  abstract clear(): void;
  /**
   * Retrieves a view from this container.
   * @param index The 0-based index of the view to retrieve.
   * @returns The `ViewRef` instance, or null if the index is out of range.
   */
  abstract get(index: number): ViewRef$1 | null;
  /**
   * Reports how many views are currently attached to this container.
   * @returns The number of views.
   */
  abstract get length(): number;
  /**
   * Instantiates an embedded view and inserts it
   * into this container.
   * @param templateRef The HTML template that defines the view.
   * @param context The data-binding context of the embedded view, as declared
   * in the `<ng-template>` usage.
   * @param options Extra configuration for the created view. Includes:
   *  * index: The 0-based index at which to insert the new view into this container.
   *           If not specified, appends the new view as the last entry.
   *  * injector: Injector to be used within the embedded view.
   *
   * @returns The `ViewRef` instance for the newly created view.
   */
  abstract createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C,
    options?: {
      index?: number;
      injector?: Injector;
    }
  ): EmbeddedViewRef<C>;
  /**
   * Instantiates an embedded view and inserts it
   * into this container.
   * @param templateRef The HTML template that defines the view.
   * @param context The data-binding context of the embedded view, as declared
   * in the `<ng-template>` usage.
   * @param index The 0-based index at which to insert the new view into this container.
   * If not specified, appends the new view as the last entry.
   *
   * @returns The `ViewRef` instance for the newly created view.
   */
  abstract createEmbeddedView<C>(
    templateRef: TemplateRef<C>,
    context?: C,
    index?: number
  ): EmbeddedViewRef<C>;
  /**
   * Instantiates a component and inserts its host view into this view container.
   *
   * @param componentType Component Type to use.
   * @param options An object that contains extra parameters:
   *  * index: the index at which to insert the new component's host view into this container.
   *           If not specified, appends the new view as the last entry.
   *  * injector: the injector to use as the parent for the new component.
   *  * ngModuleRef: an NgModuleRef of the component's NgModule, you should almost always provide
   *                 this to ensure that all expected providers are available for the component
   *                 instantiation.
   *  * environmentInjector: an EnvironmentInjector which will provide the component's environment.
   *                 you should almost always provide this to ensure that all expected providers
   *                 are available for the component instantiation. This option is intended to
   *                 replace the `ngModuleRef` parameter.
   *  * projectableNodes: list of DOM nodes that should be projected through
   *                      [`<ng-content>`](api/core/ng-content) of the new component instance.
   *
   * @returns The new `ComponentRef` which contains the component instance and the host view.
   */
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
  /**
   * Instantiates a single component and inserts its host view into this container.
   *
   * @param componentFactory Component factory to use.
   * @param index The index at which to insert the new component's host view into this container.
   * If not specified, appends the new view as the last entry.
   * @param injector The injector to use as the parent for the new component.
   * @param projectableNodes List of DOM nodes that should be projected through
   *     [`<ng-content>`](api/core/ng-content) of the new component instance.
   * @param ngModuleRef An instance of the NgModuleRef that represent an NgModule.
   * This information is used to retrieve corresponding NgModule injector.
   *
   * @returns The new `ComponentRef` which contains the component instance and the host view.
   *
   * @deprecated Angular no longer requires component factories to dynamically create components.
   *     Use different signature of the `createComponent` method, which allows passing
   *     Component class directly.
   */
  abstract createComponent<C>(
    componentFactory: ComponentFactory$1<C>,
    index?: number,
    injector?: Injector,
    projectableNodes?: any[][],
    environmentInjector?: EnvironmentInjector | NgModuleRef$1<any>
  ): ComponentRef$1<C>;
  /**
   * Inserts a view into this container.
   * @param viewRef The view to insert.
   * @param index The 0-based index at which to insert the view.
   * If not specified, appends the new view as the last entry.
   * @returns The inserted `ViewRef` instance.
   *
   */
  abstract insert(viewRef: ViewRef$1, index?: number): ViewRef$1;
  /**
   * Moves a view to a new location in this container.
   * @param viewRef The view to move.
   * @param index The 0-based index of the new location.
   * @returns The moved `ViewRef` instance.
   */
  abstract move(viewRef: ViewRef$1, currentIndex: number): ViewRef$1;
  /**
   * Returns the index of a view within the current container.
   * @param viewRef The view to query.
   * @returns The 0-based index of the view's position in this container,
   * or `-1` if this container doesn't contain the view.
   */
  abstract indexOf(viewRef: ViewRef$1): number;
  /**
   * Destroys a view attached to this container
   * @param index The 0-based index of the view to destroy.
   * If not specified, the last view in the container is removed.
   */
  abstract remove(index?: number): void;
  /**
   * Detaches a view from this container without destroying it.
   * Use along with `insert()` to move a view within the current container.
   * @param index The 0-based index of the view to detach.
   * If not specified, the last view in the container is detached.
   */
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

declare class NgZone {
  readonly hasPendingMacrotasks: boolean;
  readonly hasPendingMicrotasks: boolean;
  /**
   * Whether there are no outstanding microtasks or macrotasks.
   */
  readonly isStable: boolean;
  /**
   * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
   */
  readonly onUnstable: EventEmitter<any>;
  /**
   * Notifies when there is no more microtasks enqueued in the current VM Turn.
   * This is a hint for Angular to do change detection, which may enqueue more microtasks.
   * For this reason this event can fire multiple times per VM Turn.
   */
  readonly onMicrotaskEmpty: EventEmitter<any>;
  /**
   * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
   * implies we are about to relinquish VM turn.
   * This event gets called just once.
   */
  readonly onStable: EventEmitter<any>;
  /**
   * Notifies that an error has been delivered.
   */
  readonly onError: EventEmitter<any>;
  constructor(options: {
    enableLongStackTrace?: boolean;
    shouldCoalesceEventChangeDetection?: boolean;
    shouldCoalesceRunChangeDetection?: boolean;
  });
  /**
      This method checks whether the method call happens within an Angular Zone instance.
    */
  static isInAngularZone(): boolean;
  /**
      Assures that the method is called within the Angular Zone, otherwise throws an error.
    */
  static assertInAngularZone(): void;
  /**
      Assures that the method is called outside of the Angular Zone, otherwise throws an error.
    */
  static assertNotInAngularZone(): void;
  /**
   * Executes the `fn` function synchronously within the Angular zone and returns value returned by
   * the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T;
  /**
   * Executes the `fn` function synchronously within the Angular zone as a task and returns value
   * returned by the function.
   *
   * Running functions via `runTask` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  runTask<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[],
    name?: string
  ): T;
  /**
   * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
   * rethrown.
   */
  runGuarded<T>(
    fn: (...args: any[]) => T,
    applyThis?: any,
    applyArgs?: any[]
  ): T;
  /**
   * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
   * the function.
   *
   * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
   * work that
   * doesn't trigger Angular change-detection or is subject to Angular's error handling.
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * outside of the Angular zone.
   *
   * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
   */
  runOutsideAngular<T>(fn: (...args: any[]) => T): T;
}



interface ListenerOptions {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
}




declare enum RendererStyleFlags2 {
    /**
     * Marks a style as important.
     */
    Important = 1,
    /**
     * Marks a style as using dash case naming (this-is-dash-case).
     */
    DashCase = 2
}

declare function inject<T>(token: ProviderToken<T>): T;
declare function inject<T>(token: ProviderToken<T>, flags?: InjectFlags): T | null;
declare function inject<T>(token: ProviderToken<T>, options: InjectOptions & {
    optional?: false;
}): T;
declare function inject<T>(token: ProviderToken<T>, options: InjectOptions): T | null;
declare function inject(token: HostAttributeToken): string;
declare function inject(token: HostAttributeToken, options: {
    optional: true;
}): string | null;
declare function inject(token: HostAttributeToken, options: {
    optional: false;
}): string;

declare class HostAttributeToken {
    private attributeName;
    constructor(attributeName: string);
    toString(): string;
}

export {
  ChangeDetectorRef,
  ComponentFactory$1 as ComponentFactory,
  ComponentFactoryResolver$1 as ComponentFactoryResolver,
  ComponentRef$1 as ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  EventEmitter,
  InjectFlags,
  InjectionToken,
  Injector,
  NgModuleRef$1 as NgModuleRef,
  NgZone,
  TemplateRef,
  Type$1 as Type,
  ViewContainerRef,
  ViewRef$1 as ViewRef,
  ComponentFactory$1 as ɵComponentFactory,
  RendererStyleFlags2,
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
  InjectOptions,
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
