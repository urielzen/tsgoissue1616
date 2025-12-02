
// Mocks for Angular/CDK types

interface Unsubscribable {
  unsubscribe(): void;
}

interface SubscriptionLike extends Unsubscribable {
  unsubscribe(): void;
  readonly closed: boolean;
}

type TeardownLogic = Subscription | Unsubscribable | (() => void) | void;


class Subscription implements SubscriptionLike {
  public static EMPTY = (() => {
    const empty = new Subscription();
    empty.closed = true;
    return empty;
  })();

  public closed = false;

  private _parentage: Subscription[] | Subscription | null = null;


  private _finalizers: Exclude<TeardownLogic, void>[] | null = null;

  constructor(private initialTeardown?: () => void) {}

  unsubscribe(): void {
  }


  add(teardown: TeardownLogic): void {

  }

  private _hasParent(parent: Subscription) {
    const { _parentage } = this;
    return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
  }

  private _addParent(parent: Subscription) {
    const { _parentage } = this;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  }

  private _removeParent(parent: Subscription) {

  }

  remove(teardown: Exclude<TeardownLogic, void>): void {

  }
}

type ObservableNotification<T> = NextNotification<T> | ErrorNotification | CompleteNotification;
interface NextNotification<T> {
  kind: 'N';
  value: T;
}
interface ErrorNotification {
  kind: 'E';
  error: any;
}
interface CompleteNotification {
  kind: 'C';
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

class Subscriber<T> extends Subscription implements Observer<T> {
  static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T> {
    return new SafeSubscriber(next, error, complete);
  }
  protected isStopped: boolean = false;
  constructor(destination?: Subscriber<any> | Observer<any>) {
    super();
  }
  next(value: T): void {
  }
  error(err?: any): void {
  }
  complete(): void {
  }
  override unsubscribe(): void {
  }
  protected _next(value: T): void {
  }
  protected _error(err: any): void {
  }
  protected _complete(): void {
  }
}


export class SafeSubscriber<T> extends Subscriber<T> {
  constructor(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((e?: any) => void) | null,
    complete?: (() => void) | null
  ) {
    super();
  }
}

interface GlobalConfig {
  onUnhandledError: ((err: any) => void) | null;
  onStoppedNotification: ((notification: ObservableNotification<any>, subscriber: Subscriber<any>) => void) | null;
  Promise?: PromiseConstructorLike;
  useDeprecatedSynchronousErrorHandling: boolean;
  useDeprecatedNextContext: boolean;
}

const config: GlobalConfig = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: undefined,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false,
}


interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}

interface Subscribable<T> {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable;
}

class Observable<T> implements Subscribable<T> {
  source: Observable<any> | undefined;
  operator: Operator<any, T> | undefined;
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  // HACK: Since TypeScript inherits static properties too, we have to
  // fight against TypeScript here so Subject can have a different static create signature
  static create: (...args: any[]) => any = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
    return new Observable<T>(subscribe);
  };
  lift<R>(operator?: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
  subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null
  ): Subscription {
    const subscriber = new SafeSubscriber(observerOrNext, error, complete);
    return subscriber;
  }

  protected _trySubscribe(sink: Subscriber<T>): TeardownLogic {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  }
  forEach(next: (value: T) => void): Promise<void>;
  forEach(next: (value: T) => void, promiseCtor: PromiseConstructorLike): Promise<void>;
  forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void> {
    return {} as Promise<void>;
  }
  protected _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    return this.source?.subscribe(subscriber);
  }

}

 interface Observable<T> {
    subscribe(next?: (value: T) => void): void;
}

interface AbstractType<T> extends Function {
    prototype: T;
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
    constructor(_desc: string, options?: {
        providedIn?: Type$1<any> | 'root' | 'platform' | 'any' | null;
        factory: () => T;
    });
    toString(): string;
}

type ProviderToken<T> = Type$1<T> | AbstractType<T> | InjectionToken<T>;

interface InjectOptions {
    /**
     * Use optional injection, and return `null` if the requested token is not found.
     */
    optional?: boolean;
    /**
     * Start injection at the parent of the current injector.
     */
    skipSelf?: boolean;
    /**
     * Only query the current injector for the token, and don't fall back to the parent injector if
     * it's not found.
     */
    self?: boolean;
    /**
     * Stop injection at the host component's injector. Only relevant when injecting from an element
     * injector, and a no-op for environment injectors.
     */
    host?: boolean;
}

declare enum InjectFlags {
    /** Check self and check parent injector if needed */
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8
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

type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | any[];
interface TypeProvider extends Type$1<any> {
}
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
type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[];

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
    abstract get<T>(token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions & {
        optional?: false;
    }): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions): T | null;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions | InjectFlags): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     * @deprecated use object-based flags (`InjectOptions`) instead.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
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

declare abstract class EnvironmentInjector implements Injector {
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions & {
        optional?: false;
    }): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions): T | null;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions): T;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     * @deprecated use object-based flags (`InjectOptions`) instead.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
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
    abstract create(injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string | any, environmentInjector?: EnvironmentInjector | NgModuleRef$1<any>): ComponentRef$1<C>;
}

declare abstract class ComponentFactoryResolver$1 {
    static NULL: ComponentFactoryResolver$1;
    /**
     * Retrieves the factory object that creates a component of the given type.
     * @param component The component type.
     */
    abstract resolveComponentFactory<T>(component: Type$1<T>): ComponentFactory$1<T>;
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
    abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, options?: {
        index?: number;
        injector?: Injector;
    }): EmbeddedViewRef<C>;
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
    abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
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
    abstract createComponent<C>(componentType: Type$1<C>, options?: {
        index?: number;
        injector?: Injector;
        ngModuleRef?: NgModuleRef$1<unknown>;
        environmentInjector?: EnvironmentInjector | NgModuleRef$1<unknown>;
        projectableNodes?: Node[][];
    }): ComponentRef$1<C>;
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
    abstract createComponent<C>(componentFactory: ComponentFactory$1<C>, index?: number, injector?: Injector, projectableNodes?: any[][], environmentInjector?: EnvironmentInjector | NgModuleRef$1<any>): ComponentRef$1<C>;
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
    constructor(component: ComponentType<T>, viewContainerRef?: ViewContainerRef | null, injector?: Injector | null,
    /**
     * @deprecated No longer in use. To be removed.
     * @breaking-change 18.0.0
     */
    _componentFactoryResolver?: any, projectableNodes?: Node[][] | null);
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
    protected _attachedPortal: Portal<any> | null;
    /** A function that will permanently dispose this host. */
    private _disposeFn;
    /** Whether this host has already been permanently disposed. */
    private _isDisposed;
    /** Whether this host has an attached portal. */
    hasAttached(): boolean;
    attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
    attach(portal: any): any;
    abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    abstract attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    readonly attachDomPortal: null | ((portal: DomPortal) => any);
    /** Detaches a previously attached portal. */
    detach(): void;
    /** Permanently dispose of this portal host. */
    dispose(): void;
    /** @docs-private */
    setDisposeFn(fn: () => void): void;
    private _invokeDisposeFn;
}

type FocusOrigin = 'touch' | 'mouse' | 'keyboard' | 'program' | null;
type Direction = 'ltr' | 'rtl';
/**
 * The directionality (LTR / RTL) context for the application (or a subtree of it).
 * Exposes the current direction and a stream of direction changes.
 */
declare class Directionality implements OnDestroy {
    /** The current 'ltr' or 'rtl' value. */
    readonly value: Direction;
    /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
    readonly change: EventEmitter<Direction>;
    constructor(...args: unknown[]);
    ngOnDestroy(): void;
    static ɵfac: ɵɵFactoryDeclaration<Directionality, never>;
    static ɵprov: ɵɵInjectableDeclaration<Directionality>;
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
    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
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
interface ScrollStrategy {
    /** Enable this scroll strategy (called when the attached overlay is attached to a portal). */
    enable: () => void;
    /** Disable this scroll strategy (called when the attached overlay is detached from a portal). */
    disable: () => void;
    /** Attaches this `ScrollStrategy` to an overlay. */
    attach: (overlayRef: OverlayRef) => void;
    /** Detaches the scroll strategy from the current overlay. */
    detach?: () => void;
}
/** Initial configuration used when creating an overlay. */
declare class OverlayConfig {
    /** Strategy with which to position the overlay. */
    positionStrategy?: PositionStrategy;
    /** Strategy to be used when handling scroll events while the overlay is open. */
    scrollStrategy?: ScrollStrategy;
    /** Custom class to add to the overlay pane. */
    panelClass?: string | string[];
    /** Whether the overlay has a backdrop. */
    hasBackdrop?: boolean;
    /** Custom class to add to the backdrop */
    backdropClass?: string | string[];
    /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
    width?: number | string;
    /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
    height?: number | string;
    /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
    minWidth?: number | string;
    /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
    minHeight?: number | string;
    /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
    maxWidth?: number | string;
    /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
    maxHeight?: number | string;
    /**
     * Direction of the text in the overlay panel. If a `Directionality` instance
     * is passed in, the overlay will handle changes to its value automatically.
     */
    direction?: Direction | Directionality;
    /**
     * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    disposeOnNavigation?: boolean;
    constructor(config?: OverlayConfig);
}
type DialogContainer = BasePortalOutlet & {
    _focusTrapped?: Observable<void>;
    _closeInteractionType?: FocusOrigin;
    _recaptureFocus?: () => void;
};
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
interface ListenerOptions {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
}

declare abstract class Renderer2 {
    /**
     * Use to store arbitrary developer-defined data on a renderer instance,
     * as an object containing key-value pairs.
     * This is useful for renderers that delegate to other renderers.
     */
    abstract get data(): {
        [key: string]: any;
    };
    /**
     * Implement this callback to destroy the renderer or the host element.
     */
    abstract destroy(): void;
    /**
     * Implement this callback to create an instance of the host element.
     * @param name An identifying name for the new element, unique within the namespace.
     * @param namespace The namespace for the new element.
     * @returns The new element.
     */
    abstract createElement(name: string, namespace?: string | null): any;
    /**
     * Implement this callback to add a comment to the DOM of the host element.
     * @param value The comment text.
     * @returns The modified element.
     */
    abstract createComment(value: string): any;
    /**
     * Implement this callback to add text to the DOM of the host element.
     * @param value The text string.
     * @returns The modified element.
     */
    abstract createText(value: string): any;
    /**
     * If null or undefined, the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode: ((node: any) => void) | null;
    /**
     * Appends a child to a given parent node in the host element DOM.
     * @param parent The parent node.
     * @param newChild The new child node.
     */
    abstract appendChild(parent: any, newChild: any): void;
    /**
     * Implement this callback to insert a child node at a given position in a parent node
     * in the host element DOM.
     * @param parent The parent node.
     * @param newChild The new child nodes.
     * @param refChild The existing child node before which `newChild` is inserted.
     * @param isMove Optional argument which signifies if the current `insertBefore` is a result of a
     *     move. Animation uses this information to trigger move animations. In the past the Animation
     *     would always assume that any `insertBefore` is a move. This is not strictly true because
     *     with runtime i18n it is possible to invoke `insertBefore` as a result of i18n and it should
     *     not trigger an animation move.
     */
    abstract insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean): void;
    /**
     * Implement this callback to remove a child node from the host element's DOM.
     * @param parent The parent node.
     * @param oldChild The child node to remove.
     * @param isHostElement Optionally signal to the renderer whether this element is a host element
     * or not
     */
    abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void;
    /**
     * Implement this callback to prepare an element to be bootstrapped
     * as a root element, and return the element instance.
     * @param selectorOrNode The DOM element.
     * @param preserveContent Whether the contents of the root element
     * should be preserved, or cleared upon bootstrap (default behavior).
     * Use with `ViewEncapsulation.ShadowDom` to allow simple native
     * content projection via `<slot>` elements.
     * @returns The root element.
     */
    abstract selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any;
    /**
     * Implement this callback to get the parent of a given node
     * in the host element's DOM.
     * @param node The child node to query.
     * @returns The parent node, or null if there is no parent.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    abstract parentNode(node: any): any;
    /**
     * Implement this callback to get the next sibling node of a given node
     * in the host element's DOM.
     * @returns The sibling node, or null if there is no sibling.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    abstract nextSibling(node: any): any;
    /**
     * Implement this callback to set an attribute value for an element in the DOM.
     * @param el The element.
     * @param name The attribute name.
     * @param value The new value.
     * @param namespace The namespace.
     */
    abstract setAttribute(el: any, name: string, value: string, namespace?: string | null): void;
    /**
     * Implement this callback to remove an attribute from an element in the DOM.
     * @param el The element.
     * @param name The attribute name.
     * @param namespace The namespace.
     */
    abstract removeAttribute(el: any, name: string, namespace?: string | null): void;
    /**
     * Implement this callback to add a class to an element in the DOM.
     * @param el The element.
     * @param name The class name.
     */
    abstract addClass(el: any, name: string): void;
    /**
     * Implement this callback to remove a class from an element in the DOM.
     * @param el The element.
     * @param name The class name.
     */
    abstract removeClass(el: any, name: string): void;
    /**
     * Implement this callback to set a CSS style for an element in the DOM.
     * @param el The element.
     * @param style The name of the style.
     * @param value The new value.
     * @param flags Flags for style variations. No flags are set by default.
     */
    abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void;
    /**
     * Implement this callback to remove the value from a CSS style for an element in the DOM.
     * @param el The element.
     * @param style The name of the style.
     * @param flags Flags for style variations to remove, if set. ???
     */
    abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void;
    /**
     * Implement this callback to set the value of a property of an element in the DOM.
     * @param el The element.
     * @param name The property name.
     * @param value The new value.
     */
    abstract setProperty(el: any, name: string, value: any): void;
    /**
     * Implement this callback to set the value of a node in the host element.
     * @param node The node.
     * @param value The new value.
     */
    abstract setValue(node: any, value: string): void;
    /**
     * Implement this callback to start an event listener.
     * @param target The context in which to listen for events. Can be
     * the entire window or document, the body of the document, or a specific
     * DOM element.
     * @param eventName The event to listen for.
     * @param callback A handler function to invoke when the event occurs.
     * @param options Options that configure how the event listener is bound.
     * @returns An "unlisten" function for disposing of this handler.
     */
    abstract listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean | void, options?: ListenerOptions): () => void;
}
type ImmutableObject<T> = {
    readonly [P in keyof T]: T[P];
};
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
    runTask<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[], name?: string): T;
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     */
    runGuarded<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T;
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
declare abstract class BaseOverlayDispatcher implements OnDestroy {
    /** Currently attached overlays in the order they were attached. */
    _attachedOverlays: OverlayRef[];
    protected _document: Document;
    protected _isAttached: boolean;
    constructor(...args: unknown[]);
    ngOnDestroy(): void;
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef: OverlayRef): void;
    /** Remove an overlay from the list of attached overlay refs. */
    remove(overlayRef: OverlayRef): void;
    /** Detaches the global event listener. */
    protected abstract detach(): void;
    static ɵfac: ɵɵFactoryDeclaration<BaseOverlayDispatcher, never>;
    static ɵprov: ɵɵInjectableDeclaration<BaseOverlayDispatcher>;
}

declare class OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
    private _platform;
    private _ngZone;
    private _renderer;
    private _cursorOriginalValue;
    private _cursorStyleIsSet;
    private _pointerDownEventTarget;
    private _cleanups;
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef: OverlayRef): void;
    /** Detaches the global keyboard event listener. */
    protected detach(): void;
    /** Store pointerdown event target to track origin of click. */
    private _pointerDownListener;
    /** Click event listener that will be attached to the body propagate phase. */
    private _clickListener;
    static ɵfac: ɵɵFactoryDeclaration<OverlayOutsideClickDispatcher, never>;
    static ɵprov: ɵɵInjectableDeclaration<OverlayOutsideClickDispatcher>;
}

declare class OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
    private _ngZone;
    private _renderer;
    private _cleanupKeydown;
    /** Add a new overlay to the list of attached overlay refs. */
    add(overlayRef: OverlayRef): void;
    /** Detaches the global keyboard event listener. */
    protected detach(): void;
    /** Keyboard event listener that will be attached to the body. */
    private _keydownListener;
    static ɵfac: ɵɵFactoryDeclaration<OverlayKeyboardDispatcher, never>;
    static ɵprov: ɵɵInjectableDeclaration<OverlayKeyboardDispatcher>;
}

interface OverlaySizeConfig {
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
}
declare class OverlayRef implements PortalOutlet {
    private _portalOutlet;
    private _host;
    private _pane;
    private _config;
    private _ngZone;
    private _keyboardDispatcher;
    private _document;
    private _location;
    private _outsideClickDispatcher;
    private _animationsDisabled;
    private _injector;
    private _renderer;
    private readonly _backdropClick;
    private readonly _attachments;
    private readonly _detachments;
    private _positionStrategy;
    private _scrollStrategy;
    private _locationChanges;
    private _backdropRef;
    /**
     * Reference to the parent of the `_host` at the time it was detached. Used to restore
     * the `_host` to its original position in the DOM when it gets re-attached.
     */
    private _previousHostParent;
    /** Stream of keydown events dispatched to this overlay. */
    readonly _keydownEvents: Subject<KeyboardEvent>;
    /** Stream of mouse outside events dispatched to this overlay. */
    readonly _outsidePointerEvents: Subject<MouseEvent>;
    private _renders;
    private _afterRenderRef;
    /** Reference to the currently-running `afterNextRender` call. */
    private _afterNextRenderRef;
    constructor(_portalOutlet: PortalOutlet, _host: HTMLElement, _pane: HTMLElement, _config: ImmutableObject<OverlayConfig>, _ngZone: NgZone, _keyboardDispatcher: OverlayKeyboardDispatcher, _document: Document, _location: Location, _outsideClickDispatcher: OverlayOutsideClickDispatcher, _animationsDisabled: boolean | undefined, _injector: EnvironmentInjector, _renderer: Renderer2);
    /** The overlay's HTML element */
    get overlayElement(): HTMLElement;
    /** The overlay's backdrop HTML element. */
    get backdropElement(): HTMLElement | null;
    /**
     * Wrapper around the panel element. Can be used for advanced
     * positioning where a wrapper with specific styling is
     * required around the overlay pane.
     */
    get hostElement(): HTMLElement;
    attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
    attach(portal: any): any;
    /**
     * Detaches an overlay from a portal.
     * @returns The portal detachment result.
     */
    detach(): any;
    /** Cleans up the overlay from the DOM. */
    dispose(): void;
    /** Whether the overlay has attached content. */
    hasAttached(): boolean;
    /** Gets an observable that emits when the backdrop has been clicked. */
    backdropClick(): Observable<MouseEvent>;
    /** Gets an observable that emits when the overlay has been attached. */
    attachments(): Observable<void>;
    /** Gets an observable that emits when the overlay has been detached. */
    detachments(): Observable<void>;
    /** Gets an observable of keydown events targeted to this overlay. */
    keydownEvents(): Observable<KeyboardEvent>;
    /** Gets an observable of pointer events targeted outside this overlay. */
    outsidePointerEvents(): Observable<MouseEvent>;
    /** Gets the current overlay configuration, which is immutable. */
    getConfig(): OverlayConfig;
    /** Updates the position of the overlay based on the position strategy. */
    updatePosition(): void;
    /** Switches to a new position strategy and updates the overlay position. */
    updatePositionStrategy(strategy: PositionStrategy): void;
    /** Update the size properties of the overlay. */
    updateSize(sizeConfig: OverlaySizeConfig): void;
    /** Sets the LTR/RTL direction for the overlay. */
    setDirection(dir: Direction | Directionality): void;
    /** Add a CSS class or an array of classes to the overlay pane. */
    addPanelClass(classes: string | string[]): void;
    /** Remove a CSS class or an array of classes from the overlay pane. */
    removePanelClass(classes: string | string[]): void;
    /**
     * Returns the layout direction of the overlay panel.
     */
    getDirection(): Direction;
    /** Switches to a new scroll strategy. */
    updateScrollStrategy(strategy: ScrollStrategy): void;
    /** Updates the text direction of the overlay panel. */
    private _updateElementDirection;
    /** Updates the size of the overlay element based on the overlay config. */
    private _updateElementSize;
    /** Toggles the pointer events for the overlay pane element. */
    private _togglePointerEvents;
    /** Attaches a backdrop for this overlay. */
    private _attachBackdrop;
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     */
    private _updateStackingOrder;
    /** Detaches the backdrop (if any) associated with the overlay. */
    detachBackdrop(): void;
    /** Toggles a single CSS class or an array of classes on an element. */
    private _toggleClasses;
    /** Detaches the overlay content next time the zone stabilizes. */
    private _detachContentWhenEmpty;
    /** Disposes of a scroll strategy. */
    private _disposeScrollStrategy;
}
type DialogRole = 'dialog' | 'alertdialog';
interface PositionStrategy {
    /** Attaches this position strategy to an overlay. */
    attach(overlayRef: OverlayRef): void;
    /** Updates the position of the overlay element. */
    apply(): void;
    /** Called when the overlay is detached. */
    detach?(): void;
    /** Cleans up any DOM modifications made by the position strategy, if necessary. */
    dispose(): void;
}

type AutoFocusTarget = 'dialog' | 'first-tabbable' | 'first-heading';

declare class DialogConfig<D = unknown, R = unknown, C extends DialogContainer = BasePortalOutlet> {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;
    /**
     * Injector used for the instantiation of the component to be attached. If provided,
     * takes precedence over the injector indirectly provided by `ViewContainerRef`.
     */
    injector?: Injector;
    /** ID for the dialog. If omitted, a unique one will be generated. */
    id?: string;
    /** The ARIA role of the dialog element. */
    role?: DialogRole;
    /** Optional CSS class or classes applied to the overlay panel. */
    panelClass?: string | string[];
    /** Whether the dialog has a backdrop. */
    hasBackdrop?: boolean;
    /** Optional CSS class or classes applied to the overlay backdrop. */
    backdropClass?: string | string[];
    /** Whether the dialog closes with the escape key or pointer events outside the panel element. */
    disableClose?: boolean;
    /** Width of the dialog. */
    width?: string;
    /** Height of the dialog. */
    height?: string;
    /** Min-width of the dialog. If a number is provided, assumes pixel units. */
    minWidth?: number | string;
    /** Min-height of the dialog. If a number is provided, assumes pixel units. */
    minHeight?: number | string;
    /** Max-width of the dialog. If a number is provided, assumes pixel units. */
    maxWidth?: number | string;
    /** Max-height of the dialog. If a number is provided, assumes pixel units. */
    maxHeight?: number | string;
    /** Strategy to use when positioning the dialog. Defaults to centering it on the page. */
    positionStrategy?: PositionStrategy;
    /** Data being injected into the child component. */
    data?: D | null;
    /** Layout direction for the dialog's content. */
    direction?: Direction;
    /** ID of the element that describes the dialog. */
    ariaDescribedBy?: string | null;
    /** ID of the element that labels the dialog. */
    ariaLabelledBy?: string | null;
    /** Dialog label applied via `aria-label` */
    ariaLabel?: string | null;
    /**
     * Whether this is a modal dialog. Used to set the `aria-modal` attribute. Off by default,
     * because it can interfere with other overlay-based components (e.g. `mat-select`) and because
     * it is redundant since the dialog marks all outside content as `aria-hidden` anyway.
     */
    ariaModal?: boolean;
    /**
     * Where the dialog should focus on open.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or
     * AutoFocusTarget instead.
     */
    autoFocus?: AutoFocusTarget | string | boolean;
    /**
     * Whether the dialog should restore focus to the previously-focused element upon closing.
     * Has the following behavior based on the type that is passed in:
     * - `boolean` - when true, will return focus to the element that was focused before the dialog
     *    was opened, otherwise won't restore focus at all.
     * - `string` - focus will be restored to the first element that matches the CSS selector.
     * - `HTMLElement` - focus will be restored to the specific element.
     */
    restoreFocus?: boolean | string | HTMLElement;
    /**
     * Scroll strategy to be used for the dialog. This determines how
     * the dialog responds to scrolling underneath the panel element.
     */
    scrollStrategy?: ScrollStrategy;
    /**
     * Whether the dialog should close when the user navigates backwards or forwards through browser
     * history. This does not apply to navigation via anchor element unless using URL-hash based
     * routing (`HashLocationStrategy` in the Angular router).
     */
    closeOnNavigation?: boolean;
    /**
     * Whether the dialog should close when the dialog service is destroyed. This is useful if
     * another service is wrapping the dialog and is managing the destruction instead.
     */
    closeOnDestroy?: boolean;
    /**
     * Whether the dialog should close when the underlying overlay is detached. This is useful if
     * another service is wrapping the dialog and is managing the destruction instead. E.g. an
     * external detachment can happen as a result of a scroll strategy triggering it or when the
     * browser location changes.
     */
    closeOnOverlayDetachments?: boolean;
    /**
     * Alternate `ComponentFactoryResolver` to use when resolving the associated component.
     * @deprecated No longer used. Will be removed.
     * @breaking-change 20.0.0
     */
    componentFactoryResolver?: unknown;
    /**
     * Providers that will be exposed to the contents of the dialog. Can also
     * be provided as a function in order to generate the providers lazily.
     */
    providers?: StaticProvider[] | ((dialogRef: R, config: DialogConfig<D, R, C>, container: C) => StaticProvider[]);
    /**
     * Component into which the dialog content will be rendered. Defaults to `CdkDialogContainer`.
     * A configuration object can be passed in to customize the providers that will be exposed
     * to the dialog container.
     */
    container?: Type$1<C> | {
        type: Type$1<C>;
        providers: (config: DialogConfig<D, R, C>) => StaticProvider[];
    };
    /**
     * Context that will be passed to template-based dialogs.
     * A function can be passed in to resolve the context lazily.
     */
    templateContext?: Record<string, any> | (() => Record<string, any>);
}

 class ComponentRef<C> {
    instance: C = null!;
    location: any = null!;
    injector: Injector = null!;
    destroy(): void {}
    onDestroy(callback: Function): void {}
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
    readonly id: string = "";
    disableClose: boolean | undefined;

    close(result?: R): void {}
    updatePosition(): this { return this; }
    updateSize(width?: string | number, height?: string | number): this { return this; }
    addPanelClass(classes: string | string[]): this { return this; }
    removePanelClass(classes: string | string[]): this { return this; }
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
    /**
     * When a view uses the {@link ChangeDetectionStrategy#OnPush} (checkOnce)
     * change detection strategy, explicitly marks the view as changed so that
     * it can be checked again.
     *
     * Components are normally marked as dirty (in need of rerendering) when inputs
     * have changed or events have fired in the view. Call this method to ensure that
     * a component is checked even if these triggers have not occurred.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     */
    abstract markForCheck(): void;
    /**
     * Detaches this view from the change-detection tree.
     * A detached view is  not checked until it is reattached.
     * Use in combination with `detectChanges()` to implement local change detection checks.
     *
     * Detached views are not checked during change detection runs until they are
     * re-attached, even if they are marked as dirty.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detach(): void;
    /**
     * Checks this view and its children. Use in combination with {@link ChangeDetectorRef#detach}
     * to implement local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * Use in development mode to verify that running change detection doesn't introduce
     * other changes. Calling it in production mode is a noop.
     *
     * @deprecated This is a test-only API that does not have a place in production interface.
     * `checkNoChanges` is already part of an `ApplicationRef` tick when the app is running in dev
     * mode. For more granular `checkNoChanges` validation, use `ComponentFixture`.
     */
    abstract checkNoChanges(): void;
    /**
     * Re-attaches the previously detached view to the change detection tree.
     * Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     */
    abstract reattach(): void;
}

declare abstract class ViewRef$1 extends ChangeDetectorRef {
    /**
     * Destroys this view and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Reports whether this view has been destroyed.
     * @returns True after the `destroy()` method has been called, false otherwise.
     */
    abstract get destroyed(): boolean;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for views.
     * @param callback A handler function that cleans up developer-defined data
     * associated with a view. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): void;
}

declare abstract class EmbeddedViewRef<C> extends ViewRef$1 {
    /**
     * The context for this view, inherited from the anchor element.
     */
    abstract context: C;
    /**
     * The root nodes for this embedded view.
     */
    abstract get rootNodes(): any[];
}


declare abstract class TemplateRef<C> {
    /**
     * The anchor element in the parent view for this embedded view.
     *
     * The data-binding and [injection contexts](guide/di/dependency-injection-context) of embedded
     * views created from this `TemplateRef` inherit from the contexts of this location.
     *
     * Typically new embedded views are attached to the view container of this location, but in
     * advanced use-cases, the view can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     */
    abstract readonly elementRef: ElementRef;
    /**
     * Instantiates an unattached embedded view based on this template.
     * @param context The data-binding context of the embedded view, as declared
     * in the `<ng-template>` usage.
     * @param injector Injector to be used within the embedded view.
     * @returns The new embedded view object.
     */
    abstract createEmbeddedView(context: C, injector?: Injector): EmbeddedViewRef<C>;
}

interface OnDestroy {
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * before a directive, pipe, or service instance is destroyed.
     */
    ngOnDestroy(): void;
}

class Subject<T> extends Observable<T> implements SubscriptionLike {
  closed = false;

  observers: Observer<T>[] = [];
  isStopped = false;
  hasError = false;
  thrownError: any = null;

  constructor() {
    // NOTE: This must be here to obscure Observable's constructor.
    super();
  }

  next(value: T) {
  }

  error(err: any) {
  }

  complete() {
  }

  unsubscribe() {
  }

  get observed() {
    return this.observers?.length > 0;
  }

  asObservable(): Observable<T> {
    const observable: any = new Observable<T>();
    observable.source = this;
    return observable;
  }
}

declare class Dialog implements OnDestroy {
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
    /** Keeps track of the currently-open dialogs. */
    get openDialogs(): readonly DialogRef<any, any>[];
    /** Stream that emits when a dialog has been opened. */
    get afterOpened(): Subject<DialogRef<any, any>>;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    readonly afterAllClosed: Observable<void>;
    constructor(...args: unknown[]);
    /**
     * Opens a modal dialog containing the given component.
     * @param component Type of the component to load into the dialog.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    open<R = unknown, D = unknown, C = unknown>(component: ComponentType<C>, config?: DialogConfig<D, DialogRef<R, C>>): DialogRef<R, C>;
    /**
     * Opens a modal dialog containing the given template.
     * @param template TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    open<R = unknown, D = unknown, C = unknown>(template: TemplateRef<C>, config?: DialogConfig<D, DialogRef<R, C>>): DialogRef<R, C>;
    open<R = unknown, D = unknown, C = unknown>(componentOrTemplateRef: ComponentType<C> | TemplateRef<C>, config?: DialogConfig<D, DialogRef<R, C>>): DialogRef<R, C>;
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll(): void;
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     */
    getDialogById<R, C>(id: string): DialogRef<R, C> | undefined;
    ngOnDestroy(): void;
    /**
     * Creates an overlay config from a dialog config.
     * @param config The dialog configuration.
     * @returns The overlay configuration.
     */
    private _getOverlayConfig;
    /**
     * Attaches a dialog container to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    private _attachContainer;
    /**
     * Attaches the user-provided component to the already-created dialog container.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogRef Reference to the dialog being opened.
     * @param dialogContainer Component that is going to wrap the dialog content.
     * @param config Configuration used to open the dialog.
     */
    private _attachDialogContent;
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the dialog.
     * @param dialogRef Reference to the dialog being opened.
     * @param dialogContainer Component that is going to wrap the dialog content.
     * @param fallbackInjector Injector to use as a fallback when a lookup fails in the custom
     * dialog injector, if the user didn't provide a custom one.
     * @returns The custom injector that can be used inside the dialog.
     */
    private _createInjector;
    /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef Dialog to be removed.
     * @param emitEvent Whether to emit an event if this is the last dialog.
     */
    private _removeOpenDialog;
    /** Hides all of the content that isn't an overlay from assistive technology. */
    private _hideNonDialogContentFromAssistiveTechnology;
    private _getAfterAllClosed;
    static ɵfac: ɵɵFactoryDeclaration<Dialog, never>;
    static ɵprov: ɵɵInjectableDeclaration<Dialog>;
}type CtorDependency = {
    /**
     * If an `@Attribute` decorator is used, this represents the injected attribute's name. If the
     * attribute name is a dynamic expression instead of a string literal, this will be the unknown
     * type.
     */
    attribute?: string | unknown;
    /**
     * If `@Optional()` is used, this key is set to true.
     */
    optional?: true;
    /**
     * If `@Host` is used, this key is set to true.
     */
    host?: true;
    /**
     * If `@Self` is used, this key is set to true.
     */
    self?: true;
    /**
     * If `@SkipSelf` is used, this key is set to true.
     */
    skipSelf?: true;
} | null;

type ɵɵFactoryDeclaration<T, CtorDependencies extends CtorDependency[]> = unknown;

interface ɵɵInjectableDeclaration<T> {
    /**
     * Specifies that the given type belongs to a particular injector:
     * - `InjectorType` such as `NgModule`,
     * - `'root'` the root injector
     * - `'any'` all injectors.
     * - `null`, does not belong to any injector. Must be explicitly listed in the injector
     *   `providers`.
     */
    providedIn: InjectorType<any> | 'root' | 'platform' | 'any' | 'environment' | null;
    /**
     * The token to which this definition belongs.
     *
     * Note that this may not be the same as the type that the `factory` will create.
     */
    token: unknown;
    /**
     * Factory method to execute to create an instance of the injectable.
     */
    factory: (t?: Type$1<any>) => T;
    /**
     * In a case of no explicit injector, a location where the instance of the injectable is stored.
     */
    value: T | undefined;
}

interface InjectorType<T> extends Type$1<T> {
    ɵfac?: unknown;
    ɵinj: unknown;
}

declare const Type$1: FunctionConstructor;
interface Type$1<T> extends Function {
    new (...args: any[]): T;
}

// Application code

 interface NeighborOut {
  id: string;
}

 interface IConfirmationModal<TSubSet> {
  title: string;
  maximizable: boolean;
  hideCloseX: boolean;
  body: TemplateRef<void>;
  hasActionButton: boolean;
  actionButtonText?: string;
  actionButtonSeverity?: Severity;
  dismissButtonText: string;
  dismissButtonSeverity?: Severity;
  subset?: TSubSet;
}

class ModalConfirmation<TSubSet> {
    readonly #dialogRef: DialogRef<TSubSet> = null!;
    readonly data: IConfirmationModal<TSubSet> = null!;

    // Simulate injection
    static ɵfac: any;
    static ɵcmp: any;

    handleDismissButtonClick(): void {
        this.#dialogRef.close();
    }

    handleActionButtonClick(): void {
        this.#dialogRef.close(this.data.subset);
    }
}


const getDefaultConfirmationDialogConfig = <TDataSubset>({
  disableClose = true,
  maximizable = false,
  hideCloseX = false,
  width,
  title,
  body,
  hasActionButton,
  actionButtonText,
  actionButtonSeverity,
  dismissButtonText,
  dismissButtonSeverity,
  dataSubset
}: {
  disableClose?: boolean;
  maximizable?: boolean;
  hideCloseX?: boolean;
  width?: string;
  title: string;
  body: TemplateRef<void>;
  hasActionButton: boolean;
  actionButtonText?: string;
  actionButtonSeverity?: Severity;
  dismissButtonText: string;
  dismissButtonSeverity?: Severity;
  dataSubset?: TDataSubset;
}): DialogConfig<
  IConfirmationModal<TDataSubset>,
  DialogRef<TDataSubset, ModalConfirmation<TDataSubset>>
> => {
  return {
    disableClose,
    width,
    data: {
      title,
      maximizable,
      hideCloseX,
      body,
      hasActionButton,
      actionButtonText,
      actionButtonSeverity,
      dismissButtonText,
      dismissButtonSeverity,
      subset: dataSubset
    }
  };
};


class AppComponent {
  readonly #dialog: Dialog = null!;

   openDeleteNeighborModal(): void {
     const dialogConfig = getDefaultConfirmationDialogConfig<NeighborOut>({
      title: 'Delete User',
      hasActionButton: true,
      actionButtonText: 'Delete User',
      actionButtonSeverity: 'danger',
      dismissButtonText: 'Do Not Delete',
      dataSubset: undefined,
      body: {} as TemplateRef<void>
    });

    // This should work in old compiler (C inferred as NeighborOut)
    // And fail in new compiler (C inferred as unknown -> providers mismatch)
    // We force the types here to reproduce the inference result seen in the full app
    this.#dialog.open(ModalConfirmation, dialogConfig);
  }
}






type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'plain';
