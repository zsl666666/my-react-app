export const getUserInfos = value => {
  const userInfos = JSON.parse(localStorage.getItem(value))
  return userInfos
}
