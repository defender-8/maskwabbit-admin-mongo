import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../../App/Layout";
import ClientInfo from "./components/ClientInfo";
import ClientOrders from "./components/Orders";

import { getById } from "../../../redux/modules/client";
import { Empty, GoBackButton, Spin } from "../../../base/components";

function SinglePage({
  match: {
    params: { id },
  },
}) {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  const { loading, getError, errorMessage, successMessage, dataSingle } =
    useSelector((state) => state.client);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getById(token, id));
    }
  }, [id]);

  return (
    <Layout title="Client Info">
      {loading ? (
        <Spin />
      ) : getError ? (
        <>
          <GoBackButton />
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </>
      ) : (
        <>
          <GoBackButton className="mb-3" />
          <div className="container-sm d-flex-space-between">
            <ClientInfo {...dataSingle} />
            <ClientOrders id={id} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default SinglePage;
