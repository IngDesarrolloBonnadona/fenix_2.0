import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const severityClasificationApi = createApi({
  reducerPath: "severityClasificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/severity-clasification`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSeverityClasifications: builder.query<SeverityClasification[], null>({
      query: () => "listSeverityClasifications",
    }),

    getSeverityClasificationById: builder.query<SeverityClasification, number>({
      query: (Id) => `findSeverityClasification/${Id}`,
    }),

    createSeverityClasification: builder.mutation({
      query: (newSeverityClasification) => ({
        url: "createSeverityClasification/",
        method: "POST",
        body: newSeverityClasification,
      }),
    }),

    updateSeverityClasification: builder.mutation<
      any,
      {
        id: number;
        updateSeverityClasification: Partial<SeverityClasification>;
      }
    >({
      query: ({ id, updateSeverityClasification }) => ({
        url: `updateSeverityClasification/${id}/`,
        method: "PATCH",
        body: updateSeverityClasification,
      }),
    }),

    deleteSeverityClasification: builder.mutation({
      query: (id) => ({
        url: `deleteSeverityClasification/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSeverityClasificationsQuery,
  useGetSeverityClasificationByIdQuery,
  useCreateSeverityClasificationMutation,
  useUpdateSeverityClasificationMutation,
  useDeleteSeverityClasificationMutation,
} = severityClasificationApi;
