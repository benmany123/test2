import React, { useState, useRef, useReducer } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs'
import { Button, Row, Col} from "antd";

const machine = {
  initial: "initial",
  states: {
    initial: { on: { next: "loadingModel" } },
    loadingModel: { on: { next: "modelReady" } },
    modelReady: { on: { next: "imageReady" } },
    imageReady: { on: { next: "identifying" }, showImage: true },
    identifying: { on: { next: "complete" } },
    complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
  }
};

function ClassifyDog() {
  tf.setBackend("cpu"); 
  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [model, setModel] = useState(null);
  const imageRef = useRef();
  const inputRef = useRef();

  const reducer = (state, event) =>
    machine.states[state].on[event] || machine.initial;

  const [appState, dispatch] = useReducer(reducer, machine.initial);
  const next = () => dispatch("next");

  const loadModel = async () => {
    next();
    const model = await mobilenet.load();
    setModel(model);
    next();
  };

  const identify = async () => {
    next();
    const results = await model.classify(imageRef.current);
    setResults(results);
    next();
  };

  const reset = async () => {
    setResults([]);
    next();
  };

  const upload = () => inputRef.current.click();

  const handleUpload = event => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImageURL(url);
      next();
    }
  };

  const actionButton = {
    initial: { action: loadModel, text: "Load Model" },
    loadingModel: { text: "Loading Model..." },
    modelReady: { action: upload, text: "Upload Image" },
    imageReady: { action: identify, text: "Identify Breed" },
    identifying: { text: "Identifying..." },
    complete: { action: reset, text: "Reset" }
  };

  const { showImage, showResults } = machine.states[appState];

  return (
    <div className="loginDog">
      <Row>
        <h1>Classify dog breed:</h1>
      </Row>
      <Row>
      <Col span={1}>{showImage && 
      <img width={500}
      src={imageURL} alt="upload-preview" ref={imageRef} />}</Col>     
      <Col span={0}>
      <input 
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleUpload}
        ref={inputRef}/></Col>
      </Row>
      {showResults && (
        <Row>
        <ul>
          {results.map(({ className, probability }) => (
            <li key={className}>
                <h3>{`The dog has ${(probability * 100).toFixed(1)}% is ${className}`}</h3>
            </li>
          ))}
        </ul>
        </Row>
      )}
      <br></br>
      <Button type="primary"  shape="round" style={{ background: "#EF476F",borderColor: "#EF476F" } } size="large"
       onClick={actionButton[appState].action || (() => {})}>
        {actionButton[appState].text}
      </Button>
    </div>
  );
}

export default ClassifyDog;