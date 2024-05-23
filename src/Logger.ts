export default class Logger {
    constructor (private readonly _prefix?: string, private readonly silent = true) {}

    private get prefix () {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

        return this._prefix
            ? `[${this._prefix} ${date}]`
            : `[${date}]`
    }

    private alert (...args: unknown[]) {
        const alertContent = args.reduce<string>(
            (acc, el) => {
                if (typeof el === 'string') {
                    return `${acc}\n${el}`
                }

                return `${acc}\n${JSON.stringify(el)}`
            },
            ''
        )

        alert(alertContent)
    }

    public log (...args: unknown[]) {
        if (this.silent) {
            return
        }

        console.log(this.prefix, ...args)

        this.alert('LOG', this.prefix, ...args)
    }

    public error (...args: unknown[]) {
        if (this.silent) {
            return
        }

        console.error(this.prefix, ...args)

        this.alert('ERROR', this.prefix, ...args)
    }

    public warn (...args: unknown[]) {
        if (this.silent) {
            return
        }

        console.warn(this.prefix, ...args)

        this.alert('WARN', this.prefix, ...args)
    }
}