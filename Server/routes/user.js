const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Challenge = require('../models/challenge');
const Study = require("../models/study");
const UserChallenge = require("../models/userChallenge");
const UserStudy = require("../models/userStudy");
const verifyToken = require("../middlewares/verifyToken");
const bcrypt = require("bcryptjs");

const authMiddleware = require("../middlewares/authMiddleware");
const { generateProgress } = require("./utils/routeUtils");

router.get("", [verifyToken, authMiddleware.isAdmin], async (req, res) => {
  User.find({}, { password: 0 }, (err, users) => {
    if (err) {
      return res.status(404).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({ users });
  }).populate("role");
});

router.get(
  "/:user_id",
  [verifyToken, authMiddleware.isAdmin],
  async (req, res) => {
    const _id = req.params.user_id;
    User.findOne({ _id: _id }, { password: 0 }, (err, user) => {
      if (err) {
        return res.status(404).json({
          ok: false,
          err,
        });
      }
      res.status(200).json({ user });
    }).populate("role");
  }
);

router.delete(
  "/:user_id",
  [verifyToken, authMiddleware.isAdmin],
  async (req, res) => {
    const _id = req.params.user_id;
    User.deleteOne({ _id: _id }, (err, user) => {
      if (err) {
        return res.status(404).json({
          err,
        });
      }
      res.status(200).json({
        user,
      });
    });
  }
);

router.post("/changePassword", [verifyToken], async (req, res) => {
  const user = User.findOne({ _id: req.user }, (err) => {
    if (err) {
      return res.status(404).json({
        err,
      });
    }
  });
  //checking password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    res.status(400).send("Invalid password!");
  } else {
    //hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Password was updated successfully!" });
    });
  }
});

router.put("/:user_id", [verifyToken], async (req, res) => {
  const _id = req.params.user_id;
  const user = await User.findOne({ _id: _id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
      });
    }

    user.updatedAt = Date.now();
    user.save((err, user) => {
      if (err) {
        return res.status(404).json({
          err,
        });
      }
      res.status(200).json({
        user,
      });
    });
  });
});

router.put("/:user_id/profileImage", [verifyToken], async (req, res) => {
  const _id = req.params.user_id;
  const image_url = req.body.image_url;
  await User.findOne({ _id: _id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
      });
    }
    user.image_url = image_url;
    user.updatedAt = Date.now();
    user.save((err, user) => {
      if (err) {
        return res.status(404).json({
          err,
        });
      }
      res.status(200).json({
        user,
      });
    });
  });
})

router.get("/:user_id/progress", [verifyToken], async (req, res) => {
  const userId = req.params.user_id;

  UserStudy.findOne({ user: userId }, async (err, userStudy) => {
    if (err) {
      return res.status(404).json({
        ok: false,
        err,
      });
    }

    // If progress not found we generate it now
    if (!userStudy) {
      // Find user
      const user = await User.findOne({ _id: userId }, err => {
        if (err) {
          return res.status(404).json({
            ok: false,
            err
          });
        }
      });

      // Find study
      const study = await Study.findOne({ _id: user.study }, err => {
        if (err) {
          return res.status(404).json({
            ok: false,
            err
          });
        }
      });

      // Find study challenges
      const challenges = await Challenge.find({ study: study }, err => {
        if (err) {
          return res.status(404).json({
            ok: false,
            err
          });
        }
      });

      await generateProgress(challenges, user, study).then((progress) => {
        userStudy = progress;
        res.status(200).json(userStudy);
      });
    }
    else {
      console.log('returning response');
      res.status(200).json(userStudy);
    }
  });
});

router.put("/:user_id/progress", [verifyToken], async (req, res) => {
  const userId = req.params.user_id;

  UserStudy.findOne({ user: userId }, (err, userStudy) => {
    if (err) {
      return res.status(404).json({
        ok: false,
        err,
      });
    }

    if ("assent" in req.body) {
      userStudy.assent = req.body.assent;
    }

    if ("initial_questionnaire" in req.body) {
      userStudy.initial_questionnaire = req.body.initial_questionnaire;
    }

    if ("challenges" in req.body) {
      userStudy.challenges = req.body.challenges;
    }

    userStudy.save((err, userStudy) => {
      if (err) {
        return res.status(500).json({
          err,
        });
      }
      res.status(200).json(userStudy);
    });
  });
});

router.get("/:user_id/can_play", [verifyToken], async (req, res) => {
  const userId = req.params.user_id;

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(500).json(err);
    }
    Study.findById(user.study, (err, study) => {
      if (err) {
        res.status(500).json(err);
      }
      UserChallenge.findOne({ user: userId })
        .sort({ createdAt: -1 })
        .limit(1)
        .exec((err, latestAnswer) => {
          if (err) {
            res.status(500).json(err);
          } else if (!latestAnswer) {
            res.status(200).json({
              canPlay: true,
            });
          } else {
            const cooldown = study.cooldown;
            const timeNow = new Date(Date.now());
            const latestAnswerDate = new Date(latestAnswer.createdAt);
            const canPlayAtTime = new Date(
              latestAnswerDate.getTime() + cooldown * 1000
            );
            const canPlay = timeNow > canPlayAtTime ? true : false;
            res.status(200).json({
              latestAnswerDate: latestAnswerDate,
              cooldown: cooldown,
              timeNow: timeNow,
              canPlayAtTime: canPlayAtTime,
              canPlay: canPlay,
            });
          }
        });
    });
  });
});

module.exports = router;
