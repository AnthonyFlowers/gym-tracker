export const newError = (message?: string): never => {
    throw new Error(message);
};
