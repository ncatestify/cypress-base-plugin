export const isInternal = (url: string): boolean => {
  const baseUrl = new URL(Cypress.config('baseUrl'))
  const urlToCheck = new URL(url, baseUrl.href)

  return urlToCheck.origin === baseUrl.origin
}
