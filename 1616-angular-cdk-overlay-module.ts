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

interface PositionStrategy {
  attach(overlayRef: OverlayRef): void;
  apply(): void;
  detach?(): void;
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
  enable: () => void;
  disable: () => void;
  attach: (overlayRef: OverlayRef) => void;
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

declare class OverlayConfig {
  positionStrategy?: PositionStrategy;
  scrollStrategy?: ScrollStrategy;
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  disposeOnNavigation?: boolean;
  constructor(config?: OverlayConfig);
}

type ImmutableObject<T> = {
  readonly [P in keyof T]: T[P];
};
declare abstract class BaseOverlayDispatcher implements OnDestroy {
  _attachedOverlays: OverlayRef[];
  protected _document: Document;
  protected _isAttached: boolean;
  constructor(...args: unknown[]);
  ngOnDestroy(): void;
  add(overlayRef: OverlayRef): void;
  remove(overlayRef: OverlayRef): void;
  protected abstract detach(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<BaseOverlayDispatcher, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<BaseOverlayDispatcher>;
}

declare class OverlayKeyboardDispatcher extends BaseOverlayDispatcher {
  private _ngZone;
  private _renderer;
  private _cleanupKeydown;
  add(overlayRef: OverlayRef): void;
  protected detach(): void;
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
  add(overlayRef: OverlayRef): void;
  protected detach(): void;
  private _pointerDownListener;
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
  private _previousHostParent;
  readonly _keydownEvents: Subject<KeyboardEvent>;
  readonly _outsidePointerEvents: Subject<MouseEvent>;
  private _renders;
  private _afterRenderRef;
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
  get overlayElement(): HTMLElement;
  get backdropElement(): HTMLElement | null;
  get hostElement(): HTMLElement;
  attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  attach<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  attach(portal: any): any;
  detach(): any;
  dispose(): void;
  hasAttached(): boolean;
  backdropClick(): Observable<MouseEvent>;
  attachments(): Observable<void>;
  detachments(): Observable<void>;
  keydownEvents(): Observable<KeyboardEvent>;
  outsidePointerEvents(): Observable<MouseEvent>;
  getConfig(): OverlayConfig;
  updatePosition(): void;
  updatePositionStrategy(strategy: PositionStrategy): void;
  updateSize(sizeConfig: OverlaySizeConfig): void;
  addPanelClass(classes: string | string[]): void;
  removePanelClass(classes: string | string[]): void;
  updateScrollStrategy(strategy: ScrollStrategy): void;
  private _updateElementDirection;
  private _updateElementSize;
  private _togglePointerEvents;
  private _attachBackdrop;
  private _updateStackingOrder;
  detachBackdrop(): void;
  private _toggleClasses;
  private _detachContentWhenEmpty;
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
