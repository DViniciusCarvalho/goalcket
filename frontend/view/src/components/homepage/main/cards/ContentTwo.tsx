import React from 'react';
import cardStyles from '@/styles/homepage/main/Card.module.css';
import Profit from '../../../../../public/assets/profits.png';
import Image from 'next/image';
import { Props } from '@/types/props';


export default function ContentTwo({ 
    gridArea 
}: Props.CardProps){
    
    return (
        <section 
            className={`
                ${cardStyles.card} 
                ${cardStyles.card__two}
                `
            } 
            style={{gridArea: gridArea}}
        >
            <Image 
                src={Profit} 
                alt='profit image' 
                width={50}
            />
            <h2 className={cardStyles.card__title}>
                Lorem ipsum
            </h2>
            <br/>
            <p className={cardStyles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sap
                iente dolorum in omnis voluptas, deserunt qui recusandae ipsa dignissimos repudiandae culpa vero, cumque quas aspernatur sit molestiae ipsam itaque. Officia, maiores! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab unde facere nam consequuntur ad iusto aspernatur doloru.</p>
        </section>
    );
}