import { DateTime } from "i18n-js/typings";
import { API } from "../base";

export interface User {
  id: string;
  fullName: string
  gender?: boolean;
  birthdate?: DateTime;
  phone?: string;
  email: string;
  remainTickets?: Ticket[];
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

    signin: build.mutation<{ user: User, access_token: string}, {
      email: string,
      password: string
    }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    signup: build.mutation<{ user: User, access_token: string }, {
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

    updateProfile: build.mutation<User, {
      id: string,
      email: string,
      fullName: string,
      phone?: string,
      gender?: boolean,
      birthdate?: Date
    }>({
      query: (credentials) => ({
        url: `users/${credentials.id}`,
        method: 'PATCH',
        body: {
          email: credentials.email,
          fullName: credentials.fullName,
          phone: credentials.phone,
          gender: credentials.gender,
          birthdate: credentials.birthdate
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetUserQuery, useSigninMutation, useSignupMutation, useUpdateProfileMutation } = userApi;
