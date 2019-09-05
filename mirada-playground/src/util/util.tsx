export function printMs(ms: number) {
  return (ms / 1000) + ''.padEnd(4, ' ') + ' seconds'
}

export function memoryReport() {
  var m = (performance as any).memory
  if (!m) {
    return {
      usedMb: 'N/A', totalMb: 'N/A', percent: 'N/A'
    }
  }
  return {
    usedMb: (m.usedJSHeapSize / 1048576).toFixed(2) + 'Mb',
    percent: (100 * m.usedJSHeapSize / m.totalJSHeapSize).toFixed(1) + '%',
  }
}

// export type Fn<args extends any[] = any[], returnValue extends any = any> = (...args: args) => returnValue


// export function asDataUrl(f: IFile): string | undefined {
//   var mime = f.name.endsWith('png') ? 'image/png' : 'image/jpeg'
//   return 'data:' + mime + ';' + f.name + ';base64,' + File.toBase64(File.asFile(f))
// }

export function msFrom(t0: number) {
  return (now() - t0) / 1000000
}
export function timeFrom(t0: number) {
  return `${((now() - t0) / 1000000).toPrecision(1)} ms`
}

const isBrowser = typeof performance !== 'undefined' && typeof performance.now === 'function'
export function now() {
  return isBrowser ? performance.now() : 0
}
