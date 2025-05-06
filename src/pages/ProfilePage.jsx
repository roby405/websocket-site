/* eslint-disable react/prop-types */
import placeholder from "../assets/placeholder.png";
import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import useFileUpload from "../hooks/useFileUpload.js";
import useFetch from "../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";

const ServerLocation = import.meta.env.VITE_API_BASE_URL;

export default function ProfilePage() {
  const validInputTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 2;

  const { handleFileSelect, handleFileUpload, preview } = useFileUpload(
    validInputTypes,
    maxSize
  );
  const [originalData, setOriginalData] = useState({
    username: "",
    usernameColor: "#000000",
    onlineStatus: "Online",
  });
  const [currentData, setCurrentData] = useState({
    username: "",
    usernameColor: "#000000",
    onlineStatus: "Online",
  });

  const navigate = useNavigate();

  const { data, execute } = useFetch(`api/whoami`);

  useEffect(() => {
    const exec = async () => execute();
    exec();
  }, [execute]);
  useEffect(() => {
    if (data) {
      const { username, usernameColor, onlineStatus } = data;
      setOriginalData({
        username: username || "undefined",
        usernameColor: usernameColor || "#000000",
        onlineStatus: onlineStatus || "Online",
      });
      setCurrentData({
        username: username || "undefined",
        usernameColor: usernameColor || "#000000",
        onlineStatus: onlineStatus || "Online",
      });
    }
  }, [data]);

  const submitChanges = async () => {
    const updateData = {};

    if (currentData.username !== originalData.username) {
      updateData.username = currentData.username;
    }
    if (currentData.onlineStatus !== originalData.onlineStatus) {
      updateData.onlineStatus = currentData.onlineStatus;
    }
    if (currentData.usernameColor !== originalData.usernameColor) {
      updateData.usernameColor = currentData.usernameColor;
    }

    if (currentData.onlineStatus !== originalData.onlineStatus) {
      updateData.onlineStatus = currentData.onlineStatus;
    }
    try {
      await fetch(`${ServerLocation}api/updateprofile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      });
    } catch (error) {
      console.error("unable to submit regular changes: " + error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="bg-zinc-100 h-full flex flex-row">
      <div className="flex-grow bg-gray-500 m-1 rounded-lg p-4 flex flex-col gap-3 border-2 border-neutral-300">
        <div className="flex flex-row mx-[20%] bg-gray-600 text-left text-white rounded-lg p-4">
          <ProfilePicture
            handleFileSelect={handleFileSelect}
            preview={preview}
          />
          <h1
            className="flex-grow pl-4 text-7xl text-center"
            style={{ color: currentData.usernameColor }}
          >
            {currentData.username}
          </h1>
        </div>
        <div className="flex-grow rounded-lg bg-gray-600 mx-[20%] px-24 pt-10 flex flex-col items-start gap-4">
          <div className="flex flex-row justify-between w-full">
            <h3 className="text-xl">Username</h3>
            <input
              type="text"
              value={currentData.username}
              onChange={(e) =>
                setCurrentData({ ...currentData, username: e.target.value })
              }
              className="bg-gray-700 rounded-lg px-3 py-1 w-1/2"
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-row justify-between w-full">
            <h3 className="text-xl">Online status</h3>
            <select
              value={currentData.onlineStatus}
              onChange={(e) =>
                setCurrentData({ ...currentData, onlineStatus: e.target.value })
              }
              className="bg-gray-700 rounded-lg"
            >
              <option value="online">Online</option>
              <option value="do_not_disturb">Do not disturb</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="flex flex-row justify-between w-full">
            <h3 className="text-xl">Username color</h3>
            <HexColorPicker
              color={currentData.usernameColor}
              onChange={(newColor) =>
                setCurrentData({ ...currentData, usernameColor: newColor })
              }
            />
          </div>
          <div className="w-full mt-auto pb-3 flex flex-row justify-end">
            <button className="" onClick={async () => await submitChanges()}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePicture({ handleFileSelect, preview }) {
  const fileRef = useRef(null);

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        ref={fileRef}
        hidden
      />
      <div
        className="bg-gray-600 hover:bg-gray-500 rounded-full"
        onClick={() => fileRef.current.click()}
      >
        <img
          className="w-24 h-24 rounded-full"
          src={preview ? preview : placeholder}
          alt="Preview"
        />
      </div>
    </>
  );
}
