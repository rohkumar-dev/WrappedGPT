import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { Navbar } from "./Navbar";
import "@/app/globals.css"; // Import Tailwind CSS

export default {
  title: "Components/Navbar",
  component: Navbar,
} as StoryObj<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = () => (
  <div style={{ backgroundColor: "black", height: "100vh", color: "white" }}>
    <Navbar />
  </div>
);

export const Default = Template.bind({});