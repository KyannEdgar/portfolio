export const customSpring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export const crispEase = [0.16, 1, 0.3, 1] as const;

export const crispTransition = {
  duration: 0.7,
  ease: crispEase,
};

export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (customIndex: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...customSpring,
      delay: typeof customIndex === "number" ? customIndex * 0.08 : 0,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    transition: customSpring,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: customSpring,
  },
};

/**
 * Hero section animation variants
 * Orchestrates pure child stagger without compound container opacity clipping
 */
export const heroContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: customSpring,
  },
};

/**
 * Bento Grid scroll reveal animation variants
 */
export const bentoGridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const bentoCardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (customIndex: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...customSpring,
      delay: typeof customIndex === "number" ? (customIndex % 2) * 0.1 : 0,
    },
  }),
};

export const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: customSpring,
  },
};
