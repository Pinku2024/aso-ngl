import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
const Reveal = ({ children }) => {
  const ref = useRef();
  const mainControl = useAnimation();
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    } else {
      mainControl.start("hidden");
    }
  }, [isInView]);
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {
          WebkitTransform:
            "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          MozTransform:
            "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          msTransform:
            "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          transform:
            "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          opacity: 0,
        },
        visible: {
          opacity: 1,
          WebkitTransform:
            "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          MozTransform:
            "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          msTransform:
            "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          transform:
            "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
        },
      }}
      initial="hidden"
      animate={mainControl}
      transition={{ duration: 0.75, delay: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
