import path from 'path';

/**
 * get the folder separator according to the platform
 */
export const folderSeparator = () => {
  return path.sep;
};

/**
 * search tree node
 * @param originValue
 * @param {string} searchValue
 * @returns {any}
 */
export const searchTreeNode = (originValue: string, searchValue: string): any => {
  let title = <>{originValue}</>;

  // searchValue is not empty and trim() after length > 0
  if (searchValue && searchValue.trim().length > 0) {
    const searchIndex = originValue.indexOf(searchValue); // search index
    const beforeStr = originValue.substring(0, searchIndex); // before search value
    const afterStr = originValue.substring(searchIndex + searchValue.length); // after search value
    // when search index > -1, return render title, else return origin title
    title =
      searchIndex > -1 ? (
        <span>
          {beforeStr}
          <span className={'treeList tree-search-value'}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span className={'treeList'}>{title}</span>
      );
  }
  return title;
};
