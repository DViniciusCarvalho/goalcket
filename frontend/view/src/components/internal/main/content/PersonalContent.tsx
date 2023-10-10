import React from 'react';

import mainStyles from '@/styles/internal/main/Main.module.css';

import ToDo from '@/components/internal/main/columns/ToDo';
import Doing from '@/components/internal/main/columns/Doing';
import Done from '@/components/internal/main/columns/Done';
import Functionalities from '@/components/internal/main/functionalities/Functionalities';


export default function Personal({ 
    todo, 
    doing, 
    done 
}: any) {
    
    const toDoProps = { 
        ...todo 
    };
    
    const doingProps = { 
        ...doing 
    };

    const doneProps = { 
        ...done 
    };

    
    return (
        <div className={mainStyles.personal__area__block}>
            <div className={mainStyles.columns__wrapper}>
                <ToDo {...toDoProps}/>
                <Doing {...doingProps}/>
                <Done {...doneProps}/>
            </div>
            <Functionalities isGroup={false}/>
        </div>
    );
}
