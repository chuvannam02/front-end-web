import { Carousel } from "antd";
import { Pagination } from "antd";
import { Card, Col, Row } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import pic1 from "../../../public/images/picture1.jpg";
import pic2 from "../../../public/images/picture2.jpg";
import pic3 from "../../../public/images/picture3.jpg";
import pic4 from "../../../public/images/picture4.jpg";
import pic5 from "../../../public/images/picture5.png";
import pic6 from "../../../public/images/picture6.jpg";
import pic7 from "../../../public/images/picture7.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import Ontop from "../Ontop/Ontop";
import Items from "../Cart/Items/Items";
import "./Home.scss";
const { Meta } = Card;
const contentStyle = {
  height: "auto",
  width: "auto",
  color: "#fff",
  lineHeight: "200px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://mern-stack-backend-kw0h.onrender.com/api/v1/product-without-authv1/all")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.error(error));
  },[]);
  const rows = products.reduce((rows, product, index) => {
    if (index % 3 === 0) {
      rows.push([]);
    }
    rows[rows.length - 1].push(product);
    return rows;
  }, []);
  const history = useHistory();
  const cart = useSelector((state) => state.carts?.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += Number(item.quantity);
    });
    return total;
  };
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <div className="home">
        <div className="carousel">
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic1} alt="First slide" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic2} alt="Second slide" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic3} alt="Third slide" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic4} alt="Fourth slide" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic5} alt="Fifth slide" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic6} alt="Sixth slide" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img className="d-block w-100" src={pic7} alt="Seventh slide" />
              </h3>
            </div>
          </Carousel>
        </div>
        <div className="home_product">
          <div className="home__container">
            <div className="home__row">
              <Items
                id={5}
                title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                price={98}
                image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
              />

              <Items
                id={6}
                title="The Lean Startup: How Constant Innovation Create Radically Successful Businesses Paperback"
                price={29}
                image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.SX325_B01,204,203,200_.jpg"
              />

              <Items
                id={7}
                title="Samsung LC49RG90SSUXEN 49 Curve Led Gaming Monitor"
                price={199}
                image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
              />

              <Items
                id={8}
                title="New Apple iPad Pro (12.9-inch, Wi-fi, 128GB) - Siver (4th Generation)"
                price={598}
                image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
              />

              <Items
                id={9}
                title="Kenwood kMix Stand Miser for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk"
                price={229}
                image="https://st.depositphotos.com/1765561/4857/i/450/depositphotos_48579839-stock-photo-opened-blue-stand-mixer.jpg"
                rating={4}
              />

              <Items
                id={10}
                title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual QHD 5120 x 1440"
                price={1094}
                image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
              />
            </div>
          </div>
          <div className="shopping-cart" onClick={() => history.push("/cart")}>
            <FiShoppingCart id="cartIcon" style={{ width: "15px" }} />
            <p>{getTotalQuantity() || 0}</p>
          </div>
        </div>
        <Ontop />
      </div>
      {/* <Row gutter={16}>
                {products?.map(product => (
                    <Col span={8} key={[product._id]}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={
                                <img
                                    alt="example"
                                    src = {product.images[0]}
                                />
                            }>
                            <Meta title={product.name} description={product.description} />
                        </Card>
                    </Col>
                ))}
            </Row> */}
      {rows.map((row, rowIndex) => (
        <Row gutter={16} key={rowIndex}>
          {row.map((product) => (
            <Col span={8} key={product._id}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="Ảnh sản phẩm"
                    src={
                      typeof product.images[0] === "object"
                        ? product.images[0].url
                        : product.images[0]
                    }
                  />
                }
              >
                <Meta title={product?.name} description={product?.description || "Không có mô tả nào"} />
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default Home;
