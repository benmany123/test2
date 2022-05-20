import React, {useContext} from 'react'
import {Input, Row, Space} from "antd";
import {FunnelPlotOutlined, SearchOutlined } from '@ant-design/icons';
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)

    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.dogsAPI.category
    const[search,setSearch]=state.dogsAPI.search

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filterDog">
            <Row>
                <Space>
                    <FunnelPlotOutlined style={{ fontSize: '30px', color: '#073B4C' }}/> &nbsp;Filters:
                    <select name="category" value={category} onChange={handleCategory} >
                        <option value=''>All Breeds</option>
                        {categories.map(category => (
                                <option value={"category=" + category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <SearchOutlined style={{ fontSize: '30px', color: '#073B4C' }}/>&nbsp;Search for any keywords:
                    <Input type="text" allowClear value={search} onChange={e => setSearch(e.target.value.toLowerCase())}/>
                </Space>       
            </Row>
        </div>
    )
}

export default Filters
