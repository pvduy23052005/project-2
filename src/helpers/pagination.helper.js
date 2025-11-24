module.exports = (objectPagination, query) => {
  if (query.page) {
    objectPagination.page = parseInt(query.page);
  }

  if (query.limit) {
    objectPagination.itemLimit = parseInt(query.limit);
  }

  objectPagination.itemSkip =
    (objectPagination.page - 1) * objectPagination.itemLimite;

  return objectPagination;
};
