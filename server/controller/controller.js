let UserDb = require("../model/model");

// 신규 사용자 생성 및 저장
exports.createUser = (req, res) => {
  // api 요청 체크
  if (!req.body) {
    res.status(400).send({ message: "req.body로 넘겨주는 값에 데이터가 없습니다. 뭔가 잘못됐습니다. 체크 바람!!" });
  }

  // 신규 사용자 추가
  const 유저정보 = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // 데이터베이스에 사용자를 저장하십시오.
  유저정보
    .save(유저정보)
    .then((결과값) => {
      // res.send(결과값);
      res.redirect("/add-user");
    })
    .catch((에러) => {
      res.status(500).send({
        message: 에러.message || "신규 사용자의 정보를 저장하는 동안 오류가 발생했습니다.",
      });
    });
};

// 아이디가 있으면 아이디에 해당하는 사용자를 찾고 아니면
// 모든 사용자를 찾아서 반환
exports.findUser = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    UserDb.findById(id)
      .then((받은데이터) => {
        // 해당 아이디의 데이터가 없으면
        if (!받은데이터) {
          res.status(404).send({ message: `404 오류 => 사용자 정보를 찾을 수 없습니다. ID: ${id}` });
        } else {
          res.send(받은데이터);
        }
      })
      .catch((에러) => {
        res.status(500).send({ message: `500 오류 => ${에러}` });
      });
  } else {
    UserDb.find()
      .then((유저정보) => {
        res.send(유저정보);
      })
      .catch((에러) => {
        res.status(500).send({
          message: 에러.message || "사용자를 검색하는 동안 오류가 발생했습니다.",
        });
      });
  }
};

// 사용자 정보 갱신
exports.updateUser = (req, res) => {
  if (!req.body) return res.status(400).send({ message: "유저 정보 갱신하기 위해 req.body로 넘겨주는 값에 데이터가 없습니다. 뭔가 잘못됐습니다. 체크 바람!!" });

  const id = req.params.id;

  UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((받은데이터) => {
      if (!받은데이터) {
        res.status(404).send({ message: `사용자 정보를 갱신하기 위해 id가 ${id}인 사용자 정보를 찾을 수 없습니다.` });
      } else {
        res.send(받은데이터);
      }
    })
    .catch((에러) => {
      res.status(500).send({ message: `유저 정보 갱신 에러 발생 => ${에러}` });
    });
};

// 사용자 삭제
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  UserDb.findByIdAndRemove(id)
    .then((받은데이터) => {
      if (!받은데이터) {
        res.status(404).send({ message: `ID ${id}로 삭제할 수 없습니다. ID가 잘못되었을 수도 있습니다` });
      } else {
        res.send({
          message: "사용자 정보가 삭제되었습니다.",
        });
      }
    })
    .catch((에러) => {
      res.status(500).send({ message: `ID: ${id}로 사용자 정보를 삭제할 수 없습니다. => ${에러}` });
    });
};
