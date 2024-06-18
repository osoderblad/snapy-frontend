export interface IUser {
  id?: number;
  //   username: string
  //  name: string
  first_name?: string;
  last_name?: string;
  //   loginType?: string
  //   password?: string
  email?: string;
  //   avatarUrl?: string
  // subscription?: ISubscription | null
  stripeCustomerId?: string | null;

  stripeCustomerId_test?: string | null;
}
