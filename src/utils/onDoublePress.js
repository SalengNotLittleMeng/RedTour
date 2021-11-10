let times = 0;
export function onDoublePress() {
  times++;
  if (times === 1) {
    let timeID = setTimeout(() => {
      times = 0;
      clearTimeout(timeID);
    }, 500);
    return false;
  } else if (times === 2) {
    times = 0;
    return true;
  }
}
