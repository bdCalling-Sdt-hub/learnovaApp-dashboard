import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "auth/verify-email",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "auth/forgot-password",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/reset-password",
          body: data,
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        };
      },
    }),

    changePassword: builder.mutation({
      query: (value) => {
        return {
          method: "POST",
          url: "/auth/change-password",
          body: value,
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/update-profile",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/admin/profile",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    adminProfile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/profile",
        };
      },
      providesTags: ["AdminData"],

      transformResponse: (user) => {
        return user;
      },
    }),
    fetchAdminProfile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/profile",
        };
      },
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useFetchAdminProfileQuery,
} = authSlice;
