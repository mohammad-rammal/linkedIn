import Advertisement from "../../components/Advertisement/Advertisement";
import Card from "../../components/Card/Card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Conversation from "../../components/Conversation/Conversation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import profileImage from "../../assets/images/profileImage.png";
import ImageIcon from "@mui/icons-material/Image";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const Messages = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const emojiPickerRef = useRef(null); // for picker container
  const emojiToggleRef = useRef(null); // for emoji button

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiToggleRef.current &&
        !emojiToggleRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  // const handleEmojiClick = (emojiData) => {
  //   const hexCode = [...emojiData.emoji]
  //     .map((char) => char.codePointAt(0).toString(16))
  //     .join("-");
  //   setMessage((prev) => prev + `:emoji_${hexCode}:`);
  // };

  // const renderEmojis = (text) => {
  //   return text.replace(/:emoji_([a-z0-9-]+):/gi, (_, hex) => {
  //     const codePoints = hex.split("-").map((h) => parseInt(h, 16));
  //     return String.fromCodePoint(...codePoints);
  //   });
  // };
  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      <div className="w-full justify-between flex pt-5 ">
        {/* Left Side */}
        <div className="w-full md:w-[70%]">
          <Card padding={0}>
            <div className="border-b-1 border-gray-300 px-5 py-2 font-semibold text-lg-center ">
              Messaging
            </div>

            <div className="border-b-1 border-gray-300 px-5 py-2 ">
              <div className="py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white ">
                Focused <ArrowDropDownIcon />
              </div>
            </div>

            {/* Chat */}
            <div className="w-full md:flex ">
              <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r-1 border-gray-400 ">
                {/* for each chat */}
                <Conversation />
              </div>

              <div className="w-full md:w-[60%] border-gray-400">
                <div className="border-gray-300 py-2 px-4 border-b-2 flex justify-between items-center">
                  <div className="">
                    <p className="text-sm font-semibold">Username</p>
                    <p className="text-sm text-gray-400">
                      Hello this is username
                    </p>
                  </div>
                  <div>
                    <MoreHorizIcon />
                  </div>
                </div>

                <div className="h-[360px] w-full overflow-auto border-b-1 border-gray-300 ">
                  <div className="w-full border-b-1 border-gray-300 gap-3 p-4">
                    <img
                      src={profileImage}
                      alt="profileImage"
                      className="w-16 h-15 rounded-[100%] cursor-pointer"
                    />
                    <div className="my-2">
                      <div className="text-md">Username</div>
                      <div className="text-sm text-gray-500">
                        Hello this is username
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    {/* for each messages */}
                    <div className="flex w-full cursor-pointer border-gray-300 gap-3 p-4">
                      <div className="shrink-0">
                        <img
                          src={profileImage}
                          alt="profileImage"
                          className="w-8 h-8 rounded-[100%] cursor-pointer"
                        />
                      </div>
                      <div className="mb-2 w-full">
                        <div className="text-md">Username</div>
                        <div className="text-sm mt-6 hover:bg-gray-400">
                          Hello
                        </div>
                        <div className="my-2">
                          <img
                            src={profileImage}
                            alt="profileImage"
                            className="w-[240px] h-[180px] rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typing message */}
                <div className="p-2 w-full border-b-1 border-gray-200">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="bg-gray-200 outline-0 rounded-xl text-sm-center w-full p-3"
                    placeholder="Write a message"
                  />
                </div>
                <div className="p-3 flex justify-between">
                  <div className="items-center flex justify-between">
                    <label htmlFor="messageImage" className="cursor-pointer">
                      <ImageIcon />
                    </label>
                    <input type="file" id="messageImage" className="hidden" />
                    <div className="relative">
                      <button
                        ref={emojiToggleRef}
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        style={{
                          marginTop: "5px",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        😊
                      </button>

                      {showEmojiPicker && (
                        <div
                          ref={emojiPickerRef}
                          style={{
                            position: "absolute",
                            bottom: "60px",
                            right: "10px",
                            zIndex: 1000,
                          }}
                        >
                          <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            previewConfig={{ showPreview: false }}
                            width={300}
                            height={400}
                            allowFrequentEmojiSort={false}
                            lazyLoadEmojis={true}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-3 py-1 cursor-pointer rounded-2xl border-1 bg-blue-950 text-white">
                    Send
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:w-[25%]">
          <div className="sticky top-19">
            <Advertisement />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Messages;
