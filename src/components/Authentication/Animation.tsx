import { motion } from "framer-motion";

const textAnimation = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
};

export default function AnimatedText() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 100">
      <motion.text
        x="50"
        y="50"
        fontSize="40"
        fontFamily="Arial, sans-serif"
        variants={textAnimation}
        initial="hidden"
        animate="visible"
      >
        myChat
      </motion.text>
    </svg>
  );
}
