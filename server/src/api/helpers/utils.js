function formatUserResponse(user) {
  return {
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    description: user.description,
    watchlist: user.watchlist,
  };
}

module.exports = {
  formatUserResponse,
};
