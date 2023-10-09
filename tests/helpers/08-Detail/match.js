const match = (id) => ({
    params: {id},
    isExact: true,
    path: "/actors/:id",
    url: `/actors/${id}`,
});

export default match;