import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const failedMeasureApi = createApi({
  reducerPath: "failed-measureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/failed-measures`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllFailedMeasures: builder.query<FailedMeasure[], null>({
      query: () => "listFailedMeasures",
    }),

    createFailedMeasure: builder.mutation({
      query: (newFailedMeasure) => ({
        url: "createFailedMeasure/",
        method: "POST",
        body: newFailedMeasure,
      }),
    }),

    updateFailedMeasure: builder.mutation<
      any,
      { id: number; updateFailedMeasure: Partial<FailedMeasure> }
    >({
      query: ({ id, updateFailedMeasure }) => ({
        url: `updateFailedMeasure/${id}/`,
        method: "PATCH",
        body: updateFailedMeasure,
      }),
    }),

    deleteFailedMeasure: builder.mutation({
      query: (id) => ({
        url: `deleteFailedMeasure/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllFailedMeasuresQuery,
  useCreateFailedMeasureMutation,
  useUpdateFailedMeasureMutation,
  useDeleteFailedMeasureMutation,
} = failedMeasureApi;
