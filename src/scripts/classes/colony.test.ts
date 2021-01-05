import {Colony} from "./colony";

describe('colony tests', () => {

    test('addResource called ones in createFactory method', () => {
        const colony = new Colony(10, 10,'the best colony name')
        const mockedFunction = jest.fn();
        colony.storage.addResource = mockedFunction

        colony.createFactory(10, 'type', 10)

        expect(mockedFunction).toHaveBeenCalledTimes(1);
    });
})
