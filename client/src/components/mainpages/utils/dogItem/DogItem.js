import React from 'react'
import BtnRender from './BtnRender'
import { Image, Row} from 'antd';

function DogItem({dog, isAdmin, deleteDog, handleCheck}) {
    return (
        <div className="dog_card">
            <Image src={dog.images.url} alt="" />
            <div className="dog_box">
                <h2 title={dog.title}>{dog.title}</h2>
                <Row>Gender: {dog.content}</Row>
                <Row>Age: {dog.age}</Row>
                <Row>Centre: {dog.description}</Row>
            </div>
            <BtnRender dog={dog} deleteDog={deleteDog} />
        </div>
    )
}

export default DogItem
