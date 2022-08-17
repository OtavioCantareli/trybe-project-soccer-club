import InterfaceId from './InterfaceId';
import InterfaceUserLogin from './InterfaceUserLogin';

export default interface IUser extends InterfaceId, InterfaceUserLogin {
  username: string;
  role: string;
}
