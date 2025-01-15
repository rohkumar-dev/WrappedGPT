import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { List } from "./List";
import "@/app/globals.css"; // Import Tailwind CSS
import { mockTracks } from "@/fixtures/mockTracks";
import { mockArtists } from "@/fixtures/mockArtists";

export default {
  title: "Components/List",
  component: List,
} as StoryObj<typeof List>;

const Template: StoryFn<typeof List> = (args) => (
  <div className="bg-black min-h-screen text-white p-4">
    <List {...args} />
  </div>
);

export const Tracks = Template.bind({});
Tracks.args = {
  items: mockTracks,
};

export const Artists = Template.bind({});
Artists.args = {
  items: mockArtists,
};
