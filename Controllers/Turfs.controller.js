const TurfRouter = require("express").Router();
const Mongoose = require("mongoose");
const TurfModel = require("../Models/Turf.model");

/**
 * METHOD = GET
 * USAGE = Help us to get the data from the database
 */
TurfRouter.get("/", (req, res, next) => {
  const data = TurfModel.aggregate([
    {
      $project: {
        __v: 0,
        _id: 0,
      },
    },
  ]).exec();
  data
    .then((response) => {
      if (response.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Turfs fetched successfully",
          data: response,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Sorry! No turfs found near you",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    });
});

/**
 * METHOD = GET
 * USAGE = Help us to get the data from the database
 */
TurfRouter.get("/:id", (req, res, next) => {
  const { id = "" } = req.params;
  // TurfModel.findById(new Mongoose.Types.ObjectId(id))
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((e) => {
  //     console.log(error);
  //   });
  const data = TurfModel.aggregate([
    { $match: { _id: new Mongoose.Types.ObjectId(id) } },
    {
      $project: {
        __v: 0,
      },
    },
  ]).exec();
  data
    .then((response) => {
      if (response.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Turf fetched successfully",
          data: response,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Sorry! No turf found near you",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    });
});

/**
 * METHOD = POST
 * USAGE = Help us to get the data from the database
 */
TurfRouter.post("/create", (req, res, next) => {
  const Turf = new TurfModel(req.body);

  Turf.save()
    .then((response) => {
      if (response._id) {
        res.status(200).json({
          success: true,
          message: "Turfs created successfully",
          data: response,
        });
      }
    })
    .catch((error) => {
      res.status(401).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    });
});

/**
 * METHOD = DELETE
 * USAGE = Help us to get the data from the database
 */
TurfRouter.delete("/:id", (req, res, next) => {
  const { id = "" } = req.params;
  TurfModel.deleteOne({ _id: new Mongoose.Types.ObjectId(id) })
    .then((response) => {
      if (response.acknowledged && response.deletedCount == 1) {
        res.status(200).json({
          success: true,
          message: "Turf deleted successfully",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Turf is not available or deleted already",
        });
      }
    })
    .catch((error) => {
      res.status(401).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    });
});

module.exports = TurfRouter;
