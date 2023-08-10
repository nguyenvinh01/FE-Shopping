import React from "react";
import { AccountList } from "./AccountList";
import { HeaderAdmin } from "../../../components/HeaderAdmin/HeaderAdmin";

export const AdminAccounts = () => {
  return (
    <>
      <HeaderAdmin pageName="Accounts" />
      <AccountList />
    </>
  );
};
