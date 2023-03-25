import { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (name, id) => {
    setLeft(id * 100);
    setTimeout(() => {
      setSelectedTab(id);
    }, 200);
    onTabChange(name, id);
  };

  return (
    <div className="switchTabs">
      <div className="tab__items">
        {data?.map(({ name, id }) => {
          return (
            <span
              className={`tab__item ${selectedTab === id ? "active" : ""}`}
              key={id}
              onClick={() => activeTab(name, id)}
            >
              {name}
            </span>
          );
        })}
        <span className="moving__bg" style={{ left: left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
