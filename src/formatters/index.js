'use strict'

const REQUEST_IS_DONE = 'Success'

function successFormatter(result) {
  return {
    status: {
      code: 200,
      message: REQUEST_IS_DONE
    },
    response: result
  }
}

module.exports = successFormatter