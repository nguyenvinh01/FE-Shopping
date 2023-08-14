import React from "react";
import { AccountList } from "./AccountList";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";
import { useGetAllUserQuery } from "../../../redux/apis/apiUser";

export const AdminAccounts = () => {
  const { data: userList, isFetching } = useGetAllUserQuery({});
  console.log(isFetching, "Admin");

  return (
    <>
      <HeaderAdmin pageName="Accounts" />
      <AccountList data={userList} isFetch={isFetching} />
    </>
  );
};
