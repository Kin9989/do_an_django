import React from "react";

import "./adproduct.css";
const AdProduct = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <section className="hero">
          <div className="hero-inner" id="section-3">
            <figure />
            <h2 className="hero__title">
              Chào mừng bạn đến với <br></br> Nội Thất Việt Thành
            </h2>
          </div>
        </section>
        <section className="content" style={{ background: "#c28551" }}>
          <article className="content__inner">
            <h1 className="content__title">Nội Thất Việt Thành</h1>
            <h3 className="content__author">noithatvietthanh.com</h3>

            {/* <blockquote cite="Bob Ross">XIN CHÀO</blockquote> */}
            {/* <h5>
              Chúng tôi là một thương hiệu gia đình với kinh nghiệm gần 30 năm
              trong nghề và đã cùng người Bình Dương tạo nên những không gian
              sống, không gian làm việc chân thực với nhu cầu của mình.
            </h5> */}
          </article>
        </section>
      </div>
    </div>
  );
};

export default AdProduct;
