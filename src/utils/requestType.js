const REQUEST_TYPE_LABELS = {
  GITHUB_ACCESS: "GitHub Access",
  VPN_ACCESS: "VPN Access",
  DATABASE_ACCESS: "Database Access",
  SOFTWARE_INSTALL: "Software Install",
  LAPTOP_REQUEST: "Laptop Request",
};

const formatRequestType = (type) => {
  return REQUEST_TYPE_LABELS[type] || type;
};

module.exports = {
  formatRequestType,
};
