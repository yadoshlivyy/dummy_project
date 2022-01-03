import React, { useState } from "react";

import Node from "../Node";

const Branch = ({ item, level, onRemove }) => {
  const [selected, setSelected] = useState(item.selected ?? false);
  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };
  const [childrens, changeChildren] = useState(
    (item.children && item.children.length !== 0 && item.children) || []
  );

  const removeChildren = (children_value) => () => {
    const new_childrens = [...childrens].filter(
      (value) => value.label !== children_value
    );
    changeChildren(new_childrens);
  };
  const hasChildren = childrens && childrens.length != 0;
  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;
      return childrens.map((child) => {
        console.log(child);
        return (
          <Branch
            key={child.id}
            item={child}
            level={newLevel}
            onRemove={removeChildren(child.label)}
          />
        );
      });
    }

    return null;
  };

  return (
    <>
      <Node
        item={item}
        selected={selected}
        hasChildren={hasChildren}
        level={level}
        onFold={toggleSelected}
        onRemove={() => onRemove()}
        onChildrenAdd={(new_children) => {
          const new_childrens = [...childrens];
          new_childrens.push({ label: new_children });
          changeChildren(new_childrens);
        }}
      />
      {selected && renderBranches()}
    </>
  );
};

export default Branch;
