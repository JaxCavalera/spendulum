import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

// Components
import { App } from '../App';

describe('Given ', () => {
  describe('When ', () => {
    beforeEach(async () => {
      jest.resetModules();
    });

    test('Then ', () => {
      const mockBrowserRouter = ({ children }: { children: ReactElement }) => <div>{children}</div>;

      jest.mock(
        'react-router-dom/BrowserRouter',
        () => {
          return mockBrowserRouter;
        }
      );

      const appWrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
    });
  });
});
