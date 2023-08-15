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
      console.log("error data", isError);
      dispatch(setUser(data.data));
    }
    if (isError) {
      console.log("error", isError);

      dispatch(resetUser({}));
    }
  }, [data, isError]);
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
