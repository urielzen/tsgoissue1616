import * as i0 from "./1616-angular-core";
import { OnDestroy, EventEmitter } from "./1616-angular-core";

type Direction = 'ltr' | 'rtl';

// declare class Directionality implements OnDestroy {
declare class Directionality {
    readonly value: Direction;
    readonly change: EventEmitter<Direction>;
    constructor(...args: unknown[]);
    // ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Directionality, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Directionality>;
}

export { Directionality as D };
export type { Direction as a };
