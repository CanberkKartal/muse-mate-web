// Static export compatibility - no server client needed
export function createClient() {
  throw new Error('Server client not available in static export')
}