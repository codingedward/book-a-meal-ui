export default function paginationInfo(collection) {

    if (!collection || !collection.payload) {
        return {}
    }
    const { payload } = collection;
    let currentPage = 1;
    if (payload.next_page)
        currentPage = payload.next_page - 1;
    else if (payload.prev_page)
        currentPage = payload.prev_page + 1;

    return {
        hasNext: payload.has_next,
        hasPrev: payload.has_prev,
        nextPage: payload.next_page,
        prevPage: payload.prev_page,
        total: payload.total,
        pageCount: Math.ceil(payload.total / payload.per_page),
        perPage: payload.per_page,
        currentPage,
    };
}
