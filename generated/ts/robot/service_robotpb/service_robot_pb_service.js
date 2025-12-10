// package: robot.service_robotpb
// file: robot/service_robotpb/service_robot.proto

var robot_service_robotpb_service_robot_pb = require("../../robot/service_robotpb/service_robot_pb");
var robot_robotpb_robot_pb = require("../../robot/robotpb/robot_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RobotService = (function () {
  function RobotService() {}
  RobotService.serviceName = "robot.service_robotpb.RobotService";
  return RobotService;
}());

RobotService.GetRobot = {
  methodName: "GetRobot",
  service: RobotService,
  requestStream: false,
  responseStream: false,
  requestType: robot_robotpb_robot_pb.GetRobotRequest,
  responseType: robot_robotpb_robot_pb.GetRobotResponse
};

RobotService.CreateRobot = {
  methodName: "CreateRobot",
  service: RobotService,
  requestStream: false,
  responseStream: false,
  requestType: robot_robotpb_robot_pb.CreateRobotRequest,
  responseType: robot_robotpb_robot_pb.CreateRobotResponse
};

exports.RobotService = RobotService;

function RobotServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RobotServiceClient.prototype.getRobot = function getRobot(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RobotService.GetRobot, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

RobotServiceClient.prototype.createRobot = function createRobot(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RobotService.CreateRobot, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.RobotServiceClient = RobotServiceClient;

