import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }

  return headers;
};

export const deviceTypeApi = createApi({
  reducerPath: "deviceTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/device-type`,

    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  // refetchOnMountOrArgChange: true,

  // refetchOnFocus: true,

  // refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllDeviceTypes: builder.query<DeviceType[], null>({
      query: () => "listDeviceTypes",
    }),

    createDeviceType: builder.mutation({
      query: (newDeviceType) => ({
        url: "createDeviceType/",
        method: "POST",
        body: newDeviceType,
      }),
    }),

    updateDeviceType: builder.mutation<
      any,
      { id: number; updateDeviceType: Partial<DeviceType> }
    >({
      query: ({ id, updateDeviceType }) => ({
        url: `updateDeviceType/${id}/`,
        method: "PATCH",
        body: updateDeviceType,
      }),
    }),

    deleteDeviceType: builder.mutation({
      query: (id) => ({
        url: `deleteDeviceType/${id}/`,
        method: "DELETE",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllDeviceTypesQuery,
  useCreateDeviceTypeMutation,
  useUpdateDeviceTypeMutation,
  useDeleteDeviceTypeMutation,
} = deviceTypeApi;
