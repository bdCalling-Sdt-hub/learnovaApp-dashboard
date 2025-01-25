import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionData: builder.query({
      query: () => {
        return {
          url: `/subscription/admin`,
          method: "GET",
        };
      },
    }),
    editSubscriptionPackage: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/package/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetSubscriptionDataQuery,
  useEditSubscriptionPackageMutation,
} = subscriptionSlice;
