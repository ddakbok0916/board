import React from 'react';

export default function Pagination({ pagination, onPageClick }) {
  if (!pagination) return null;

  const { current, last } = pagination;
  const siblingCount = 1; // 현재 페이지 주변에 표시할 페이지 수
  const totalPageNumbers = siblingCount * 2 + 5; // 처음, 마지막, 현재 페이지 주변 페이지, 그리고 두 개의 '...'

  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => start + idx);
  };

  let pages = [];

  if (last > totalPageNumbers) {
    const leftSiblingIndex = Math.max(current - siblingCount, 1);
    const rightSiblingIndex = Math.min(current + siblingCount, last);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < last - 2;

    const firstPageIndex = 1;
    const lastPageIndex = last;

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      pages = [...leftRange, '...', lastPageIndex];
    } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(last - rightItemCount + 1, last);

      pages = [firstPageIndex, '...', ...rightRange];
    } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      pages = [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  } else {
    pages = range(1, last);
  }

  return (
    <div className="mt-4 flex justify-center space-x-2">
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onPageClick(page)}
            className={`px-3 py-1 rounded ${
              current === page ? 'bg-sky-300' : 'bg-sky-200'
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
