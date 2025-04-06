import {User} from './user.model';

export interface AuthenticationResponse {
  userDetails: User;
  message: string;
  success: boolean;
}
