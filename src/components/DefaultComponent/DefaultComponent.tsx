import React, { useEffect } from "react";
import { HeaderCompoment } from "../Header/HeaderCompoment";
import { FooterComponent } from "../Footer/FooterComponent";
import "../../App.css";
import { useGetUserQuery } from "../../redux/apis/apiUser";
import { useDispatch } from "react-redux";
import { resetUser, setUser } from "../../redux/slice/userSlice";

type DefaultComponentType = {
  children: React.ReactNode;
};
export const DefaultComponent = ({ children }: DefaultComponentType) => {
  const { data, isLoading, isError } = useGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, isError, isLoading]);
  return (
    <div className="App">
      <div className="header">
        <HeaderCompoment></HeaderCompoment>
      </div>
      <div className="content">{children}</div>

      <div className="footer">
        <FooterComponent />
      </div>
    </div>
  );
};
