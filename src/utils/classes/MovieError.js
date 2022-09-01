// Custom error class for better debugging of the application
export class MovieError extends Error {
    constructor(...params) {

      super(...params);
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, MovieError);
      }
  
      this.name = 'MovieError';
    }
}