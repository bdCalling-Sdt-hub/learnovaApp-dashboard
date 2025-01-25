import { api } from "../api/baseApi";

const termsAndConditionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: `/rule/terms-and-conditions`,
          method: "POST",
          body: data,
        };
      },
    }),
    termsAndCondition: builder.query({
      query: () => {
        return {
          url: `/rule/terms-and-conditions`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),

    //faq
    getAllFaq: builder.query({
      query: () => {
        return {
          url: `/faq`,
          method: "GET",
        };
      },
      providesTags: ["Faq"],
    }),
    addFaq: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/faq`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,

  //faq
  useGetAllFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = termsAndConditionSlice;
