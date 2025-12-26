import { getClientDataServiceInstance } from './ClientDataService';

describe('getClientDataServiceInstance', () => {
    it('should return the same instance on multiple calls', () => {
        const instance1 = getClientDataServiceInstance();
        const instance2 = getClientDataServiceInstance();
        expect(instance1).toBe(instance2);
    });
});
