import Table from "./Table/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import {ReactComponent as LoadingSVG} from "../svgs/Loading.svg"

export interface Promo  {
    id: number,
    sum: number,
    condition: string,
    code: string
}


function PromoCodes({promoFilter}: {promoFilter: string}) {
    const [data, setData] = useState<Promo[] | []>([])
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const getPromoCodes = async (): Promise<void> => {
            try {
                let result = await axios.get('https://62822e86ed9edf7bd87fee81.mockapi.io/promo' + (promoFilter && `?condition=${promoFilter}`))
                setData(result.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000) // сделал ради того, чтобы не было резкой сменны ( на быстром интернете:) ), но для медленного интернета, наверно, не подходит
            } catch (error) {
                alert("Ошибка получения промокодов, попробуйте еще раз")
                console.error(error)
            }
        }

        getPromoCodes()
    }, [promoFilter])

    return (
        <div className="promoCodes-wrapper" style={{width: "100%", height: "100%"}}>
            <h1 className="promoCodes-title">Промокоды</h1>
            {loading ? (
                <div className="promoCodes-loading">
                    <LoadingSVG className="promoCodes-loading__svg"/>
                </div>
            ) : (
                <Table<Promo>
                    columns={[
                        {
                            name: "промокод",
                            title: "Промокод",
                            get: "code",
                            className: "table__link",
                            link: {
                                to: "/promo/:id"
                            }
                        },
                        {
                            name: "сумма",
                            title: "Сумма",
                            get: "sum"
                        },
                        {
                            name: "состояние",
                            title: "Состояние",
                            get: "condition"
                        }
                    ]}
                    row={data}
                />
            )}
        </div>
    );
}

export default PromoCodes;