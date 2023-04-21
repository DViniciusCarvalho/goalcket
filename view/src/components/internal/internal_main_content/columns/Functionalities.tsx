import React from "react";
import Image from "next/image";
import functStyle from "@/styles/internal/main/Main.module.css";
import SearchIcon from "../../../../../public/assets/search.png";

export default function Functionalities(){

  function searchMatches(){
    
  }

  return (
    <div className={functStyle.funct__container}>
      <div className={functStyle.search__card__container}>
        <div className={functStyle.search__input__block}>
          <div className={functStyle.search__icon__block}>
            <Image src={SearchIcon} alt="search icon" className={functStyle.search__icon}/>
          </div>
          <input type="text" className={functStyle.search__input}/>
        </div>
        <button className={functStyle.search__button} onClick={searchMatches}> Search </button>
      </div>
      <div className={functStyle.add__card__container}>
        <div className={functStyle.new__card__info}>
          <div className={functStyle.destination__block}>
            <label htmlFor="c__destination" className={functStyle.destination__label}>Destination</label>
            <select className={functStyle.column__destination} id="c__destination">
              <option value="to do">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className={functStyle.priority__block}>
            <label htmlFor="s__priority" className={functStyle.priority__label}>Priority</label>
            <select className={functStyle.priority__select} id="s__priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className={functStyle.content__text__block}>
            <label htmlFor="content__text" className={functStyle.context__text__label}>Content:</label>
            <textarea id="content__text" className={functStyle.content__textarea}></textarea>
        </div>
        <button className={functStyle.add__button}> Add </button>
      </div>
    </div>
  );
}
