// 將時間戳記轉換為 yyyy/mm/dd 上/下午hh:mm:ss 格式字串
export function formatDate(timestring) {
  const time = new Date(timestring * 1000);
  return time.toLocaleString();
}
