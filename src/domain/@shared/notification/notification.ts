export type NotificationErrorProps = {
    message: string
    context: string
}

export default class Notification {
    private _errors: NotificationErrorProps[] = []

    addError(error: NotificationErrorProps): void {
        this._errors.push(error)
    }

    messages(context?: string): string {
        return this._errors
                    .filter(error => (error.context === context || context === undefined))
                    .map(error => `${error.context}: ${error.message}`)
                    .join(',')
    }

    hasErrors(context?: string): boolean {
        return this._errors
            .filter(error => (error.context === context || context === undefined))
            .length > 0
    }

    get errors(): NotificationErrorProps[] {
        return this._errors
    }

    getErrors(): NotificationErrorProps[] {
        return this._errors
    }
}