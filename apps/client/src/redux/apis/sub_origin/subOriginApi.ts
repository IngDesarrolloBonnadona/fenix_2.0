import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const subOriginApi = createApi({
  reducerPath: "subOriginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/sub-origin`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllSubOrigins: builder.query<SubOrigin[], null>({
      query: () => "listSubOrigins",
    }),

    getSubOriginById: builder.query<SubOrigin, number>({
      query: (Id) => `findSubOrigin/${Id}`,
    }),

    getAllSubOriginsByOriginId: builder.query<SubOrigin[], number>({
      query: (originId) => `findSubOriginByOriginId/${originId}`,
    }),

    createSubOrigin: builder.mutation<any, Partial<SubOrigin>>({
      query: (newSubOrigin) => ({
        url: "createSubOrigin/",
        method: "POST",
        body: newSubOrigin,
      }),
    }),

    updateSubOrigin: builder.mutation<
      any,
      { id: number; updateSubOrigin: Partial<SubOrigin> }
    >({
      query: ({ id, updateSubOrigin }) => ({
        url: `updateSubOrigin/${id}/`,
        method: "PATCH",
        body: updateSubOrigin,
      }),
    }),

    deleteSubOrigin: builder.mutation({
      query: (id) => ({
        url: `deleteSubOrigin/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllSubOriginsQuery,
  useGetSubOriginByIdQuery,
  useGetAllSubOriginsByOriginIdQuery,
  useCreateSubOriginMutation,
  useUpdateSubOriginMutation,
  useDeleteSubOriginMutation,
} = subOriginApi;
