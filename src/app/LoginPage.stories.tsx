import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import LoginPage from "@/app/page";
import "@/app/globals.css"; // Import Tailwind CSS

export default {
  title: "Pages/LoginPage",
  component: LoginPage,
} as StoryObj<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = () => <LoginPage />;

export const Default = Template.bind({});
