export interface Unsubscribable {
}
export type ObservableNotification<T> = NextNotification<T> | ErrorNotification | CompleteNotification;
export interface NextNotification<T> {
}
export interface ErrorNotification {
}
export interface CompleteNotification {
}
