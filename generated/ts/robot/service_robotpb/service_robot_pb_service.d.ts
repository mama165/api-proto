// package: robot.service_robotpb
// file: robot/service_robotpb/service_robot.proto

import * as robot_service_robotpb_service_robot_pb from "../../robot/service_robotpb/service_robot_pb";
import * as robot_robotpb_robot_pb from "../../robot/robotpb/robot_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RobotServiceGetRobot = {
  readonly methodName: string;
  readonly service: typeof RobotService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robot_robotpb_robot_pb.GetRobotRequest;
  readonly responseType: typeof robot_robotpb_robot_pb.GetRobotResponse;
};

type RobotServiceCreateRobot = {
  readonly methodName: string;
  readonly service: typeof RobotService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robot_robotpb_robot_pb.CreateRobotRequest;
  readonly responseType: typeof robot_robotpb_robot_pb.CreateRobotResponse;
};

export class RobotService {
  static readonly serviceName: string;
  static readonly GetRobot: RobotServiceGetRobot;
  static readonly CreateRobot: RobotServiceCreateRobot;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class RobotServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getRobot(
    requestMessage: robot_robotpb_robot_pb.GetRobotRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: robot_robotpb_robot_pb.GetRobotResponse|null) => void
  ): UnaryResponse;
  getRobot(
    requestMessage: robot_robotpb_robot_pb.GetRobotRequest,
    callback: (error: ServiceError|null, responseMessage: robot_robotpb_robot_pb.GetRobotResponse|null) => void
  ): UnaryResponse;
  createRobot(
    requestMessage: robot_robotpb_robot_pb.CreateRobotRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: robot_robotpb_robot_pb.CreateRobotResponse|null) => void
  ): UnaryResponse;
  createRobot(
    requestMessage: robot_robotpb_robot_pb.CreateRobotRequest,
    callback: (error: ServiceError|null, responseMessage: robot_robotpb_robot_pb.CreateRobotResponse|null) => void
  ): UnaryResponse;
}

