import { ClientDataService } from './ClientDataService';

describe(ClientDataService.name, () => {
    const instance = new ClientDataService();
    beforeAll(() => {});

    it('initializes SQLite properties', () => {
        expect(instance['error'].value).toBeNull();
        expect(instance['isLoading'].value).toBeFalsy();
        expect(instance['executeQuery']).toBeInstanceOf(Function);
    });
});
