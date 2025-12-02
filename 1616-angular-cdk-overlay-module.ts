import {
  b as PortalOutlet,
  a as ComponentPortal,
  T as TemplatePortal,
} from './1616-angular-cdk-portal-directives';
import { Subject } from './1616-rxjs-subject';
import {
  EmbeddedViewRef,
  EnvironmentInjector,
  Injector,
  NgZone,
} from './1616-angular-core';
import { Observable } from './1616-rxjs-observable';
import * as i0 from './1616-angular-core';
import { OnDestroy } from './1616-angular-core';
import {
  a as Direction,
  D as Directionality,
} from './1616-angular-cdk-bidi-module';

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

class ComponentRef<C> {
  instance: C = null!;
  location: any = null!;
  injector: Injector = null!;
  destroy(): void {}
  onDestroy(callback: Function): void {}
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

interface OverlaySizeConfig {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
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

type ImmutableObject<T> = {
  readonly [P in keyof T]: T[P];
};
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
  static ɵfac: i0.ɵɵFactoryDeclaration<BaseOverlayDispatcher, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<BaseOverlayDispatcher>;
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
  static ɵfac: i0.ɵɵFactoryDeclaration<OverlayKeyboardDispatcher, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<OverlayKeyboardDispatcher>;
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
  static ɵfac: i0.ɵɵFactoryDeclaration<OverlayOutsideClickDispatcher, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<OverlayOutsideClickDispatcher>;
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
  constructor(
    _portalOutlet: PortalOutlet,
    _host: HTMLElement,
    _pane: HTMLElement,
    _config: ImmutableObject<OverlayConfig>,
    _ngZone: NgZone,
    _keyboardDispatcher: OverlayKeyboardDispatcher,
    _document: Document,
    _location: Location,
    _outsideClickDispatcher: OverlayOutsideClickDispatcher,
    _animationsDisabled: boolean | undefined,
    _injector: EnvironmentInjector,
  );
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

export {
  OverlayRef as b,
  OverlayConfig as g,
  OverlayOutsideClickDispatcher as p,
  OverlayKeyboardDispatcher as q
};
export type {
  PositionStrategy as P,
  OverlaySizeConfig as c,
  ScrollStrategy as n
};
