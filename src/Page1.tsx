import { useCallback } from 'react';
import Page2 from './Page2';
import { useNavigate } from 'react-router-dom';
import { useStorage, LOCAL_STORAGE, environmentCheck } from 'terrestrial-util';
import { ELECTRON_KEY_VALUE_STORAGE } from 'terrestrial-util-electron';


const PAGE_NAME = 'Page1';
const PAGE_PATH = '/page1';

export function Page1() {

    const [storedVar, setStoredVar] = useStorage<string>(environmentCheck.isElectron ? ELECTRON_KEY_VALUE_STORAGE : LOCAL_STORAGE, 'storedVar', 'defaultValue');

    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(Page2.path);
    }, [navigate]);

    return (
    <div>
        <h1>{PAGE_NAME}</h1>
        <button onClick={handleClick}>Go to Page2</button>
        <p>Stored Var: {storedVar}</p>
        <input type="text" value={storedVar} onChange={(e) => setStoredVar(e.target.value)} />
    </div>
    );
}
Page1.displayName = PAGE_NAME;
Page1.path = PAGE_PATH;

export default Page1;