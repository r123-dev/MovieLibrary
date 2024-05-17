// function authenticator(req, res, next) {
//   const { user } = req.session;
//   if (!user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   return next();
// }

// module.exports = authentic
async function authenticator(req, res, next) {
  const { user } = await req.session;
  if (!user) {
    console.log('Unauthorized access attempt');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log('User authenticated:', user);
  return next();
}

module.exports =authenticator;
