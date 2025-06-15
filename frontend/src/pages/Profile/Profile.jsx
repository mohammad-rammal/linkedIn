import Advertisement from "../../components/Advertisement/Advertisement";
import Card from "../../components/Card/Card";
import profileImage from "../../assets/images/profileImage.png";
import postReact from "../../assets/images/postReact.png";
import EditIcon from "@mui/icons-material/Edit";
import Post from "../../components/Post/Post";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import ImageModal from "../../components/ImageModal/ImageModal";
import EditInfoModal from "../../components/EditInfoModal/EditInfoModal";
import AboutModal from "../../AboutModal/AboutModal";
import ExperienceModal from "../../components/ExperienceModal/ExperienceModal";
import MessageModal from "../../components/MessageModal/MessageModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const [imageSetModal, setImageSetModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const { id, postId } = useParams();

  useEffect(() => {
 
  }, [ ])
  

  const handleImageModalOpenClose = () => {
    setImageSetModal((prev) => !prev);
  };

  const handleInfoModal = () => {
    setInfoModal((prev) => !prev);
  };

  const handleAboutModal = () => {
    setAboutModal((prev) => !prev);
  };

  const handleExperienceModal = () => {
    setExperienceModal((prev) => !prev);
  };

  const handleMessageModal = () => {
    setMessageModal((prev) => !prev);
  };

  const handleOnEditCover = () => {
    setImageSetModal(true);
    setCircularImage(false);
  };

  const handleCircularImage = () => {
    setImageSetModal(true);
    setCircularImage(true);
  };

  return (
    <div className="px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100 ">
      <div className="flex justify-between">
        {/* Left Side Main Section */}
        <div className="w-full md:w-[70%] ">
          {/* Entry */}
          <div>
            <Card padding={0}>
              <div className="w-full h-fit ">
                <div className="relative w-full h-[200px]  ">
                  <div
                    onClick={handleOnEditCover}
                    className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white "
                  >
                    <EditIcon />
                  </div>
                  <img
                    src={postReact}
                    alt="postReact"
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg  "
                  />
                  <div
                    onClick={handleCircularImage}
                    className="absolute object-cover top-24 left-6 z-10 "
                  >
                    <img
                      src={profileImage}
                      alt="profileImage"
                      className="w-35 h-35 rounded-full border-2 border-white cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-10 relative px-8 py-2">
                  <div
                    onClick={handleInfoModal}
                    className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white "
                  >
                    <EditIcon />
                  </div>
                  <div className="w-full ">
                    <div className="text-2xl">Username</div>
                    <div className="text-gray-700">Full Stack</div>
                    <div className="text-sm text-gray-500">City, Country</div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      2 Connections
                    </div>

                    <div className="md:flex w-full justify-between ">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Open to
                        </div>
                        <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Share
                        </div>
                        <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Logout
                        </div>
                      </div>

                      <div className="my-5 flex gap-5">
                        <div
                          onClick={handleMessageModal}
                          className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold"
                        >
                          Message
                        </div>
                        <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Connect
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* About */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">About</div>
                <div onClick={handleAboutModal} className="cursor-pointer">
                  <EditIcon />
                </div>
              </div>
              <div className="text-gray-700 text-md w-[80%] ">
                About me section
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Skills</div>
              </div>
              <div className="text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap ">
                <div className="cursor-pointer py-2 px-3 rounded-lg bg-blue-800 text-white ">
                  HTML
                </div>
              </div>

              {/* Activity */}
              <div className="mt-5">
                <Card padding={0}></Card>
              </div>
            </Card>
          </div>

          {/* Activity */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Activity</div>
              </div>
              <div className="px-3 py-1 w-fit border-1 rounded-4xl bg-green-800 text-white font-semibold cursor-pointer">
                Posts
              </div>

              {/* Parent div for scrollable activities */}
              <div className="overflow-x-auto my-2 gap-1 flex overflow-y-hidden w-full">
                <Link
                  to={`/profile/${id}/activities/${postId}`}
                  className="shrink-0 w-[350px] h-[560px] cursor-pointer "
                >
                  <Post profile={1} />
                </Link>
              </div>

              <div className="w-full flex justify-center items-center ">
                <Link
                  to={`/profile/${id}/activities`}
                  className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                >
                  Show All Posts <ArrowRightAltIcon />
                </Link>
              </div>
            </Card>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Experience</div>
                <div onClick={handleExperienceModal} className="cursor-pointer">
                  <AddIcon />
                </div>
              </div>
              <div className="mt-5 ">
                <div className="p-2 border-t-1 border-gray-300 flex justify-between ">
                  <div className="">
                    <div className="text-lg">@Job | Job</div>
                    <div className="text-sm text-gray-500">Office</div>
                    <div className="text-sm text-gray-500">
                      Start Date, Present
                    </div>
                    <div className="text-sm text-gray-500">City, Country</div>
                  </div>
                  <div
                    onClick={handleExperienceModal}
                    className="cursor-pointer"
                  >
                    <EditIcon />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:w-[28%]">
          <div className="sticky top-19">
            <Advertisement />
          </div>
        </div>
      </div>

      {imageSetModal && (
        <Modal title="Upload Image" closeModal={handleImageModalOpenClose}>
          <ImageModal isCircular={circularImage} />
        </Modal>
      )}

      {infoModal && (
        <Modal title="Edit Info" closeModal={handleInfoModal}>
          <EditInfoModal />
        </Modal>
      )}

      {aboutModal && (
        <Modal title="Edit About" closeModal={handleAboutModal}>
          <AboutModal />
        </Modal>
      )}

      {experienceModal && (
        <Modal title="Add Experience" closeModal={handleExperienceModal}>
          <ExperienceModal />
        </Modal>
      )}

      {messageModal && (
        <Modal title="Send Message" closeModal={handleMessageModal}>
          <MessageModal />
        </Modal>
      )}
    </div>
  );
};
export default Profile;
