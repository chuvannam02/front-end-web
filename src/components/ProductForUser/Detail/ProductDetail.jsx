import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetAProduct } from "../../../redux/apiRequest";
import "./ProductDetail.scss";
import { addToCart } from "../../../redux/reducer/cartSlice";
import { FiShoppingCart } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Image } from "antd";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const Images = React.memo(({ src, alt, onClick, isActive }) => (
  <img
    src={src}
    alt={alt}
    onClick={onClick}
    className={isActive ? "active" : ""}
    style={{
      maxWidth: "auto",
      height: "auto",
    }}
  />
));
const ProductDetailed = () => {
  const [photoIndex1, setPhotoIndex1] = useState(0);
  const [isOpen1, setIsOpen1] = useState(false);
  const aProduct = useSelector((state) => state.products?.product?.Product);
  console.log(aProduct);
  const id = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState("");
  const history = useHistory();
  const [add_view, setAdd_view] = useState(false);
  const handleAdd_view = (status) => {
    setAdd_view(status);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAProduct(id));
    setIsLoading(true);
  }, []);
  useEffect(() => {
    if (aProduct && aProduct?.data && aProduct?.data?.images) {
      setImg(
        typeof aProduct?.data?.images[0] === "object"
          ? aProduct?.data?.images[0].url
          : aProduct?.data?.images[0]
      );
    }
  }, [aProduct]);
  //   Open Light box when click images
  const images = [
    typeof aProduct?.data?.images[0] === "object"
      ? aProduct?.data?.images[0].url
      : aProduct?.data?.images[0],
    typeof aProduct?.data.images[1] === "object"
      ? aProduct?.data?.images[1].url
      : aProduct?.data?.images[1],
    typeof aProduct.data.images[2] === "object"
      ? aProduct.data.images[2].url
      : aProduct.data.images[2],
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const handleClickReviewImg = () => {
    let index = images.findIndex((item) => item === img);
    setPhotoIndex(index);
    setIsOpen(true);
  };
  // quantity items
  const [quantity, setQuantity] = useState(1);
  const handleIncrementItem = () => {
    setQuantity((quantity) => Number(quantity) + 1);
  };
  const handleDecrementItem = () => {
    if (Number(quantity) >= 1) {
      setQuantity((quantity) => Number(quantity) - 1);
    }
  };
  const cart = useSelector((state) => state.carts?.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += Number(item.quantity);
    });
    return total;
  };
  return (
    <>
      <Breadcrumb
        style={{ margin: "10px 0 0 40px" }}
        items={[
          {
            title: <NavLink to="/">Trang chủ</NavLink>,
          },
          {
            title: <NavLink to="/products/all">Sản phẩm</NavLink>,
          },
          ,
          {
            title: `${aProduct?.data?.code}`,
          },
        ]}
      />
      <div className="app">
        {isLoading ? (
          <>
            <div>
              <div className="product_container">
                <div className="content_left">
                  <Image
                    src={img}
                    alt="Ảnh hiện tại"
                    height={300}
                    width={300}
                  />
                  {/* <div className="current_img"> */}
                  {/* <Image
                      width={300}
                      src={img}
                      alt="Ảnh hiện tại"
                    /> */}
                  {/* <img
                      src={img}
                      alt="Ảnh hiện tại"
                      width={300}
                      onClick={() => handleClickReviewImg()}
                    /> */}
                  {/* </div> */}
                  <div className="review_images">
                    {/* <div className="review_images_small">
                      <img
                        src={aProduct.data.images[0]}
                        alt="Ảnh hiện tại"
                        onClick={() => setImg(aProduct?.data?.images[0])}
                        className={
                          img === aProduct?.data?.images[0] ? "active" : ""
                        }
                      />
                    </div>
                    <div className="review_images_small">
                      <img
                        src={aProduct.data.images[1]}
                        alt="Ảnh hiện tại"
                        onClick={() => setImg(aProduct?.data?.images[1])}
                        className={
                          img === aProduct?.data?.images[1] ? "active" : ""
                        }
                      />
                    </div>
                    <div className="review_images_small">
                      <img
                        src={aProduct?.data.images[2]}
                        alt="Ảnh hiện tại"
                        onClick={() => setImg(aProduct?.data?.images[2])}
                        className={
                          img === aProduct?.data?.images[2] ? "active" : ""
                        }
                      />
                    </div>
                    */}
                    <div className="review_images_small">
                      <Images
                        src={
                          typeof aProduct.data.images[0] === "object"
                            ? aProduct.data.images[0].url
                            : aProduct.data.images[0]
                        }
                        alt="Ảnh hiện tại"
                        onClick={() =>
                          setImg(
                            typeof aProduct.data.images[0] === "object"
                              ? aProduct.data.images[0].url
                              : aProduct.data.images[0]
                          )
                        }
                        isActive={
                          (img === typeof aProduct.data.images[0]) === "object"
                            ? aProduct.data.images[0].url
                            : aProduct.data.images[0]
                        }
                      />
                    </div>
                    <div className="review_images_small">
                      <Images
                        src={
                          typeof aProduct.data.images[1] === "object"
                            ? aProduct.data.images[1].url
                            : aProduct.data.images[1]
                        }
                        alt="Ảnh hiện tại"
                        onClick={() =>
                          setImg(
                            typeof aProduct.data.images[1] === "object"
                              ? aProduct.data.images[1].url
                              : aProduct.data.images[1]
                          )
                        }
                        isActive={
                          (img === typeof aProduct.data.images[1]) === "object"
                            ? aProduct.data.images[1].url
                            : aProduct.data.images[1]
                        }
                      />
                    </div>
                    <div className="review_images_small">
                      <Images
                        src={
                          typeof aProduct.data.images[2] === "object"
                            ? aProduct.data.images[2].url
                            : aProduct.data.images[2]
                        }
                        alt="Ảnh hiện tại"
                        onClick={() =>
                          setImg(
                            typeof aProduct.data.images[2] === "object"
                              ? aProduct.data.images[2].url
                              : aProduct.data.images[2]
                          )
                        }
                        isActive={
                          typeof aProduct.data.images[2] === "object"
                            ? aProduct.data.images[2].url
                            : aProduct.data.images[2]
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="content_right">
                  <div className="main_content">
                    <div className="basic_info">
                      <div className="title">{aProduct?.data.name}</div>
                      <div
                        className="price"
                        style={{
                          textDecoration: aProduct?.data.salePrice
                            ? "line-through"
                            : "none",
                          color: aProduct?.data.salePrice ? "red" : "black",
                        }}
                      >
                        Price: {aProduct?.data.price}
                      </div>
                      {aProduct?.data.salePrice && (
                        <div className="salePrice">
                          Sale Price: {aProduct?.data.salePrice}
                        </div>
                      )}
                      {/* <div className="size">
                          <h4>Kích thước</h4>
                          <div className="size_item">
                            {item.data.size?.map((value, i) => (
                              <div key={i}>
                                {Object.values(value)?.map((vl, id) => (
                                  <div className="size_list_item" key={id}>
                                    <div>{vl}</div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div> */}
                      <div className="action">
                        <label>Số lượng</label>
                        <div className="input_quantity">
                          <button
                            className="disable"
                            onClick={handleDecrementItem}
                            disabled={quantity >= 1 ? false : true}
                          >
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                              alt="remove-icon"
                              width="20"
                              height="20"
                            />
                          </button>
                          <input
                            type="text"
                            min={1}
                            className="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                          <button className="add" onClick={handleIncrementItem}>
                            <img
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                              alt="add-icon"
                              width="20"
                              height="20"
                            />
                          </button>
                        </div>

                        <button
                          className="buy"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                id: aProduct.data.productId,
                                title: aProduct.data.name,
                                image: aProduct.data.images[0],
                                price: aProduct.data.price,
                                quantity: quantity,
                              })
                            )
                          }
                        >
                          Chọn mua
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % images.length)
                  }
                  animationDuration={500}
                />
              )}
            </div>
          </>
        ) : (
          <p>Is Loading...</p>
        )}
        {/* {aProduct?.map((item, i) => (
          <div key={i}>
            <div className="detail_info">
              <h4>Thông số sản phẩm</h4>
              <ul>
                <div className="list_detail_info">
                  <li>Thương Hiệu: {item.data.brand}</li>
                </div>
                <div className="list_detail_info">
                  <li>CPU: {item.data.cpu}</li>
                </div>
                <div className="list_detail_info">
                  <li>RAM: {item.data.ram}</li>
                </div>
                <div className="list_detail_info">
                  <li>Ổ Cứng: {item.data.disk}</li>
                </div>
                <div className="list_detail_info">
                  <li>VGA: {item.data.vga}</li>
                </div>
                <div className="list_detail_info">
                  <li>Màn Hình: {item.data.monitor}</li>
                </div>
                <div className="list_detail_info">
                  <li>Màu Sắc: {item.data.color}</li>
                </div>
              </ul>
              {add_view === true ? (
                <div className="additional_info">
                  <ul>
                    <div className="list_additional_info">
                      <li>Pin: {item.data.battery}</li>
                    </div>
                    <div className="list_additional_info">
                      <li>Âm Thanh: {item.data.audio}</li>
                    </div>
                    <div className="list_additional_info">
                      <li>Cổng Giao Tiếp: {item.data.communication_port}</li>
                    </div>
                    <div className="list_additional_info">
                      <li>Dung Lượng Tối Đa: {item.data.max}</li>
                    </div>
                    <div className="list_additional_info">
                      <li>Hệ Điều Hành: {item.data.operation}</li>
                    </div>
                    <div className="list_additional_info">
                      <li>Cân Nặng: {item.data.weight}</li>
                    </div>
                    <div className="list_additional_info">
                      <li>Webcam: {item.data.webcam}</li>
                    </div>
                  </ul>
                  <span className="hide" onClick={() => handleAdd_view(false)}>
                    Rút Gọn
                  </span>
                </div>
              ) : (
                <span className="show" onClick={() => handleAdd_view(true)}>
                  ... Xem Thêm
                </span>
              )}
            </div>
          </div>
        ))} */}

        <div className="shopping-cart" onClick={() => history.push("/cart")}>
          <FiShoppingCart id="cartIcon" style={{ width: "15px" }} />
          <p>{getTotalQuantity() || 0}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetailed;
