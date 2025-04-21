import { Parallax } from "react-parallax";
import parallaxImg from "../../assets/parallax.jpg";

const ParallaxSection = () => {
  const insideStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  return (
    <Parallax
      strength={300}
      bgImage={parallaxImg}
      bgImageStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
      renderLayer={(percentage) => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              width: percentage * 500,
              height: percentage * 500,
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 700 }}>
        <div style={insideStyles} className="text-white text-3xl lg:text:5xl">Welcome to our website!</div>
      </div>
    </Parallax>
  );
};

export default ParallaxSection;
