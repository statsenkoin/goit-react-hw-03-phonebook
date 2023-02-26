// setItem(key, value) - створює новий, або оновлює вже існуючий запис у сховищі.
// getItem(key) - повертає зі сховища значення з ключем key.
// removeItem(key) - видаляє зі сховища запис з ключем key.
// clear() - повністю очищає всі записи сховища.
// length - кількість записів у сховищі.

export const localStorageService = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Local storage set error: ', error.message);
    }
  },

  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data === null ? [] : JSON.parse(data);
    } catch (error) {
      console.error('Local storage get error: ', error.message);
    }
  },

  add(key, value) {
    try {
      const data = localStorage.getItem(key);
      let prevData;
      if (data !== null) prevData = JSON.parse(data);

      const newValue = value.filter(
        ({ id: newId }) =>
          !prevData
            .reduce((acc, { id: prevId }) => [...acc, prevId], [])
            .includes(newId)
      );

      const newData = JSON.stringify([...prevData, ...newValue]);
      localStorage.setItem(key, newData);
    } catch (error) {
      console.error('Local storage set error: ', error.message);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clean() {
    localStorage.clear();
  },
};
