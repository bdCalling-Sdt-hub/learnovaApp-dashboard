import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    getStudents: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/admin/students?page=${page}`,
        };
      },
    }),
    getStudentById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/student/${id}`,
        };
      },
    }),

    getTeachers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/teachers",
        };
      },
    }),
    getTeacherById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/teacher/${id}`,
        };
      },
    }),
    approveRestrictTeacher: builder.mutation({
      query: (id) => {
        return {
          method: "PATCH",
          url: `/admin/approved-and-rejected-teacher/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useApproveRestrictTeacherMutation,
} = userSlice;
