// Function to give response with { httpStatusCode }, { route } and {response}
const expressResponse = (res, httpStatusCode, route, response) => {
  res.status(httpStatusCode).json({
    message: `POST request handled for /${route}`,
    response: response,
  });
};

module.exports = expressResponse;
