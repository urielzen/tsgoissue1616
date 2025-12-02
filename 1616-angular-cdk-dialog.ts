import * as i0 from './1616-angular-core';
import { F as FocusOrigin } from './1616-angular-cdk-focus-monitor';
import {
  Injector,
  OnDestroy,
  Type,
  ViewContainerRef,
  StaticProvider,
  ComponentRef,
  TemplateRef,
} from './1616-angular-core';
import { Subject } from './1616-rxjs-subject';
import {
  B as BasePortalOutlet,
  C as ComponentType,
} from './1616-angular-cdk-portal-directives';
import { a as Direction } from './1616-angular-cdk-bidi-module';
import { Observable } from './1616-rxjs-observable';
import {
  P as PositionStrategy,
  n as ScrollStrategy,
  b as OverlayRef,
} from './1616-angular-cdk-overlay-module';

type DialogRole = 'dialog' | 'alertdialog';

type DialogContainer = BasePortalOutlet & {
  _focusTrapped?: Observable<void>;
  _closeInteractionType?: FocusOrigin;
  _recaptureFocus?: () => void;
};

type AutoFocusTarget = 'dialog' | 'first-tabbable' | 'first-heading';

declare class DialogConfig<
  D = unknown,
  R = unknown,
  C extends DialogContainer = BasePortalOutlet
> {
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
  providers?:
    | StaticProvider[]
    | ((
        dialogRef: R,
        config: DialogConfig<D, R, C>,
        container: C
      ) => StaticProvider[]);
  /**
   * Component into which the dialog content will be rendered. Defaults to `CdkDialogContainer`.
   * A configuration object can be passed in to customize the providers that will be exposed
   * to the dialog container.
   */
  container?:
    | Type<C>
    | {
        type: Type<C>;
        providers: (config: DialogConfig<D, R, C>) => StaticProvider[];
      };
  /**
   * Context that will be passed to template-based dialogs.
   * A function can be passed in to resolve the context lazily.
   */
  templateContext?: Record<string, any> | (() => Record<string, any>);
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
  readonly id: string = '';
  disableClose: boolean | undefined;

  close(result?: R): void {}
  updatePosition(): this {
    return this;
  }
  updateSize(width?: string | number, height?: string | number): this {
    return this;
  }
  addPanelClass(classes: string | string[]): this {
    return this;
  }
  removePanelClass(classes: string | string[]): this {
    return this;
  }
}

declare class Dialog /*implements OnDestroy*/ {
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
  open<R = unknown, D = unknown, C = unknown>(
    component: ComponentType<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C>;
  /**
   * Opens a modal dialog containing the given template.
   * @param template TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<R = unknown, D = unknown, C = unknown>(
    template: TemplateRef<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C>;
  open<R = unknown, D = unknown, C = unknown>(
    componentOrTemplateRef: ComponentType<C> | TemplateRef<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C>;
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll(): void;
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById<R, C>(id: string): DialogRef<R, C> | undefined;
  // ngOnDestroy(): void;
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
  static ɵfac: i0.ɵɵFactoryDeclaration<Dialog, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<Dialog>;
}

export { Dialog, DialogConfig, DialogRef };
export type {};
