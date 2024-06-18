export type ISubscription = {
  id?: number;
  userId: string;
  stripeCustomerId: string;
  stripeStatus: string | null;
  stripePriceId: string | null;
  quantity: number | null;
  trialEndsAt: number | null;
  endsAt: number | null;
  startDate: number | null;
  lastEventDate: number | null;

  /**
   * A date in the future at which the subscription will automatically get canceled
   */
  cancel_at: number | null;

  /**
   * If the subscription has been canceled with the `at_period_end` flag set to `true`, `cancel_at_period_end` on the subscription will be true. You can use this attribute to determine whether a subscription that has a status of active is scheduled to be canceled at the end of the current period.
   */
  cancel_at_period_end: boolean;

  /**
   * If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will reflect the time of the most recent update request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
   */
  canceled_at: number | null;

  /**
   * End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
   */
  current_period_end: number;

  /**
   * Start of the current period that the subscription has been invoiced for.
   */
  current_period_start: number;
};
