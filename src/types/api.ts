export type GetSecureWordRequestBody = { username: string };
export type GetSecureWordRequestResponseSuccess = { secureWord: string };
export type GetSecureWordRequestResponseError = { message: string };

export type PostLoginRequestBody = { username: string; password: string };
export type PostLoginResponseSuccess = { success: true };
export type PostLoginResponseError = { message: string };
