// package: robot.robotpb
// file: robot/robotpb/robot.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class GetRobotRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRobotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRobotRequest): GetRobotRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRobotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRobotRequest;
  static deserializeBinaryFromReader(message: GetRobotRequest, reader: jspb.BinaryReader): GetRobotRequest;
}

export namespace GetRobotRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetRobotResponse extends jspb.Message {
  hasRobot(): boolean;
  clearRobot(): void;
  getRobot(): Robot | undefined;
  setRobot(value?: Robot): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRobotResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRobotResponse): GetRobotResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRobotResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRobotResponse;
  static deserializeBinaryFromReader(message: GetRobotResponse, reader: jspb.BinaryReader): GetRobotResponse;
}

export namespace GetRobotResponse {
  export type AsObject = {
    robot?: Robot.AsObject,
  }
}

export class CreateRobotRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getModel(): string;
  setModel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRobotRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRobotRequest): CreateRobotRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRobotRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRobotRequest;
  static deserializeBinaryFromReader(message: CreateRobotRequest, reader: jspb.BinaryReader): CreateRobotRequest;
}

export namespace CreateRobotRequest {
  export type AsObject = {
    name: string,
    model: string,
  }
}

export class CreateRobotResponse extends jspb.Message {
  hasRobot(): boolean;
  clearRobot(): void;
  getRobot(): Robot | undefined;
  setRobot(value?: Robot): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRobotResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRobotResponse): CreateRobotResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRobotResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRobotResponse;
  static deserializeBinaryFromReader(message: CreateRobotResponse, reader: jspb.BinaryReader): CreateRobotResponse;
}

export namespace CreateRobotResponse {
  export type AsObject = {
    robot?: Robot.AsObject,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Robot extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getModel(): string;
  setModel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Robot.AsObject;
  static toObject(includeInstance: boolean, msg: Robot): Robot.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Robot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Robot;
  static deserializeBinaryFromReader(message: Robot, reader: jspb.BinaryReader): Robot;
}

export namespace Robot {
  export type AsObject = {
    id: string,
    name: string,
    model: string,
  }
}

