import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { Folder } from './components/Folder/Folder';
import { useAppContext } from './contexts/AppContextProvider';

const AppContainer = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '600px',
  overflowY: 'auto',
  backgroundColor: '#E1E1E1',
  padding: '2rem',
  borderRadius: '25px'
} as const;


export default function App() {
  const { fetchFolder } = useAppContext();
  const [data, setData] = useState<Folder | null>({
    id: '',
    entries: [],
    contents: ''
  });

  const fetchData = useCallback(async () => {
    const folder = await fetchFolder("root");
    setData(folder);
  }, [fetchFolder])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <NavBar />
      <div style={AppContainer}>
        {data && (
          <Folder folder={data} parentId={data.id} />
        )}
      </div>
    </div>
  );
}