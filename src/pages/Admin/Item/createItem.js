import Create from "components/molecules/Item/create";

import React from "react";
import DashboardContent from "../dashboardContent";

export default function createItem() {
  return <DashboardContent title={"Create Item"} data={Create()} />;
}
