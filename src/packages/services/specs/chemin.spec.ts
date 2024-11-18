import { AccessControlTree } from '../chemin';

describe('Access Control', function () {
    const completeObject = {
        a: { b: { 2: 2, 3: 3 }, c: [1, 2, 3] },
        d: [{ e: 'f' }, 1, 2],
    };

    it('should work', () => {
        const acl = new AccessControlTree('a.b.2 -a.b.3 -c d');
        const result = acl.applyControl(completeObject);
        const target = jasmine.objectContaining({
            a: { b: { 2: 2 } },
            d: [{ e: 'f' }, 1, 2],
        });
        expect(result).toEqual(target);
    });
});
