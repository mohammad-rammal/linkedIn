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
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [ownData, setOwnData] = useState(null);

  const [updateExperience, setUpdateExperience] = useState({
    clicked: "",
    id: "",
    dates: {},
  });

  const [imageSetModal, setImageSetModal] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModal, setInfoModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchDataOnLoad();
  }, [id]);

  const fetchDataOnLoad = async () => {
    try {
      const [userDatas, postDatas, ownDatas] = await Promise.all([
        axios.get(`http://localhost:5000/api/user/${id}`),
        axios.get(`http://localhost:5000/api/post/getTop5Post/${id}`),
        axios.get("http://localhost:5000/api/auth/self", {
          withCredentials: true,
        }),
      ]);

      setUserData(userDatas.data.user);
      setPostData(postDatas.data.post);
      setOwnData(ownDatas.data.user);

      localStorage.setItem("userInfo", JSON.stringify(ownDatas.data.user));
    } catch (err) {
      console.log("API error: ", err);
      toast.error("Something went wrong!");
    }
  };

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
    if (experienceModal) {
      setUpdateExperience({ clicked: "", id: "", dates: {} });
    }
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

  const handleEditFunction = async (data) => {
    await axios
      .put(
        "http://localhost:5000/api/user/update",
        { user: data },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("API error: ", err);
        toast.error("Something went wrong!");
      });
  };

  const updateExperienceEdit = (id, data) => {
    setUpdateExperience({ ...updateExperience, clicked: true, id, data });
    setExperienceModal((prev) => !prev);
  };

  const amIFriend = () => {
    let arr = userData?.friends?.filter((item) => {
      return item === ownData?._id;
    });

    return arr?.length;
  };

  const isInPendingList = () => {
    let arr = userData?.pendingFriends?.filter((item) => {
      return item === ownData?._id;
    });

    return arr?.length;
  };

  const isInSelfPendingList = () => {
    let arr = ownData?.pendingFriends?.filter((item) => {
      return item === userData?._id;
    });

    return arr?.length;
  };

  const checkFriendStatus = () => {
    if (amIFriend()) {
      return "Disconnect";
    } else if (isInSelfPendingList()) {
      return "Approve Request";
    } else if (isInPendingList()) {
      return "Request Sent";
    } else {
      return "Connect";
    }
  };

  const handleSendFriendRequest = async () => {
    if (checkFriendStatus() === "Request Sent") return;

    if (checkFriendStatus() === "Connect") {
      await axios
        .post(
          "http://localhost:5000/api/user/sendFriendRequest",
          {
            receiver: userData?._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log("API error: ", err);
          toast.error(err?.response?.data?.err);
        });
    }

    if (checkFriendStatus() === "Approve Request") {
      await axios
        .post(
          "http://localhost:5000/api/user/acceptFriendRequest",
          {
            friendId: userData?._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log("API error: ", err);
          toast.error(err?.response?.data?.err);
        });
    }

    if (checkFriendStatus() === "Disconnect") {
      await axios
        .delete(
          `http://localhost:5000/api/user/removeFromFriendList/${userData?._id}`,

          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log("API error: ", err);
          toast.error(err?.response?.data?.err);
        });
    }
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
                  {userData?._id === ownData?._id && (
                    <div
                      onClick={handleOnEditCover}
                      className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white "
                    >
                      <EditIcon />
                    </div>
                  )}
                  <img
                    src={userData?.coverPicture}
                    alt="postReact"
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg  "
                  />
                  <div
                    onClick={handleCircularImage}
                    className="absolute object-cover top-24 left-6 z-10 "
                  >
                    <img
                      src={userData?.profilePicture}
                      alt="profileImage"
                      className="w-35 h-35 rounded-full border-2 border-white cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mt-10 relative px-8 py-2">
                  {userData?._id === ownData?._id && (
                    <div
                      onClick={handleInfoModal}
                      className="absolute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white "
                    >
                      <EditIcon />
                    </div>
                  )}
                  <div className="w-full ">
                    <div className="text-2xl capitalize">
                      {userData?.fullName}
                    </div>
                    <div className="text-gray-700">{userData?.headline}</div>
                    <div className="text-sm text-gray-500">
                      {userData?.currentLocation}
                    </div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      {userData?.friends?.length} Connections
                    </div>

                    <div className="md:flex w-full justify-between ">
                      <div className="my-5 flex gap-5">
                        <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Open to
                        </div>
                        <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                          Share
                        </div>
                        {userData?._id === ownData?._id && (
                          <div className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold">
                            Logout
                          </div>
                        )}
                      </div>

                      <div className="my-5 flex gap-5">
                        {amIFriend() ? (
                          <div
                            onClick={handleMessageModal}
                            className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold"
                          >
                            Message
                          </div>
                        ) : null}

                        {userData?._id === ownData?._id ? null : (
                          <div
                            onClick={handleSendFriendRequest}
                            className="cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold"
                          >
                            {checkFriendStatus()}
                          </div>
                        )}
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
                {userData?._id === ownData?._id && (
                  <div onClick={handleAboutModal} className="cursor-pointer">
                    <EditIcon />
                  </div>
                )}
              </div>
              <div className="text-gray-700 text-md w-[80%] ">
                {userData?.about}
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
                {userData?.skills?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer py-2 px-3 rounded-lg bg-blue-800 text-white "
                    >
                      {item}
                    </div>
                  );
                })}
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
                {postData?.map((item, index) => (
                  <Link
                    to={`/profile/${ownData?._id}/activities/${item?._id}`}
                    key={index}
                    className="shrink-0 w-[350px] h-[560px] cursor-pointer "
                  >
                    <Post
                      key={index}
                      profile={1}
                      item={item}
                      personalData={ownData}
                      postKey={index}
                      linkTo={`/profile/${id}/activities/${item?._id}`}
                    />
                  </Link>
                ))}
              </div>

              {/* <div className="overflow-x-auto my-2 gap-1 flex overflow-y-hidden w-full">
                {postData?.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/profile/${id}/activities/${item?._id}`}
                      className="shrink-0 w-[350px] h-[560px] cursor-pointer "
                    >
                      <Post
                        profile={1}
                        item={item}
                        personalData={ownData}
                        postKey={index}
                      />
                    </Link>
                  );
                })}
              </div> */}

              {postData?.length > 5 && (
                <div className="w-full flex justify-center items-center ">
                  <Link
                    to={`/profile/${id}/activities`}
                    className="p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                  >
                    Show All Posts <ArrowRightAltIcon />
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-xl">Experience</div>
                {userData?._id === ownData?._id && (
                  <div
                    onClick={handleExperienceModal}
                    className="cursor-pointer"
                  >
                    <AddIcon />
                  </div>
                )}
              </div>

              <div className="mt-5 ">
                {userData?.experience?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 border-t-1 border-gray-300 flex justify-between "
                    >
                      <div>
                        <div className="text-lg">{item?.designation}</div>
                        <div className="text-sm text-gray-500">
                          {item?.companyName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item?.duration}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item?.location}
                        </div>
                      </div>
                      {userData?._id === ownData?._id && (
                        <div
                          onClick={() => updateExperienceEdit(item._id, item)}
                          className="cursor-pointer"
                        >
                          <EditIcon />
                        </div>
                      )}
                    </div>
                  );
                })}
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
          <ImageModal
            handleEditFunction={handleEditFunction}
            selfData={ownData}
            isCircular={circularImage}
          />
        </Modal>
      )}

      {infoModal && (
        <Modal title="Edit Info" closeModal={handleInfoModal}>
          <EditInfoModal
            handleEditFunction={handleEditFunction}
            selfData={ownData}
          />
        </Modal>
      )}

      {aboutModal && (
        <Modal title="Edit About" closeModal={handleAboutModal}>
          <AboutModal
            handleEditFunction={handleEditFunction}
            selfData={ownData}
          />
        </Modal>
      )}

      {experienceModal && (
        <Modal title="Add Experience" closeModal={handleExperienceModal}>
          <ExperienceModal
            handleEditFunction={handleEditFunction}
            selfData={ownData}
            updateExperience={updateExperience}
            setUpdateExperience={setUpdateExperience}
          />
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
