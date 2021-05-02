import { JoinPipe } from './join.pipe';

describe('JoinPipe', (): void => {
    it('create an instance', (): void => {
        const pipe: JoinPipe = new JoinPipe();
        void expect(pipe).toBeTruthy();
    });
});
