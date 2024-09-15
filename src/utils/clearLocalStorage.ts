// Function to clear local storage items with a given prefix at regular intervals
export const clearLocalStorageWithPrefix = (prefix: string, interval: number) => {
    const clearItems = () => {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    };
  
    clearItems(); // Clear items immediately
    return setInterval(clearItems, interval); // Set up interval
  };
  