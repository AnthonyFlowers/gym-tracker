export enum ErrorMessage {
    SQLPromiserInitializationError = 'Could not initialize the SQL promiser worker.',
}

export const newError = (message?: string) => {
    throw new Error(message);
};
