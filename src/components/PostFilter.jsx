import React from 'react';
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/MyInput";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={event => setFilter({...filter, query: event.target.value})}
                placeholder='Пошук...'/>
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортування"
                options={[
                    {value: 'title', name: 'По назві'},
                    {value: 'body', name: 'По описі'}
                ]}
            />
        </div>
    );
};

export default PostFilter;