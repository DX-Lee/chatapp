export function getCookie (name) {
  const reg = new RegExp('(^|)' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  }
  return null
}

export function setCookie (name) {
  return name
}
