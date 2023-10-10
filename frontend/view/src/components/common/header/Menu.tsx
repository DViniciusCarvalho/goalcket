import React, { useState } from 'react';
import { useRouter } from 'next/router';
import menuStyles from '../../../styles/common/header/Menu.module.css';
import Link from 'next/link';
import { Props } from '@/types/props';


export default function Menu({ headerPosition, headerPage }: Props.MenuProps){

    const router = useRouter();

    const [ 
        menuVisibility, 
        setMenuVisibility 
    ] = useState<string>('invisible');

    const [ 
        buttonStatus, 
        setButtonStatus 
    ] = useState<string>('closed');


    function changeMenuVisibility (): void {

        setMenuVisibility(previous => previous === 'invisible'? 'visible' : 'invisible');
        setButtonStatus(previous => previous === 'openned'? 'closed' : 'openned');
    }


    function goToLogin(): void {
        router.push('/login');
    }


    return(            
        <nav 
            className={`
                ${menuStyles.header__menu__navigation} 
                ${menuStyles[headerPosition]} 
                ${menuStyles[headerPage]}
                `
            }
        >
            <button 
                className={`
                    ${menuStyles.header__menu__button} 
                    ${menuStyles[buttonStatus]}
                    `
                } 
                onClick={changeMenuVisibility}
            >
                <div 
                    className={`
                        ${menuStyles.header__menu__button__line} 
                        ${menuStyles.top__line}
                        `
                    }
                />
                <div 
                    className={`
                        ${menuStyles.header__menu__button__line} 
                        ${menuStyles.top__line}
                        `
                    }
                />
                <div 
                    className={`
                        ${menuStyles.header__menu__button__line} 
                        ${menuStyles.top__line}
                        `
                    }
                />
            </button>
            <ul className={`${menuStyles.header__menu__items} ${menuStyles[menuVisibility]}`}>
                <li className={menuStyles.header__menu__item}> 
                    <Link href='/' className={menuStyles.link}>
                        Home
                    </Link>
                </li>
                <li className={menuStyles.header__menu__item}> 
                    <Link href='/about' className={menuStyles.link}>
                        About
                    </Link>
                </li>
                <button 
                    className={menuStyles.header__menu__signin__button} 
                    onClick={goToLogin}
                >
                    Sign in
                </button>
            </ul>
        </nav>
    );
}