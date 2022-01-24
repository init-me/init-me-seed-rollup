const root = self as unknown as Worker
root.onmessage = function(e) {
  root.postMessage(`back: ${e.data}`)
}
