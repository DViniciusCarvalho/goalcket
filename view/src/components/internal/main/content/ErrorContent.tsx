import React, { ReactNode } from "react";
import errorStyle from "@/styles/internal/main/content/ErrorContent.module.css";
import SadCatIcon from "../../../../../public/assets/sad_cat.png";
import Image from "next/image";
import { Props } from "@/types/props";

export default function Error({ getGroupRequestStatusMessage }: Props.ErrorProps) {

    const errorMessage: {[key: string]: { statusCode: number, message: string}} = {
        forbidden: { 
            statusCode: 403, 
            message: "FORBIDDEN"
        },
        badRequest: { 
            statusCode: 400, 
            message: "BAD REQUEST" 
        },
        notFound: { 
            statusCode: 404, 
            message: "NOT FOUND" 
        },
        internalServerError: { 
            statusCode: 500, 
            message: "INTERNAL SERVER ERROR" 
        }
    };

    return (
        <div className={errorStyle.error__message__block}>
            <div className={errorStyle.cat__icon__block}>
                <Image src={SadCatIcon} alt="sad cat image"/>
            </div>
            <div className={errorStyle.error__content}>
                <h2 className={errorStyle.error__title}>
                    { errorMessage[getGroupRequestStatusMessage]['statusCode'] as ReactNode }
                </h2>
                <h4 className={errorStyle.error__text}>
                    { errorMessage[getGroupRequestStatusMessage]['message'] as ReactNode }
                </h4>
            </div>
        </div>
    )
}
