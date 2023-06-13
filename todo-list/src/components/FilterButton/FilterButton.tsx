import React from 'react';
import { FilterType } from '../../enums/FilterType';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getFilteredTodos } from '../../helpers/getFilteredTodos';
import styles from './FilterButton.module.scss'

interface FilterButtonProps {
    filterType: FilterType;
    currentFilter: FilterType
    name: string,
    onClick: (filter: FilterType) => void
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterType, currentFilter, name, onClick }) => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <div className={styles.FilterButton}>
            <button className={currentFilter === filterType ? styles.active : ''} onClick={() => onClick(filterType)}>
                {name}:{getFilteredTodos(todos, filterType).length}
            </button>
        </div>
    );
};

export default FilterButton;