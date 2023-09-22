const getPagination = (limit = 6, page = 1, total = 6) => {
  const totalPage = Math.ceil(total / limit)
  // Array.from 接受長度物件跟元素回調函式，回調接受value,index
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
  const currentPage = Math.min(Math.max(page, 1), totalPage)
  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
  const next = currentPage + 1 > totalPage ? totalPage : currentPage + 1
  return {
    totalPage,
    pages,
    currentPage,
    prev,
    next
  }
}

module.exports = {
  getPagination
}
