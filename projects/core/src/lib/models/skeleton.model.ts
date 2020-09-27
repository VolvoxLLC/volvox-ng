import { isZeroOrHigher } from './utils.model';

export class Skeleton {
    public width?: number | string;
    public height?: number | string;
    public borderRadius?: number | string;
    public randomizeOffset?: number;

    constructor(skeleton?: Skeleton) {
        this.width = isZeroOrHigher(skeleton?.width) ? skeleton?.width : 100;
        this.height = isZeroOrHigher(skeleton?.height) ? skeleton?.height : 15;
        this.borderRadius = isZeroOrHigher(skeleton?.borderRadius) ? skeleton?.height : 4;
        this.randomizeOffset = skeleton?.randomizeOffset || 0;
    }
}
