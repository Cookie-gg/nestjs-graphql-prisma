// eslint-disable-next-line @typescript-eslint/ban-types
export type Response<T = {}> = Omit<request.Response, 'body'> & {
  body: { data: T; error: Error };
};
