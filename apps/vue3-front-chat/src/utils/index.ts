export const DEFAULT_UUID_COUNT = 1;

/**
 * 生成随机字符串
 * @param {number} count 拼接的随机串段数
 * @returns 用-拼接的8位随机字符串，包含0-9A-Z
 */
export const generateUuid: (count: number) => string = function (
  count: number = DEFAULT_UUID_COUNT
) {
  const uuidArr = [];
  function getTenRandomStr() {
    const BIT = 36;
    const OFFSET = 2;
    const LEN = 8;
    return Math.random().toString(BIT).substr(OFFSET, LEN);
  }
  for (let i = 0; i < count; i++) {
    const tmpUuid = getTenRandomStr().toUpperCase();
    uuidArr.push(tmpUuid);
  }
  return uuidArr.join('-');
};