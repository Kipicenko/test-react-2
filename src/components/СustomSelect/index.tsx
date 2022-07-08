import { ReactComponent as ArrowSVG } from "../../svgs/arrow.svg";
import { useEffect, useState } from "react";
import cn from "classnames";


type Option = {
    value: string | number,
    label: string
}

interface CustomSelect {
    options: Option[],
    value: any,
    onChange: (value: any) => void,
    className?: string
}

function CustomSelect({options, value, onChange, className}: CustomSelect) {
   const [open, setOpen] = useState<boolean>(false)

   const setValue = (value: any): void => {
       onChange(value)
       setOpen(false)
   }

   const handleOutsideClick = (e: any): void => {
       if (!e.target.closest(".custom-select-menu") && !e.target.closest(".custom-select-header")) {
           setOpen(false);
       }
   }

   useEffect(() => {
     document.addEventListener('click', handleOutsideClick)

     return () => document.removeEventListener('click', handleOutsideClick)
   }, [])

    return (
        <div className="container-select">
            <div className={"custom-select-container" + (className ? ` ${className}` : "")}>
                <div className="custom-select-header" onClick={() => setOpen(!open)}>
                    <span className="custom-select-header__title">
                        {options.find(option => option.value === value)?.label || "Загрузка"}
                    </span>
                    <ArrowSVG width={16} height={16} />
                </div>
                <div
                    className={cn('custom-select-menu', {
                        'open-menu': open
                    })}
                >
                    <ul className="custom-select-list">
                        {options.map(option => (
                            <li
                                key={option.value}
                                onClick={() => setValue(option.value)}
                                className={cn('custom-select-item', {
                                    'selected-item': option.value === value
                                })}
                            >
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CustomSelect;