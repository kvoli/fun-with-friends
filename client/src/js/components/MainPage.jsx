import React from "react";
import ArtifactGrid from "./ArtifactGrid";
// import LoginPage from "./LoginPage";

const MainPage = () => {

  const artifactData = [
    {
      id: 1,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 2,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 3,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 4,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 5,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 6,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 7,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 8,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 9,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 10,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 11,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 12,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 13,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 14,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 15,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 16,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 17,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 18,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    },
    {
      id: 19,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://www.usanimedirect.com/wp-content/uploads/2017/02/kanna-kamui.jpg",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      tags: [{ label: "family" }, { label: "friends" }, { label: "rare" }]
    }
  ];

  return (
    <div className="MainPage-Container">
      <ArtifactGrid artifacts={artifactData} />
    </div>
  )
}

export default MainPage;