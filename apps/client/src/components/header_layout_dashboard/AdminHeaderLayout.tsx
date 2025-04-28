"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hook";
import { signOut, useSession } from "next-auth/react";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";

import { getFirstNameAndFirstLastName } from "@/helpers/get_first_name/get_first_name";

import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";

const AdminHeaderLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  const fullNameUserSession = session?.user?.name;

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.push(
        `${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/user/dashboard/personal_data`,
        {
          scroll: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = async () => {
    await persistor.purge();

    await signOut();
  };

  return (
    <>
      {!fullNameUserSession ? (
        <CustomSpin />
      ) : (
        <CustomDropdown
          titleCustomDropdown={`HOLA, ${getFirstNameAndFirstLastName(fullNameUserSession)}`}
          iconCustomItem1={<PiUserListBold />}
          titleCustomItem1="Mis Datos Personales"
          iconCustomItem2={<FaSignOutAlt />}
          titleCustomItem2="Cerrar Sesión"
          handleClickCustomItem1={handleClickUpdatePersonalData}
          handleClickCustomItem2={handleClickSignOut}
          iconCustomDropdown={<UserOutlined />}
        />
      )}
    </>
  );
};

export default AdminHeaderLayout;
