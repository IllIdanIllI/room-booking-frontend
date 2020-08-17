const store = { id: -1 };

export const setStore = (id) => {
    console.log('mutate', store.id, id);
    store.id = id;
};

export const getStore = () => store.id;
