import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";

const CreateProduct = () => {
  const userId = useParams().id;
  const [user, setUser] = useState();

  // fetch users
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/users/${userId}`)
      .then((res) => {
        isLoaded && setUser(res.data.data.user);
        console.log(res.data.data.user);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [userId]);
  return user ? (
    <div
      id="main-section"
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 transition-all duration-200"
    >
      {/* <PageHeader title="user Profile" /> */}
      <div className="flex space-x-4">
        <div className="w-[25rem] shadow rounded flex flex-col space-y-4 bg-white py-2 text-gray-800">
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-34 aspect-square rounded-full"
              src={`https://via.placeholder.com/300x300.png/f2f2f2?text=${
                user.name.split(" ")[0]
              }`}
              alt="profile"
            />
            <h1 className="font-bold text-4xl">{user.name}</h1>
          </div>
          <table className="w-full text-sm text-left text-gray-500 font-semibold ">
            <tbody>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Email:</th>
                <td className="px-4 py-1 text-gray-900">{user.email}</td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Phone:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.profile.phone}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Country:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.profile.country}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">State:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.profile.state}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">City:</th>
                <td className="px-4 py-1 text-gray-900">{user.profile.city}</td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Post Code:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.profile.postalCode}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Address:</th>
                <td className="px-4 py-1 text-gray-900">
                  <p>{user.profile.address1},</p>
                  <p>{user.profile.address2}</p>
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Status:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.status === "active" ? (
                    <span className="px-4 py-1 bg-green-100 rounded-full text-green-600">
                      Active
                    </span>
                  ) : (
                    <span className="px-4 py-1 bg-red-100 rounded-full text-red-500">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grow border">
          <h1>Right side</h1>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateProduct;
