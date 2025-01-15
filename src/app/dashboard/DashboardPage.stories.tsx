import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import DashboardPage from "./page";
import "@/app/globals.css"; // Import Tailwind CSS
import { mockDashboardData } from "@/fixtures/mockDashboardData";

export default {
  title: "Pages/DashboardPage",
  component: DashboardPage,
} as StoryObj<typeof DashboardPage>;

const Template: StoryFn<typeof DashboardPage> = (args) => (
  <div className="bg-black h-screen w-screen text-white">
    <DashboardPage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: mockDashboardData
};
