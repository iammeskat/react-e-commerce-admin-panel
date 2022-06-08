import ImageGallery from "react-image-gallery";
import config from "../../../config/config";

const ProductPhotoSlider = (props) => {
  const images = props.photos.map((item) => {
    return {
      original: `${config.SERVER_URL}/file/images/${item}`,
      thumbnail: `${config.SERVER_URL}/file/images/${item}`,
    };
  });

  return (
    <div className="flex flex-col space-y-2 min-w-[20rem] 2xl:sticky 2xl:top-[5rem] mb-10">
      {/* <div className="w-full h-[20rem]">
        <img
          id="1"
          className="w-full h-full rounded"
          src="../images/user.png"
          alt=""
        />
        <img
          id="1"
          className="w-full h-full rounded hidden"
          src="../images/user.png"
          alt=""
        />
        <img
          id="1"
          className="w-full h-full rounded hidden"
          src="../images/user.png"
          alt=""
        />
        <img
          id="1"
          className="w-full h-full rounded hidden"
          src="../images/user.png"
          alt=""
        />
      </div>
      <div className="w-full flex justify-between h-20 ">
        <div className="flex space-x-1">
          <img id="1" className="w-16 h-16" src="../images/user.png" alt="" />
          <img id="1" className="w-16 h-16" src="../images/user.png" alt="" />
          <img id="1" className="w-16 h-16" src="../images/user.png" alt="" />
        </div>
        <div className="w-16 h-16 bg-gray-300 flex items-center justify-center">
          <label htmlFor="product-img">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <input
            type="file"
            name="product-img"
            id="product-img"
            className="hidden"
          />
        </div>
      </div> */}
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductPhotoSlider;
