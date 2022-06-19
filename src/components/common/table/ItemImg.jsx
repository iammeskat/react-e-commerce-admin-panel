import { Link } from "react-router-dom";

const ItemImg = (props) => {
  const { link, imgLink, title } = props;
  return (
    <div>
      <Link
        to={link}
        className="flex items-center space-x-2 hover:text-indigo-500"
      >
        <img
          className="h-10 w-10 rounded-full border-2 border-gray-200"
          src={
            imgLink
              ? `http://localhost:3050/file/images/${imgLink}`
              : "../images/product.webp"
          }
          alt=""
        />
        {title && <p>{title}</p>}
      </Link>
    </div>
  );
};

export default ItemImg;
