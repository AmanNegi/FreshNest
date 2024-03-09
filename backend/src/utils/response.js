function getErrorResponse (message) {
  return {
    statusCode: 404,
    message
  }
}
function getSuccessResponse (message, data) {
  return {
    statusCode: 200,
    message,
    data
  }
}
module.exports = { getErrorResponse, getSuccessResponse }
