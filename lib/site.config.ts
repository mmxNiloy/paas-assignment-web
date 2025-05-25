const SITE_TITLE = "CSE 813 | PaaS Assignment";
const SiteConfig = {
  title: {
    default: `${SITE_TITLE}`,
    dashboard: `Dashboard | ${SITE_TITLE}`,
    even: `Even Number Generator | ${SITE_TITLE}`,
    matrix: `Matrix Multiplier | ${SITE_TITLE}`,
    largestNumber: `Largest Number Finder | ${SITE_TITLE}`,
    login: `Login | ${SITE_TITLE}`,
    register: `Register | ${SITE_TITLE}`,
  },
  description: {
    default:
      "Assignment: Cloud computing (program on PaaS), Submitted by: 19701024",
    even: "Task 1: Generate N even numbers.",
    matrix: "Task 2: Multiply two matrices.",
    login: "Task 3: Create a database login.",
    register: "Task 5: Store user info.",
    largestNumber:
      "Task 4: Find the N-th largest number from a given list of numbers.",
  },
};

export default SiteConfig;
