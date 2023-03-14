export const useTruncatedString = ( str: string, n: number, useWordBoundary: boolean = false) => {
  if (str.length <= n) { return str; }
  const subString = str.substring(0, n-1); // the original check
  return (useWordBoundary
    ? subString.substring(0, subString.lastIndexOf(" "))
    : subString) + "...";
};
