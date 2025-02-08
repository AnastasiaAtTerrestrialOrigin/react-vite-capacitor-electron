import { useCallback } from 'react';
import Page2 from './Page2';
import { useNavigate } from 'react-router-dom';

const PAGE_NAME = 'Page1';
const PAGE_PATH = '/page1';

export function Page1() {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(Page2.path);
    }, [navigate]);

    return (
    <div>
        <h1>{PAGE_NAME}</h1>
        <button onClick={handleClick}>Go to Page2</button>
    </div>
    );
}
Page1.displayName = PAGE_NAME;
Page1.path = PAGE_PATH;

export default Page1;