import { createContext, ReactNode, useContext } from "react";

type AppContextValues = {
  fetchFolder(path: string): Promise<Folder | null>;
};

const AppContext = createContext<AppContextValues>({
  fetchFolder(path) {
    return new Promise(() => null)
  },
});

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const folderData: Record<string, Folder> = {};
  const fetchFolder = async (path: string) => {
    try {
      if (path in folderData) {
        return folderData[path];
      } else {
        const response = await fetch(
          `${BASE_URL}/fs?path=${path}`
        );
        const data = await response.json();
        folderData[path] = data;
        return data;
      }
    } catch (error) {
      // Handle errors
      console.log(error);
      return null;
    }
  };


  return (
    <AppContext.Provider
      value={{
        fetchFolder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx)
    throw Error("AppContextProvider must be mounted in a parent component");

  return {
    fetchFolder: ctx.fetchFolder
  };
};
