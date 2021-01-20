import { isNullOrEmpty, isNumber, isZeroOrHigher } from '@volvox-ng/core';

export class Skeleton {
    public width?: number | string;
    public height?: number | string;
    public borderRadius?: number | string;
    public randomizeOffset?: number;

    constructor(skeleton?: Skeleton) {
        this.width = isZeroOrHigher(skeleton?.width) ? skeleton?.width : 100;
        this.height = isZeroOrHigher(skeleton?.height) ? skeleton?.height : 15;
        if ((isNumber(skeleton?.borderRadius) && isZeroOrHigher(skeleton?.borderRadius)) ||
            (typeof skeleton?.borderRadius === 'string' && !isNullOrEmpty(skeleton?.borderRadius))) {
            this.borderRadius = skeleton.borderRadius;
        }
        this.borderRadius = this.borderRadius || 4;
        this.randomizeOffset = skeleton?.randomizeOffset || 0;
    }
}
