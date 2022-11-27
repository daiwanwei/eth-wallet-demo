
export function getIsInjected(): boolean {
  return Boolean(window.ethereum)
}

export function getIsMetaMask(): boolean {
  if (typeof window !== "undefined") {
    if (window && window.ethereum?.isMetaMask) return true
  }
  return false
}


