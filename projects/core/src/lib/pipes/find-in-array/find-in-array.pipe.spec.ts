import { FindInArrayPipe } from './find-in-array.pipe';

describe('FindInArrayPipe', (): void => {
    it('create an instance', (): void => {
        const pipe: FindInArrayPipe = new FindInArrayPipe();
        void expect(pipe).toBeTruthy();
    });
});
