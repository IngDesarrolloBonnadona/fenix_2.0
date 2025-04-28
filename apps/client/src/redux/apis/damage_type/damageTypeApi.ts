import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const damageTypeApi = createApi({
  reducerPath: "damageTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/damage-type`,
    
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllDamageTypes: builder.query<DamageType[], null>({
      query: () => "listDamageTypes",
    }),

    createDamageType: builder.mutation({
      query: (newDamageType) => ({
        url: "createDamageType/",
        method: "POST",
        body: newDamageType,
      }),
    }),

    updateDamageType: builder.mutation<any, { id: number; updateDamageType: Partial<DamageType> }>({
      query: ({ id, updateDamageType }) => ({
        url: `updateDamageType/${id}/`,
        method: "PATCH",
        body: updateDamageType,
      }),
    }),

    deleteDamageType: builder.mutation({
      query: (id) => ({
        url: `deleteDamageType/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllDamageTypesQuery,
  useCreateDamageTypeMutation,
  useUpdateDamageTypeMutation,
  useDeleteDamageTypeMutation,
} = damageTypeApi;
