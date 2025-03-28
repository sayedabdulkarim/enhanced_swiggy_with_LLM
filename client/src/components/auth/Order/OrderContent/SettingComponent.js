import React from "react";

import { Switch } from "antd";

const Setting = () => {
  return (
    <div className="setting_component">
      <h1 className="title">SMS Preferences</h1>

      <div className="setting_component_container">
        {/*  */}
        <div className="desc">
          Order related SMS cannot be disabled as they are critical to provide
          service
        </div>
        {/*  */}
        <div className="recommendation">
          <div className="text">Recommendations &amp; Reminders</div>
          <div className="switch_container">
            <Switch className="custom_setting_switch" />
          </div>
          <div className="divider"></div>
          <div className="desc">
            Keep this on to receive offer recommendations &amp; timely reminders
            based on your interests
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
