class Response {
    message(message) {
        return message
    }

    success (message = 'Success', data = {} ) {
      return {
        status: 200,
        message,
        data
      }
    }
  
    fail (message = 'Fail', error = 'No Error Message') {
        return {
          status: 400,
          message,
          error
        }
      }
  
    unauthorizedError (data = {}, message = 'Unauthorized') {
      return {
        status: 401,
        message,
        data
      }
    }
  
    badRequest (data = {}, message = 'Bad Request') {
      return {
        status: 402,
        message,
        data
      }
    }
  
    serverError (data = {}, message = 'Internal Server Error') {
      return {
        status: 500,
        message,
        data
      }
    }
  }
  
  module.exports = new Response()
  
  
  