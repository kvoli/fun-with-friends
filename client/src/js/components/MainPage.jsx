import React from "react";
import ArtifactGrid from "./ArtifactGrid";
import LoginPage from "./LoginPage";

const MainPage = () => {

  const artifactData = [
    {
      id: 1,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 2,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 3,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 4,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 5,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 6,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 7,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 8,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/andcontainerroid-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    },
    {
      id: 9,
      title: "Title",
      date: 1984,
      origin: "UK",
      src: "https://forums.androidcentral.com/attachments/android-games/241584d1475764994t-game-free-4-1-monster-run-retro-pixel-art-arcade-platformer-scarecrow.png",
      desc: "short description",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
    }
  ];

  return (
    <div className="MainPage-Container">
      <ArtifactGrid artifacts={artifactData} />
    </div>
  )
}

export default MainPage;