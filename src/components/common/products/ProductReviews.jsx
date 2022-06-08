import IconStarSmall from "../icons/IconStarSmall";

const ProductReviews = (props) => {
  return (
    <div className="grow flex flex-col space-y-2">
      <h2>Reviews</h2>
      <div className="h-52 overflow-y-auto space-y-3 scrollbar-reviews pr-2">
        {props.reviews.map((item, indx) => {
          return (
            <div
              key={indx}
              className="w-full border-dashed border rounded p-3 space-y-3"
            >
              <div className="flex space-x-3">
                <div className="flex items-center rounded-full bg-teal-500 p-0.5 px-1 text-xs h-4 text-white font-medium">
                  <IconStarSmall />
                  <span>{item.rating}</span>
                </div>
                <span className="border-l pl-3 text-sm text-gray-500">
                  {item.review}
                </span>
              </div>
              <div className="flex space-x-2"></div>
              <div className="flex  justify-between items-center">
                <span>{item.user ? item.user.name : "N/A"}</span>
                <span className="text-sm text-gray-400">
                  {new Date(item.createdAt).toUTCString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviews;
