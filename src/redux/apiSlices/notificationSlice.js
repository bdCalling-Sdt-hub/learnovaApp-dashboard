import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query({
      query: () => {
        return {
          url: `/notification/admin`,
          method: "GET",
        };
      },
    }),
    readNotification: builder.mutation({
      query: () => {
        return {
          url: "/notification/admin",
          method: "PATCH",
        };
      },
    }),
    readSingleNotification: builder.mutation({
      query: (id) => {
        return {
          url: `/notification/admin/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useNotificationQuery,
  useReadNotificationMutation,
  useReadSingleNotificationMutation,
} = notificationSlice;
