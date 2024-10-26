export const escapeHTML = (str: string): string => {
  if (typeof str !== "string") return str

  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "`": "&#96;",
    "[": "&#91;",
    "]": "&#93;",
    "{": "&#123;",
    "}": "&#125;",
  }

  const htmlEscapeRegex = /[&<>"'`\[\]{}]/g

  return str.replace(
    htmlEscapeRegex,
    char => htmlEscapes[char as keyof typeof htmlEscapes]
  )
}
