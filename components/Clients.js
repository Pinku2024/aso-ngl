import Image from "next/image";
const data = [
  { src: "/assets/imgs/clientlogo/HDFC.png", alt: "hdfc", width: 304 },
  { src: "/assets/imgs/clientlogo/Groww.png", alt: "groww", width: 182 },
  {
    src: "/assets/imgs/clientlogo/BajajFinserve.png",
    alt: "BajajFinserve",
    width: 190,
  },
  { src: "/assets/imgs/clientlogo/B612.png", alt: "B612", width: 74 },
  {
    src: "/assets/imgs/clientlogo/Alibabagroup.png",
    alt: "Alibabagroup",
    width: 103,
  },
  { src: "/assets/imgs/clientlogo/Cred.png", alt: "Cred", width: 151 },
  { src: "/assets/imgs/clientlogo/Tata1mg.png", alt: "Tata1mg", width: 226 },
  {
    src: "/assets/imgs/clientlogo/Urbancompany.png",
    alt: "Urbancompany",
    width: 169,
  },
  { src: "/assets/imgs/clientlogo/Kotak.png", alt: "Kotak", width: 165 },
  { src: "/assets/imgs/clientlogo/Dunzo.png", alt: "Dunzo", width: 219 },
  { src: "/assets/imgs/clientlogo/Dream11.png", alt: "Dream11", width: 182 },
  { src: "/assets/imgs/clientlogo/Airtel.png", alt: "airtel", width: 49 },
  { src: "/assets/imgs/clientlogo/ZEE.png", alt: "ZEE", width: 110 },
  { src: "/assets/imgs/clientlogo/OYO.png", alt: "OYO", width: 142 },
  { src: "/assets/imgs/clientlogo/Josh.png", alt: "Josh", width: 105 },
  {
    src: "/assets/imgs/clientlogo/ShareChat.png",
    alt: "ShareChat",
    width: 182,
  },
  {
    src: "/assets/imgs/clientlogo/Make-My-Trip.png",
    alt: "Make-My-trip",
    width: 155,
  },
  { src: "/assets/imgs/clientlogo/Goibibo.png", alt: "Goibibo", width: 158 },
  { src: "/assets/imgs/clientlogo/ixigo.png", alt: "ixigo", width: 108 },
  { src: "/assets/imgs/clientlogo/Yatra.png", alt: "Yatra", width: 115 },
  { src: "/assets/imgs/clientlogo/Nykaa.png", alt: "Nykaa", width: 146 },
  { src: "/assets/imgs/clientlogo/Myntra.png", alt: "Myntra", width: 177 },
  { src: "/assets/imgs/clientlogo/Snapdeal.png", alt: "Snapdeal", width: 241 },
  { src: "/assets/imgs/clientlogo/Smood.png", alt: "Smood", width: 247 },
  { src: "/assets/imgs/clientlogo/IDFC.png", alt: "IDFC", width: 120 },
  { src: "/assets/imgs/clientlogo/YesBank.png", alt: "YesBank", width: 139 },
  {
    src: "/assets/imgs/clientlogo/Edelweiss.png",
    alt: "Edelweiss",
    width: 203,
  },
  { src: "/assets/imgs/clientlogo/ELSA.png", alt: "ELSA", width: 146 },
  {
    src: "/assets/imgs/clientlogo/CoinMArketcap.png",
    alt: "CoinMArketcap",
    width: 49,
  },
  {
    src: "/assets/imgs/clientlogo/SimpleLearn.png",
    alt: "SimpleLearn",
    width: 195,
  },
  {
    src: "/assets/imgs/clientlogo/BYJU'sExamPrep.png",
    alt: "BYJU'sExamPrep",
    width: 287,
  },
  { src: "/assets/imgs/clientlogo/mint.png", alt: "mint", width: 139 },
  {
    src: "/assets/imgs/clientlogo/Magicbricks.png",
    alt: "Magicbricks",
    width: 278,
  },
  { src: "/assets/imgs/clientlogo/Housing.png", alt: "Housing", width: 359 },
  { src: "/assets/imgs/clientlogo/Nobroker.png", alt: "Nobroker", width: 260 },
  {
    src: "/assets/imgs/clientlogo/Ultrahuman.png",
    alt: "Ultrahuman",
    width: 153,
  },
  { src: "/assets/imgs/clientlogo/Fynd.png", alt: "fynd", width: 123 },
  { src: "/assets/imgs/clientlogo/FanCODE.png", alt: "FanCODE", width: 247 },
  { src: "/assets/imgs/clientlogo/fectar.png", alt: "fectar", width: 177 },
  { src: "/assets/imgs/clientlogo/ZET.png", alt: "ZET", width: 92 },
];
const Trustby = ({ padding }) => {
  return (
    <section className="section-client " >
      <h2 className="heading">Some of our clients</h2>

      <div className="marqueeContainer">
        <div className="marqueeSlide">
          {data.map((item, index) => (
            <Image
              key={index}
              src={item.src}
              alt={item.alt}
              height={50}
              width={item.width}
              loading="lazy"
            />
          ))}
        </div>
        <div className="marqueeSlide2">
          {data.map((item, index) => (
            <Image
              key={index}
              src={item.src}
              alt={item.alt}
              height={50}
              width={item.width}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trustby;
