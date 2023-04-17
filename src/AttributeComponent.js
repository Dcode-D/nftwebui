import React, { useState, useEffect } from "react";
import "./AttributeComponent.css";

const AddChildComponent = ({ onChildrenListUpdate }) => {
    const [children, setChildren] = useState([]);

    const addChild = () => {
        setChildren([...children, { name: "", value: "" }]);
    };

    const handleInputChange = (event, index, key) => {
        const { value } = event.target;
        const updatedChildren = [...children];
        updatedChildren[index][key] = value;
        setChildren(updatedChildren);
    };

    const removeChild = (index) => {
        const updatedChildren = [...children];
        updatedChildren.splice(index, 1);
        setChildren(updatedChildren);
    };

    useEffect(() => {
        onChildrenListUpdate(children);
    }, [children, onChildrenListUpdate]);

    return (
        <div className="add-child-component">
            <button className="btn btn-primary" type="button" onClick={addChild}>
                <i className="fas fa-plus"></i> Add Child Component
            </button>
            {children.map((child, index) => (
                <div className="child-component" key={`child-${index}`}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={child.name}
                        onChange={(e) => handleInputChange(e, index, "name")}
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={child.value}
                        onChange={(e) => handleInputChange(e, index, "value")}
                    />
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => removeChild(index)}
                    >
                        -
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AddChildComponent;