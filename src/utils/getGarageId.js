const getGarageId = (garagename) => {
  let garageid =
    garagename.replace(" ", "_").replace("-", "_") +
    new Date().getDate().slice(0, 10).toString();
  return garageid;
};
module.exports = getGarageId;
