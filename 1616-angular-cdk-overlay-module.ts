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

declare class OverlayRef {}

export {
  OverlayRef as b,
  OverlayOutsideClickDispatcher as p,
};
