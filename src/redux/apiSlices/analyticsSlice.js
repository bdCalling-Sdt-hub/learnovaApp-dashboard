import { api } from "../api/baseApi";

const analyticsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    chartData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/analytics",
        };
      },
    }),
    topCourseAndShorts: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/top-courses-and-shorts",
        };
      },
    }),
  }),
});

export const { useChartDataQuery, useTopCourseAndShortsQuery } = analyticsSlice;
