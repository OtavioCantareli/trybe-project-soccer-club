import * as bcrypt from "bcryptjs";
import Token from "../utils/Token";
import User from "../database/models/UserModel";
import IntUser from "../interfaces/User";

class LoginService {
  login = async ({ email, password }: IntUser) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return { code: 401, message: "Incorrect email or password" };
    const correctPass = bcrypt.compareSync(password, user.password);
    if (!correctPass) {
      return { code: 401, message: "Incorrect email or password" };
    }
    const token = Token(user);
    return { code: 200, token };
  };
}

export default new LoginService();
