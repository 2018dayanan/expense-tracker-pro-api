const jsonwebtoken = require("jsonwebtoken");
const auth = async (req, res, next) => {
  //   console.log(req.headers);

  try {
    const accessToken = req.headers.authorization.replace("Bearer", "").trim();
    const jwt_payload = await jsonwebtoken.verify(
      accessToken,
      process.env.jwt_salt
    );
    req.user = jwt_payload;
  } catch (e) {
    res.status(401).json({
      status: false,
      message: "Unauthorized!",
    });
    return;
  }
  next();
};

module.exports = auth;
