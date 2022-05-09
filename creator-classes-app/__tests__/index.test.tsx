import { render, screen } from '@testing-library/react'
import Home from '../pages/index';
import { ContentCreator } from '../types/ContentCreator';

describe('App', () => {
  it('renders heading', () => {
      render(<Home featuredCreators={[]}/>);
      expect(
          screen.getByRole('heading', { name: 'Creator Classes' })
      ).toBeInTheDocument();
  });
  it('renders creator image', () => {
    render(<Home featuredCreators={[new ContentCreator(123, "test", "test.jpg", "testdescr", "http://test.com")]}/>);
    const image = screen.getByRole('img');
    expect(
        image
    ).toHaveAttribute('src' ,  'test.jpg');
  });
});