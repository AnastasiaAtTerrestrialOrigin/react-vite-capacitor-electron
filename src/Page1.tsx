import { useCallback, useContext } from 'react';
import Page2 from './Page2';
import { useNavigate } from 'react-router-dom';
import { KeyValueStorageContext } from 'cross-platform-util';
import { useKeyValueStorage } from 'cross-platform-util';

const PAGE_NAME = 'Page1';
const PAGE_PATH = '/page1';

export function Page1() {
    const storageType = useContext(KeyValueStorageContext);
    const [storedVar, setStoredVar] = useKeyValueStorage<string>(storageType, 'storedVar', 'defaultValue');

    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(Page2.path);
    }, [navigate]);

    return (
    <div>
        <h1>{PAGE_NAME}</h1>
        <p>Check to make sure key-value storage is working:
            <ul>
                <li>Type a value in the text box</li>
                <li>Click the button to go to {Page2.displayName}</li>
                <li>Click the button to go back to {PAGE_NAME}</li>
                <li>Check the value in the text box (it should match what you typed)</li>
                <li>Close down the application</li>
                <li>Re-open the application</li>
                <li>The value in the text box should match what you typed in previously.</li>
            </ul>
        </p>
        <p>
            This key-value storage is not encrypted. Please don't use it to store sensitive info.
            Also, the browser and mobile apps are set to use localStorage, which is not super 
            permanent. Later on I'll update this to use Capacitor storage for mobile apps.
            Meanwhile, please make sure your users have a way to export and import their data
            to back it up. On desktop (Electron), the data is stored in the userData directory
            that is in the same place you put your executable.
        </p>
        <p>
        You can implement IKeyValueStorage with your own storage mechanism:
            <ul>
                <li>Create a new class that implements IKeyValueStorage</li>
                <li>In App.tsx, set "storage" to the instance of your new class</li>
                <li>Everything else can remain the same</li>
            </ul>
        </p>
        <p>Stored Var: {storedVar}</p>
        <input type="text" value={storedVar} onChange={(e) => setStoredVar(e.target.value)} />
        <button onClick={handleClick}>Go to {Page2.displayName}</button>
    </div>
    );
}
Page1.displayName = PAGE_NAME;
Page1.path = PAGE_PATH;

export default Page1;