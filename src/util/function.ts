export function getDate(times: number) {
  if (!times) return;
  const date = new Date(times);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getUTCMinutes();
  const s = date.getSeconds();
  return `${Y}-${M < 10 ? 0 : ''}${M}-${D < 10 ? 0 : ''}${D} ${
    h < 10 ? 0 : ''
  }${h}:${m < 10 ? 0 : ''}${m}:${s < 10 ? 0 : ''}${s}`;
}
