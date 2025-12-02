import {
  b as PortalOutlet,
} from './1616-angular-cdk-portal-directives';

declare class OverlayConfig {
  constructor(config?: OverlayConfig);
}

type ImmutableObject<T> = {
  readonly [P in keyof T]: T[P];
};
declare abstract class BaseOverlayDispatcher {
  _attachedOverlays: OverlayRef[];
  protected _document: Document;
  protected _isAttached: boolean;
  constructor(...args: unknown[]);
  add(overlayRef: OverlayRef): void;
  remove(overlayRef: OverlayRef): void;
  protected abstract detach(): void;
}

declare class OverlayOutsideClickDispatcher extends BaseOverlayDispatcher {
  add(overlayRef: OverlayRef): void;
  protected detach(): void;
}

declare class OverlayRef implements PortalOutlet {}

export {
  OverlayRef as b,
  OverlayConfig as g,
  OverlayOutsideClickDispatcher as p,
};
