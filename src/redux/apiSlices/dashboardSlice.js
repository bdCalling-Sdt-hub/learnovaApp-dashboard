import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStats: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/home-summary-count",
        };
      },
    }),
    overAllState: builder.query({
      query: ({ range }) => {
        return {
          method: "GET",
          url: `/dashboard/overall-stat?range=${range}`,
        };
      },
    }),

    bestServices: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/best-services",
        };
      },
    }),

    vendorsConversionData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/vendor-order-conversion-rate",
        };
      },
    }),

    salesAndRevenueChart: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/home-sales",
        };
      },
    }),

    subscriptionMetrics: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/home-metrics",
        };
      },
    }),
  }),
});

export const {
  useGeneralStatsQuery,
  useOverAllStateQuery,
  useBestServicesQuery,
  useVendorsConversionDataQuery,
  useSalesAndRevenueChartQuery,
  useSubscriptionMetricsQuery,
} = dashboardSlice;
