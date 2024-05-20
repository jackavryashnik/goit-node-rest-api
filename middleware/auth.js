import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }

    req.user = {
      id: decode.id,
      name: decode.name,
    };

    next();
  });
}

export default auth;
