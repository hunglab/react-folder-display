import { createRoot } from 'react-dom/client';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAppContext } from '../../contexts/AppContextProvider';
import useFolder from '../../hooks/useFolder';
import { render } from 'react-dom';

jest.mock('../../contexts/AppContextProvider');

const mockFolder = {
	name: 'component-1.js',
	contents: "() => {console.log('directory-2/component-01.js'}"
};

const mockData = {
	id: 'directory-1/directory-1a/directory-1aA',
	entries: [
		{ "name": "directory-1aA1", "type": "directory" },
		{ "name": "index.js", "type": "file" },
		{ "name": "component-1.js", "type": "file" }
	]
};

describe('useFolder', () => {


	const mockFetchFolder = jest.fn();

	beforeEach(() => {
		(useAppContext as jest.Mock).mockReturnValue({ fetchFolder: mockFetchFolder });
	});

	it('should fetch folder and update state on folder click', async () => {

		mockFetchFolder.mockResolvedValueOnce(mockData);
		const wrapper = document.createElement('div');
		const root = createRoot(wrapper);
		await act(async () => {
			root.render(<TestComponent />);
		});

		//Test
	});

	it('should fetch folder and update state on file click', async () => {


		mockFetchFolder.mockResolvedValueOnce(mockFolder);
		const wrapper = document.createElement('div');
		const root = createRoot(wrapper);

		await act(async () => {
			root.render(<TestComponent />);
		});

		const { result } = renderHook(() => useFolder({ folder: mockFolder, parentId: 'directory-2' }));


		await act(async () => {
			result.current.onFolderClick();
			await waitFor(() => {
				// Wait for the condition after the asynchronous action
				return result.current.folderName === mockFolder.name && result.current.contents === mockFolder.contents;
			});
		});

		expect(mockFetchFolder).toHaveBeenCalledWith('directory-2%2Fcomponent-1.js');
		expect(result.current.folderName).toEqual(mockFolder.name);
		expect(result.current.contents).toEqual(mockFolder.contents);
	});
});

// TestComponent is a wrapper component to test useFolder hook
function TestComponent() {
	const result = useFolder({ folder: mockFolder, parentId: 'parent-id' });
	return null;
}
