import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Reveal = ({ children }) => {
  const ref = useRef();
  const mainControl = useAnimation();
  const isInView = useInView(ref, { once: false });

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
          translateY: 60,
          opacity: 0,
        },
        visible: {
          translateY: 0,
          opacity: 1,
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
