import Item from "components/molecules/Item/index";

import React from "react";
import DashboardContent from "../dashboardContent";

export default function viewItem() {
  return <DashboardContent title={"Item"} data={Item()} />;
}
