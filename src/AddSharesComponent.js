import React, { useState, useEffect } from "react";
import "./AttributeComponent.css";

const AddShareComponent = ({ onChildrenListUpdate }) => {
    const [children, setChildren] = useState([]);

    const addChild = () => {
        setChildren([...children, 1]);
    };

    const handleInputChange = (event, index) => {
        try {
            const {value} = event.target;
            const intvalue = parseInt(value);
            const updatedChildren = [...children];
            updatedChildren[index] = intvalue;
            setChildren(updatedChildren);
        }catch (e) {
            event.target.value = children[index];
        }
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
                        type="number"
                        placeholder="Share"
                        value={child}
                        onChange={(e) => handleInputChange(e, index)}
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

export default AddShareComponent;