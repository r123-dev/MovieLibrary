/**
 * Responsible for validating the parameters sent from the body
 * @param {Object} schema - function schema to be validated
 * @param {Object} key - Object containg the body, optional parameter
 * @returns
 */
const validator = (schema, key) => (req, res, next) => {
  try {
    let requestBody = req.body;
    if (key) {
      requestBody = req.body[key];
    }
    if (!requestBody) {
      res.status(400);
    } else {
      const { error } = schema.validate(requestBody);
      if (error) {
        res.status(400).json(error);
      } else next();
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = validator;
// const validator = (schema, key) => (req, res, next) => {
//   try {
//     let requestBody = req.body;
    
//     if (key) {
//       requestBody = req.body[key];
//     }

//     if (!requestBody) {
//       return res.status(400).json({ message: 'Bad Request: Request body is missing.' });
//     }
    
//     const { error } = schema.validate(requestBody);
//     if (error) {
//       return res.status(400).json({ message: 'Validation Error', details: error.details });
//     }
    
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal Server Error', error: err.message });
//   }
// };

// module.exports = validator;
