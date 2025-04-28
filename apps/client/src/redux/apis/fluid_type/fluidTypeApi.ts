import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const fluidTypeApi = createApi({
  reducerPath: "fluidTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/fluid-type`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllFluidTypes: builder.query<FluidType[], null>({
      query: () => "listFluidTypes",
    }),

    createFluidType: builder.mutation({
      query: (newFluidType) => ({
        url: "createFluidType/",
        method: "POST",
        body: newFluidType,
      }),
    }),

    updateFluidType: builder.mutation<
      any,
      { id: number; updateFluidType: Partial<FluidType> }
    >({
      query: ({ id, updateFluidType }) => ({
        url: `updateFluidType/${id}/`,
        method: "PATCH",
        body: updateFluidType,
      }),
    }),

    deleteFluidType: builder.mutation({
      query: (id) => ({
        url: `deleteFluidType/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllFluidTypesQuery,
  useCreateFluidTypeMutation,
  useUpdateFluidTypeMutation,
  useDeleteFluidTypeMutation,
} = fluidTypeApi;
