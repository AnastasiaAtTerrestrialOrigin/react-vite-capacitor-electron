import { useCallback } from 'react';
import Page1 from './Page1';
import { useNavigate } from 'react-router-dom';

const PAGE_NAME = 'Page2';
const PAGE_PATH = '/page2';

export function Page2() {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(Page1.path);
    }, [navigate]);

    return (
    <div>
        <h1>{PAGE_NAME}</h1>
        <button onClick={handleClick}>Go to Page1</button>
    </div>
    );
}
Page2.displayName = PAGE_NAME;
Page2.path = PAGE_PATH;

export default Page2;