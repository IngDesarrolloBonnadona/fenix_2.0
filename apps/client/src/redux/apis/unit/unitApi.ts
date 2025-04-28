import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const unitApi = createApi({
  reducerPath: "unitApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/unit`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllUnits: builder.query<Unit[], null>({
      query: () => "listUnits",
    }),

    createUnit: builder.mutation({
      query: (newUnit) => ({
        url: "createUnit/",
        method: "POST",
        body: newUnit,
      }),
    }),

    updateUnit: builder.mutation<
      any,
      { id: number; updateUnit: Partial<Unit> }
    >({
      query: ({ id, updateUnit }) => ({
        url: `updateUnit/${id}/`,
        method: "PATCH",
        body: updateUnit,
      }),
    }),

    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `deleteUnit/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllUnitsQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
