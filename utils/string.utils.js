function pad (str, n = 0) {
  const isLeftPad = n > 0
  let remaining = Math.abs(n) - String(str).length
  let pads = ''

  while (remaining-- > 0) pads += ' '

  return isLeftPad ? `${pads}${str}` : `${str}${pads}`
}

export {
  pad
}
