import {
  b as PortalOutlet,
} from './1616-angular-cdk-portal-directives';
import {
  EnvironmentInjector
} from './1616-angular-core';
import { OnDestroy } from './1616-angular-core';

declare class OverlayConfig {
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
}

declare class OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
  add(overlayRef: OverlayRef): void;
  protected detach(): void;
}

declare class OverlayRef implements PortalOutlet {
  constructor(
    _portalOutlet: PortalOutlet,
    _host: HTMLElement,
    _pane: HTMLElement,
    _config: ImmutableObject<OverlayConfig>,
    _document: Document,
    _location: Location,
    _outsideClickDispatcher: OverlayOutsideClickDispatcher,
    _animationsDisabled: boolean | undefined,
    _injector: EnvironmentInjector,
  );

}

export {
  OverlayRef as b,
  OverlayConfig as g,
  OverlayOutsideClickDispatcher as p,
};
export type {
};
