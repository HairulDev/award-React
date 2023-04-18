import Category from "components/molecules/Category/index";

import React from "react";
import DashboardContent from "../dashboardContent";

export default function viewCategory() {
  return <DashboardContent title={"Category"} data={Category()} />;
}
