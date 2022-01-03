import React, { useState } from "react";
function Form({ label, onSubmit }) {
  const [name, setName] = useState("");
  const [isHidden, changeHidden] = useState(true);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(name);
  };
  return (
    <>
      {!isHidden ? (
        <form
          onSubmit={(evt) => {
            handleSubmit(evt);
            changeHidden(true);
          }}
        >
          <label>
            {label}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <button onClick={() => changeHidden(false)}>{label}</button>
      )}
    </>
  );
}
const Node = ({
  item,
  hasChildren,
  level,
  onFold,
  onRemove,
  onChildrenAdd,
}) => {
  console.log(item.label);
  const [label, changeLabel] = useState(item.label);
  return (
    <div style={{ paddingLeft: `${level * 16}px` }}>
      {label}
      {hasChildren && <button onClick={onFold}>fold/unfold</button>}
      <button onClick={onRemove}>remove</button>
      <Form
        label={"new_name"}
        onSubmit={(new_label) => changeLabel(new_label)}
      />
      <Form label={"add new subcategory"} onSubmit={onChildrenAdd} />
    </div>
  );
};

export default Node;
