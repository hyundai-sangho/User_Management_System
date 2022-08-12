const axios = require("axios");

exports.homeRoutes = (_req, res) => {
  // /api/users GET 요청
  axios
    .get("http://localhost:3000/api/users")
    .then(function (받은데이터) {
      res.render("index", { users: 받은데이터.data });
    })
    .catch(function (에러) {
      res.send(에러);
    });
};

exports.add_user = (_req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
    .then((사용자정보) => {
      res.render("update_user", { user: 사용자정보.data });
    })
    .catch((에러) => {
      res.send(에러);
    });
};
