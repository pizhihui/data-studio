import React from 'react';
import Downshift from 'downshift'
import { Input } from 'antd'

import css from './SearchInput.css'
import AutoCompleteOptions from "./AutoCompleteOptions";
import {TreeFilterModel} from "./AutoCompleteOptions";

const SearchInput: React.FC = () => {

  const items = [
    {value: 'apple'},
    {value: 'pear'},
    {value: 'orange'},
    {value: 'grape'},
    {value: 'banana'},
  ]

  // @ts-ignore
  const model: TreeFilterModel = TreeFilterModel.from();

  // const { model, onSelect } = this.props;


  return (
      <Downshift
        onChange={selection =>
          alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
        }
        itemToString={item => (item ? item.value : '')}
      >
        {/*{({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
          }) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <div
              style={{display: 'inline-block'}}
              {...getRootProps({}, {suppressRefError: true})}
            >
              <Input.Search placeholder="请搜索" {...getInputProps()} />
            </div>
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                  .filter(item => !inputValue || item.value.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}*/}
        {({ getInputProps, getMenuProps, isOpen, getItemProps, highlightedIndex }) => (
          <div className={css.root}>
            <Input.Search placeholder="Search" {...getInputProps()} />

            {isOpen && (
              <AutoCompleteOptions
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                model={model}
                items={items}
              />
            )}
          </div>
        )}
      </Downshift>
  )
}

export default SearchInput
