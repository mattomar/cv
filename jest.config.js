module.exports = {
  testEnvironment: "jsdom", // Use jsdom to simulate a browser environment
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Use Babel to transform JavaScript and JSX files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock stylesheets to prevent parsing errors
  },
  moduleFileExtensions: ["js", "jsx"], // Recognize JavaScript and JSX file extensions
};