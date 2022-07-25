import jwt from "jsonwebtoken";

const jwtGenerator = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export default jwtGenerator;
