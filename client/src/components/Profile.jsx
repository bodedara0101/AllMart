import React, { useEffect, useRef, useState } from "react";
import { Camera, Mail, MapPin, Briefcase, Edit2, Save, X, TimerIcon, LogInIcon } from "lucide-react";
import { toast } from "react-toastify";
import ImgPreview from "./ImgPreview";

const Profile = () => {

  const profilePicRef = useRef(null)
  const [userP, setUserP] = useState("");
  const [imagePreview, setImagePreview] = useState(false);
  const token = localStorage.getItem("token");

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "Ahemadabad, Gujarat, India",
    bio: "Frontend Developer passionate about creating beautiful user interfaces",
    role: "Senior Developer",
  });

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const response = await fetch("http://localhost:8000/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        console.log(user);
        setUserP((prev)=>user.user);
        {
          user.user.role === "admin"
            && toast.success(`Welcome ${user.user.username}`)
        }
      };
      fetchUser();
    } else {
      setUserP(null);
    }
  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle save logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ImgPreview image={userP.image} imagePreview={imagePreview} setImagePreview={setImagePreview}/>
      <div className="max-w-3xl mx-auto p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-10 left-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl font-bold text-gray-600 capitalize">
                      <img
                      ref={profilePicRef}
                      onClick={() => setImagePreview(!imagePreview)}
                        src={
                          userP.image
                            ? userP.image
                            : "https://tse4.mm.bing.net/th?id=OIP.Yaficbwe3N2MjD2Sg0J9OgHaHa&pid=Api&P=0&h=180"
                        }
                        alt=""
                        className="cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-12 px-6 pb-6">
            <form onSubmit={handleSave}>
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 justify-between">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userP.username}
                        onChange={handleChange}
                        className="text-2xl font-bold capitalize text-gray-900 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 px-2 py-1 w-full transition-all duration-200"
                      />
                    ) : (
                      <>
                        <h1 className="text-2xl capitalize font-bold text-gray-900">
                          {userP.username}
                        </h1>
                        <div>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="role"
                      value={userP.role}
                      onChange={handleChange}
                      className="text-sm capitalize text-gray-500 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 px-2 py-1 w-full transition-all duration-200"
                    />
                  ) : (
                    <p className="text-sm capitalize text-gray-500">{userP.role}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <LogInIcon className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userP.lastLogin}
                        onChange={handleChange}
                        className="flex-1 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 px-2 py-1 transition-all duration-200"
                      />
                    ) : (
                      <span>{userP.lastLogin}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        className="flex-1 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 px-2 py-1 transition-all duration-200"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 px-3 py-2 transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.bio}</p>
                  )}
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-105"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["Projects", "Team Members", "Experience"].map((stat, index) => (
            <div
              key={stat}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-gray-900">{stat}</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {index === 0 ? "12" : index === 1 ? "8" : "5 yrs"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
