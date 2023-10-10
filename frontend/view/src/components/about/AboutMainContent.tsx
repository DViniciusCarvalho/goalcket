import React from 'react';
import aboutStyles from '../../styles/about/About.module.css';


export default function AboutMainContent(){
    return(
        <main className={aboutStyles.main__content__block}>
            <section className={aboutStyles.main__content}>
                <h1 className={aboutStyles.about__title}>Who are us?</h1>
                <hr className={aboutStyles.separation__line}/>
                <p className={aboutStyles.about__description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit placeat eos inventore, deleniti culpa aliquam. Voluptate ipsam sapiente saepe unde modi sed. Ducimus harum quis inventore ipsa cumque, natus dicta?Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime a facilis asperiores ad optio provident dolor velit natus. Aperiam voluptate similique possimus autem quis officiis dolores quod asperiores in magnam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit placeat eos inventore, deleniti culpa aliquam. Voluptate ipsam sapiente saepe unde modi sed. Ducimus harum quis inventore ipsa cumque, natus dicta?Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime a facilis asperiores ad optio provident dolor velit natus. Aperiam voluptate similique possimus autem quis officiis dolores quod asperiores in magnam.</p>
            </section>
        </main>
    );
}