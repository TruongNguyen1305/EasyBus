import { DateTime } from "i18n-js/typings";
import { API } from "../base";

export interface User {
  id: string;
  fullName: string
  gender: Boolean;
  birthdate: DateTime;
  phone?: string;
  email: string;
  remainTickets: Ticket[];
  currentActiveTicket?: Ticket;
}

export interface Ticket {
  activatedTime: DateTime;
  type: TicketType
}

export enum TicketType {
  DAY,
  MONTH
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
    }),

    signin: build.query<{ user: User, access_token: string}, {
      email: string,
      password: string
    }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    signup: build.query<{ user: User, access_token: string }, {
      email: string,
      password: string,
      fullName: string,
    }>({
      query: (credentials) => ({
        url: 'auth',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery, useLazySigninQuery, useLazySignupQuery } = userApi;
