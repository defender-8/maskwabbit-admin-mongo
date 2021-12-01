import React from "react";
import Icon from "@ant-design/icons";

import { ReactComponent as CloseSvg } from "./close.svg";
import { ReactComponent as CameraSvg } from "./camera.svg";

export const CloseIcon = (props) => <Icon component={CloseSvg} {...props} />;
export const CameraIcon = (props) => <Icon component={CameraSvg} {...props} />;
