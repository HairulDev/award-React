import Create from "components/molecules/Category/create";
import React from "react";
import DashboardContent from "../dashboardContent";

export default function createCategory() {
  return <DashboardContent title={"Create Category"} data={Create()} />;
}
