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


class ComponentRef<C> {
  instance: C = null!;
  location: any = null!;
  injector: Injector = null!;
  destroy(): void {}
  onDestroy(callback: Function): void {}
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
  /** Strategy to be used when handling scroll events while the overlay is open. */
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
}

export {
  OverlayRef as b,
  OverlayConfig as g,
  OverlayOutsideClickDispatcher as p,
  OverlayKeyboardDispatcher as q
};
export type {
  OverlaySizeConfig as c,
};
