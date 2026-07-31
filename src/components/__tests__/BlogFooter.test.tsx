import { render } from '@testing-library/react';
import { BlogFooter } from '../blog/BlogFooter';

describe('BlogFooter', () => {
    it('renders blog footer container', () => {
        const { container } = render(<BlogFooter />);
        expect(container.firstChild).toBeTruthy();
    });
});
