export class Logger {
    static error(...args: Parameters<typeof console.error>) {
        console.error('[ERROR]', ...args)
    }

    static debug(...args: Parameters<typeof console.error>) {
        console.debug('[DEBUG]', ...args)
    }
}