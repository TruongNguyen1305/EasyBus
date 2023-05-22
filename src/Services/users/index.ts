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
  favouriteBus: string[],
  favouriteStation: string[]
}

export interface Ticket {
  remainTurn: number;
  type: TicketType
}

export enum TicketType {
  DAY='DAY',
  MONTH='MONTH',
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

    getAllTicket: build.query<{
      normalTickets: number,
      monthTickets: number
    }, string>({
      query: (id) => `users/${id}/tickets`,
    }),

    getCurrentActiveTicket: build.query<{
      currentActiveTicket: Ticket
    }, string>({
      query: (id) => `users/${id}/tickets/currentActive`,
    }),

    activateTicket: build.mutation<{
      currentActiveTicket: Ticket
    }, {
      id: string,
      type: string
    }>({
      query: (credentials) => ({
        url: `users/${credentials.id}/tickets`,
        method: 'PATCH',
        body: {
          type: credentials.type
        },
      }),
    }),

  }),
  overrideExisting: true,
});

const favouriteAPI = API.injectEndpoints({
  endpoints: (build) => ({
    getFavourite: build.query<string[], string>({
      query: (route) => `favourite/${route}`,
    }),

    updateFavourite: build.mutation<string[], {route: string, id: string}>({
      query: ({ route, id }) => ({
        url: `favourite/${route}/${id}`,
        method: 'POST',
      })
    }),
  }),
});


export const { useLazyGetUserQuery, useSigninMutation, useSignupMutation, useUpdateProfileMutation, useGetCurrentActiveTicketQuery, useGetAllTicketQuery, useActivateTicketMutation} = userApi;
export const { useGetFavouriteQuery, useUpdateFavouriteMutation} = favouriteAPI;