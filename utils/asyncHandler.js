const asyncHandler = (requestHandler) => async (req, res, next) => {
  await requestHandler(req, res).catch((err) => next(err));
};
export { asyncHandler };
